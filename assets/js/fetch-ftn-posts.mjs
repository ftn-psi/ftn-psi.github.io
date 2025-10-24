import fs from "node:fs";
import path from "node:path";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const START_URL = "https://ftn.uns.ac.rs/category/ftn-vesti/"; // FTN news list
const MAX_PAGES = 3;   // crawl first 3 pages (tune as needed)
const MAX_ITEMS = 50;  // safety cap

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "user-agent": "github-actions-ftn-fetch" }});
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

// Parse a listing page and return [{title, url, date, excerpt, image}]
function parseListing(html) {
  const $ = cheerio.load(html);

  // Works for FTN’s current WP theme: selectors target post cards/titles
  // (Theme may change; tweak selectors if needed.)
  const items = [];

  $("article, .post, .news, .entry").each((_, el) => {
    const $el = $(el);
    const titleEl = $el.find("h1 a, h2 a, .entry-title a").first();
    const title = titleEl.text().trim();
    const url = titleEl.attr("href");

    // date appears near title; grab the nearest time/date text we can find
    const date =
      $el.find("time").attr("datetime")?.trim() ||
      $el.find(".date, .posted-on").text().trim() ||
      "";

    const excerpt =
      $el.find(".entry-summary, .excerpt, p").first().text().trim().slice(0, 280);

    // optional image
    const img =
      $el.find("img").first().attr("src") || "";

    if (title && url) {
      items.push({ title, url, date, excerpt, image: img });
    }
  });

  // Try to discover “next page” link; common WP patterns:
  const next =
    $('a.next, a[rel="next"], .nav-previous a, .ast-pagination .next').attr("href") ||
    $(".pagination a").filter((_, a) => /next|»/i.test($(a).text())).attr("href") ||
    "";

  return { items, nextUrl: next || null };
}

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
  }
  return all;
}

const posts = await crawl();

// Ensure folder exists and write JSON
const outDir = path.join(process.cwd(), "data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "ftn_posts.json"), JSON.stringify(posts, null, 2), "utf8");

console.log(`Saved ${posts.length} posts -> data/ftn_posts.json`);
