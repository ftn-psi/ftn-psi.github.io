// Fetches the latest FTN announcements, pre-generated on a schedule by
// assets/js/fetch-ftn-posts.mjs (GitHub Action) into data/ftn_posts.json.
// This is a same-origin fetch in production (GitHub Pages), so it isn't
// actually subject to CORS — but it does fail when the site is opened
// straight from disk (file://) instead of through a server, which browsers
// block for security reasons. MOCK_NEWS covers that case so the widget
// never looks broken during local, serverless preview.

export const MOCK_NEWS = [
  {
    title: 'Vesti se prikazuju kada je sajt otvoren preko servera',
    url: 'https://ftn.uns.ac.rs/',
    date: '',
    excerpt: 'Ovaj sadržaj je placeholder — otvori sajt preko lokalnog servera (npr. "python -m http.server") ili preko GitHub Pages da bi se učitale prave vesti iz data/ftn_posts.json.',
    image: '',
  },
  {
    title: 'Raspored ispitnih rokova',
    url: 'https://ftn.uns.ac.rs/',
    date: '',
    excerpt: 'Primer stavke vesti — pravi podaci se automatski osvežavaju preko GitHub Action skripte i ne zahtevaju izmenu koda.',
    image: '',
  },
  {
    title: 'Sajt fakulteta tehničkih nauka',
    url: 'https://ftn.uns.ac.rs/',
    date: '',
    excerpt: 'Za najnovije zvanične vesti fakulteta poseti ftn.uns.ac.rs.',
    image: '',
  },
];

export async function fetchNews(limit = 5) {
  const res = await fetch('data/ftn_posts.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('FTN posts not available');
  const posts = await res.json();
  return Array.isArray(posts) ? posts.slice(0, limit) : [];
}
