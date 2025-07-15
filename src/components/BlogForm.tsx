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
  const [error, setError] = useState("");

  // ⏳ Prevent render until client is ready
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setLoading(true);
    // setError("");
    // setSummary("");
    // setUrduSummary("");

    // try {
    //   const res = await fetch("/api/summarise", {
    //     method: "POST",
    //     body: JSON.stringify({ url }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   const data = await res.json();

    //   if (!res.ok) {
    //     throw new Error(data.error || "Failed to summarise.");
    //   }

    //   setSummary(data.summary);
    //   setUrduSummary(data.urdu);
 

    //   // Save summary and full text
    //   await fetch("/api/saveSummary", {
    //     method: "POST",
    //     body: JSON.stringify({ url, summary: data.summary }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   await fetch("/api/saveFullText", {
    //     method: "POST",
    //     body: JSON.stringify({ url, fullText: data.fullText }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    // } catch (err: any) {
    //   setError("Failed to process blog. Please check the URL.");
    //   console.log(err);
    // }

    // setLoading(false);

    // Inside handleSubmit
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
} catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
    console.error("Form submit error:", err.message);
  } else {
    setError("Unknown error occurred.");
    console.error("Unknown error occurred in BlogForm");
  }
}

  };

  // 🚫 Don't render anything until mounted (avoids hydration mismatch)
  if (!mounted) return null;

  return (
    <div >

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Blog URL</h2>
        <p className="text-gray-600 mb-6">
          Paste the URL of the blog post you want to summarise and translate.
        </p>
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
      </form>
      <div className="m-10 flex  gap-4">
        
        {summary && <SummaryCard summary={summary} />}
        {urduSummary && <UrduTranslation urdu={urduSummary} />}
      </div>


    </div>

  );
}
