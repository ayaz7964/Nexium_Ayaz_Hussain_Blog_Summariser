import * as cheerio from 'cheerio';

export async function scrapeBlogText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // simulate a browser
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Remove unwanted tags
    $('script, style, noscript, iframe, header, footer, nav, svg').remove();

    // Extract all readable text
    const textElements: string[] = [];

    $('body')
      .find('*')
      .each((_, el) => {
        const tag = el.tagName.toLowerCase();
        const text = $(el).text().trim();

        if (
          text &&
          !textElements.includes(text) &&
          ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'li', 'article', 'section'].includes(tag)
        ) {
          textElements.push(text);
        }
      });

    return textElements.join(' ');
  } catch (error) {
    console.error("Scrape error:", error);
    return "";
  }
}

export function getStaticSummary(text: string): string {
  if (!text) return "No content found.";

  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  const firstParagraph = sentences.slice(0, 3).join(" ");
  const keywords = ["symptoms", "difference", "hormone", "consult"];

  const points = sentences.filter(sentence =>
    keywords.some(kw => sentence.toLowerCase().includes(kw))
  ).slice(0, 2);

  return [firstParagraph, ...points].join(" ");
}
