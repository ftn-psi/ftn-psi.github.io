// --- top of file ---
import fs from "node:fs";
import path from "node:path";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

// FTN unified listing uses Elementor
const START_URL = "https://ftn.uns.ac.rs/vesti-i-desavanja/";
const MAX_ITEMS   = 6;   // we only need latest 5–6
const MAX_PAGES   = 1;   // latest page is enough
const USER_AGENT  = "github-actions-ftn-fetch/1.0 (+https://github.com/)";

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}
// put near the top of the file
function cleanText(s = "") {
  // 1) drop any HTML tags like <i>, <em>, <eng>, etc.
  let t = String(s).replace(/<[^>]*>/g, "");
  // 2) collapse whitespace
  t = t.replace(/\s+/g, " ").trim();
  // 3) optional: decode the most common HTML entities without extra deps
  t = t
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return t;
}

function parseListing(html) {
  const $ = cheerio.load(html);
  const items = [];

  $('.elementor-posts-container article.elementor-post').each((_, el) => {
    const $el = $(el);

    // Title from anchor text (already plain text)
    const a = $el.find('.elementor-post__title a').first();
    const rawTitle = a.text();
    const title = cleanText(rawTitle);

    const url = a.attr('href') || '';

    // Date (keep as-is, just trim)
    const date = cleanText($el.find('.elementor-post-date').first().text());

    // Excerpt: prefer elementor excerpt, else first <p>, then clean
    let rawExcerpt = $el.find('.elementor-post__excerpt').first().html();
    if (!rawExcerpt) rawExcerpt = $el.find('p').first().html() || $el.find('p').first().text();
    const excerpt = cleanText(rawExcerpt).slice(0, 220);

    // Image
    let image = $el.find('.elementor-post__thumbnail img').attr('src') || '';
    if (!image) image = $el.find('img').first().attr('src') || '';

    if (title && url) items.push({ title, url, date, excerpt, image });
  });

  return { items, nextUrl: null };
}


const posts = await crawl();

// ---- write JSON (root Pages) ----
const outDir = path.join(process.cwd(), "data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "ftn_posts.json"), JSON.stringify(posts, null, 2), "utf8");

console.log(`Saved ${posts.length} posts -> ${path.join(outDir, "ftn_posts.json")}`);
