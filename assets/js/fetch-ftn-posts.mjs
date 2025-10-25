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
function cleanText(s = "") {
  let t = String(s);
  // remove custom <eng>...</eng> markers and any HTML tags
  t = t.replace(/<\/*eng>/gi, "");      // specifically drop <eng> and </eng>
  t = t.replace(/<[^>]*>/g, "");        // drop all other tags
  t = t.replace(/\s+/g, " ").trim();    // collapse whitespace
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
    let image =
      $el.find('.elementor-post__thumbnail img').attr('src') ||
      $el.find('.elementor-post__thumbnail img').attr('data-src') ||
      ($el.find('.elementor-post__thumbnail img').attr('srcset') || '').split(' ').shift() ||
      $el.find('img').first().attr('src') ||
      '';


    if (title && url) items.push({ title, url, date, excerpt, image });
  });

  return { items, nextUrl: null };
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function crawl() {
  let url = START_URL;
  const all = [];
  for (let i = 0; i < MAX_PAGES && url; i++) {
    const html = await fetchHtml(url);
    const { items, nextUrl } = parseListing(html);
    for (const it of items) {
      if (all.length < MAX_ITEMS) all.push(it);
    }
    url = nextUrl;
    if (all.length >= MAX_ITEMS) break;
    await sleep(500); // optional delay between requests
  }
  return all;
}


const posts = await crawl();

// ---- write JSON (root Pages) ----
const outDir = path.join(process.cwd(), "data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "ftn_posts.json"), JSON.stringify(posts, null, 2), "utf8");

console.log(`Saved ${posts.length} posts -> ${path.join(outDir, "ftn_posts.json")}`);
