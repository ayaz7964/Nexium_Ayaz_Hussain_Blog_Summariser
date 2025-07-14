import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function translateToUrdu(text: string): Promise<string> {
  try {
    if (!text || text.length < 10) return "ترجمہ کرنے کے لیے کافی متن موجود نہیں۔";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional translator. Translate the following English blog text into Urdu.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const translated = response.choices?.[0]?.message?.content;
    return translated || "ترجمہ دستیاب نہیں۔";
  } catch (error: any) {
    console.error("Translation error:", error.response?.status, error.response?.data || error.message || error);
    return "ترجمے میں خرابی پیش آئی۔";
  }
}
