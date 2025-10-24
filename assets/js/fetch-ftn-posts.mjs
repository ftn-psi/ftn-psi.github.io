// --- top of file ---
import fs from "node:fs";
import path from "node:path";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

// FTN unified listing uses Elementor
const START_URL   = "https://ftn.uns.ac.rs/vesti-i-desavanja/";
const MAX_ITEMS   = 6;   // we only need latest 5–6
const MAX_PAGES   = 1;   // latest page is enough
const USER_AGENT  = "github-actions-ftn-fetch/1.0 (+https://github.com/)";

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function parseListing(html) {
  const $ = cheerio.load(html);
  const items = [];

  const posts = $('.elementor-posts-container article.elementor-post');
  posts.each((_, el) => {
    const $el = $(el);

    const a = $el.find('.elementor-post__title a').first();
    const title = a.text().trim();
    const url   = a.attr('href') || '';

    const date  = $el.find('.elementor-post-date').first().text().trim();

    // excerpt: prefer elementor’s excerpt, else first reasonable paragraph
    let excerpt = $el.find('.elementor-post__excerpt').text().trim();
    if (!excerpt) {
      const p = $el.find('p').first().text().trim();
      excerpt = p || '';
    }
    excerpt = excerpt.replace(/\s+/g, ' ').slice(0, 220);

    // image: try elementor thumbnail first, else any <img>
    let image = $el.find('.elementor-post__thumbnail img').attr('src') || '';
    if (!image) image = $el.find('img').first().attr('src') || '';

    if (title && url) {
      items.push({ title, url, date, excerpt, image });
    }
  });

  const nextUrl = null;
  return { items, nextUrl };
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
    await sleep(500);
  }
  return all;
}

const posts = await crawl();

// ---- write JSON (root Pages) ----
const outDir = path.join(process.cwd(), "data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "ftn_posts.json"), JSON.stringify(posts, null, 2), "utf8");

console.log(`Saved ${posts.length} posts -> ${path.join(outDir, "ftn_posts.json")}`);
