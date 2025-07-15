// import { NextRequest, NextResponse } from "next/server";
// import { MongoClient } from "mongodb";

// const mongoUri = process.env.MONGODB_URI!;
// const client = new MongoClient(mongoUri);

// export async function POST(req: NextRequest) {
//   const { url, fullText } = await req.json();

//   console.log("Saving full text to MongoDB:", { url });

//   try {
//     await client.connect();
//     const db = client.db("blogSummariser");
//     const collection = db.collection("fullTexts");

//     await collection.insertOne({ url, fullText });

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("MongoDB Insert Error:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   } finally {
//     await client.close();
//   }
// }






import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI!;

// Cache client across hot reloads in development and re-use in production
let cachedClient: MongoClient | null = null;

async function connectToMongo() {
  if (!cachedClient) {
    cachedClient = new MongoClient(mongoUri);
    await cachedClient.connect();
  }
  return cachedClient;
}

export async function POST(req: NextRequest) {
  try {
    const { url, fullText } = await req.json();

    if (!url || !fullText) {
      return NextResponse.json({ error: "Missing url or fullText" }, { status: 400 });
    }

    console.log("Saving full text to MongoDB:", { url });

    const client = await connectToMongo();
    const db = client.db("blogSummariser");
    const collection = db.collection("fullTexts");

    await collection.insertOne({ url, fullText });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("MongoDB Insert Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
