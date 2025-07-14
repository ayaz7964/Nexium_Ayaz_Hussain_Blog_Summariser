import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI!;
const client = new MongoClient(mongoUri);

export async function POST(req: NextRequest) {
  const { url, fullText } = await req.json();
  try {
    await client.connect();
    const db = client.db("blogSummariser");
    await db.collection("fullTexts").insertOne({ url, fullText });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}