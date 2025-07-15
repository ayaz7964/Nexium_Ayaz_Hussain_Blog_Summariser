import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function ensureTableExists() {
  const sql = `
    create table if not exists summaries (
      id uuid default uuid_generate_v4() primary key,
      url text,
      summary text
    );
  `;

  const { error } = await supabase.rpc("execute_sql", { query: sql });

  if (error) {
    console.error("Failed to ensure table exists:", error.message);
  } else {
    console.log("✅ Table 'summaries' ensured.");
  }
}

export async function POST(req: NextRequest) {
  const { url, summary } = await req.json();
  console.log("▶ Received request to save summary:", { url });

  // Create table (only needed once)
  await ensureTableExists();

  const { data, error } = await supabase.from("summaries").insert([{ url, summary }]);

  if (error) {
    console.error("❌ Supabase Insert Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("✅ Summary saved to Supabase:", data);
  return NextResponse.json({ success: true });
}
