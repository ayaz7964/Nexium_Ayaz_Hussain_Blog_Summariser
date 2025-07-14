// "use client";


// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import SummaryCard from "./SummaryCard";
// import UrduTranslation from "./UrduTranslation";
// import { scrapeBlogText, getStaticSummary } from "@/utils/summariser";
// import { translateToUrdu } from "@/utils/translateToUrdu";

// export default function BlogForm() {
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState("");
//   const [urduSummary, setUrduSummary] = useState("");
//   const [error, setError] = useState("");


//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");
//   setSummary("");
//   setUrduSummary("");

//   try {
//     const res = await fetch("/api/summarise", {
//       method: "POST",
//       body: JSON.stringify({ url }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.error || "Failed to summarise.");
//     }

//     setSummary(data.summary);
//     setUrduSummary(data.urdu);

//     // Save summary and full text
//     await fetch("/api/saveSummary", {
//       method: "POST",
//       body: JSON.stringify({ url, summary: data.summary }),
//       headers: { "Content-Type": "application/json" },
//     });

//     await fetch("/api/saveFullText", {
//       method: "POST",
//       body: JSON.stringify({ url, fullText: data.fullText }),
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err: any) {
//     setError("Failed to process blog. Please check the URL.");
//   }

//   setLoading(false);
// };


//   // async function handleSubmit(e: React.FormEvent) {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError("");
//   //   setSummary("");
//   //   setUrduSummary("");

//   //   try {
//   //     const text = await scrapeBlogText(url);
//   //     if (!text) throw new Error("No blog content found.");
//   //     const staticSummary = getStaticSummary(text);
//   //     setSummary(staticSummary);

//   //     const urdu = translateToUrdu(staticSummary);
//   //     setUrduSummary(urdu);

//   //     await fetch("/api/saveSummary", {
//   //       method: "POST",
//   //       body: JSON.stringify({ url, summary: staticSummary }),
//   //       headers: { "Content-Type": "application/json" },
//   //     });

//   //     await fetch("/api/saveFullText", {
//   //       method: "POST",
//   //       body: JSON.stringify({ url, fullText: text }),
//   //       headers: { "Content-Type": "application/json" },
//   //     });
//   //   } catch (err: any) {
//   //     setError("Failed to process blog. Please check the URL.");
//   //   }
//   //   setLoading(false);
//   // }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <Input
//         type="url"
//         placeholder="Enter blog URL"
//         value={url}
//         onChange={e => setUrl(e.target.value)}
//         required
//       />
//       <Button type="submit" disabled={loading}>
//         {loading ? "Processing..." : "Summarise"}
//       </Button>
//       {error && <div className="text-red-500">{error}</div>}
//       {summary && <SummaryCard summary={summary} />}
//       {urduSummary && <UrduTranslation urdu={urduSummary} />}
//     </form>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SummaryCard from "./SummaryCard";
import UrduTranslation from "./UrduTranslation";

export default function BlogForm() {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");
  const [urduFull, setUrduFull] = useState(""); // 🆕 Add full urdu state
  const [error, setError] = useState("");

  // ⏳ Prevent render until client is ready
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");
    setUrduSummary("");
    setUrduFull("");

    try {
      const res = await fetch("/api/summarise", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to summarise.");
      }

      setSummary(data.summary);
      setUrduSummary(data.urdu);
      setUrduFull(data.urduFull); // 🆕 set full urdu translation

      // Save summary and full text
      await fetch("/api/saveSummary", {
        method: "POST",
        body: JSON.stringify({ url, summary: data.summary }),
        headers: { "Content-Type": "application/json" },
      });

      await fetch("/api/saveFullText", {
        method: "POST",
        body: JSON.stringify({ url, fullText: data.fullText }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      setError("Failed to process blog. Please check the URL.");
    }

    setLoading(false);
  };

  // 🚫 Don't render anything until mounted (avoids hydration mismatch)
  if (!mounted) return null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="url"
        placeholder="Enter blog URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Summarise"}
      </Button>

      {error && <div className="text-red-500">{error}</div>}
      {summary && <SummaryCard summary={summary} />}
      {urduSummary && <UrduTranslation urdu={urduSummary} />}

      {/* {urduFull && (
        <div className="mt-4 border p-4 rounded bg-gray-50 text-right">
          <h2 className="text-lg font-semibold mb-2">مکمل اردو ترجمہ</h2>
          <p className="leading-relaxed whitespace-pre-line">{urduFull}</p>
        </div>
      )} */}
    </form>
  );
}
