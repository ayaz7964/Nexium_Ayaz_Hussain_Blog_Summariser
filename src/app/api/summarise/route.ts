import { scrapeBlogText, getStaticSummary } from "@/utils/summariser";
import { translateToUrdu } from "@/utils/translateToUrdu"; // updated to new libretranslate version
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


  try {
    const { url } = await req.json();

    const fullText = await scrapeBlogText(url);
    if (!fullText) {
      return NextResponse.json({ error: "Unable to extract blog content." }, { status: 400 });
    }

    const summary = getStaticSummary(fullText);
    const urdu = await translateToUrdu(summary);       // translate summary
    const urduFull = await translateToUrdu(fullText);  // translate full text

    return NextResponse.json({
      summary,
      urdu,
      fullText,
      urduFull,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to summarise or translate." }, { status: 500 });
  }
}
