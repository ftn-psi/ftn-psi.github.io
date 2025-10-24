import fs from "node:fs";
import path from "node:path";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const START_URL = "https://ftn.uns.ac.rs/vesti-i-desavanja/";  // FTN news list
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
  const items = [];

  $('h3').each((_, h3) => {
    const a = $(h3).find('a').first();
    if (!a.length) return;

    const title = a.text().trim();
    const url   = a.attr('href');

    let excerpt = '';
    let date = '';
    let node = $(h3).next();

    for (let i = 0; i < 6 && node.length; i++) {
      const text = node.text().trim().replace(/\s+/g, ' ');
      if (node.is('h3')) break;

      if (!excerpt && text && !/Pročitaj više/i.test(text) && !/\d{2}\.\d{2}\.\d{4}\./.test(text)) {
        excerpt = text.slice(0, 300);
      }

      const m = text.match(/\b(\d{2}\.\d{2}\.\d{4})\b/);
      if (m && !date) date = m[1];

      node = node.next();
    }

    if (title && url) {
      items.push({ title, url, date, excerpt });
    }
  });

  let nextUrl = null;
  $('a').each((_, a) => {
    const t = $(a).text().trim();
    if (/Sledeće/i.test(t)) {
      nextUrl = $(a).attr('href') || null;
    }
  });

  return { items, nextUrl };
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
