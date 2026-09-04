// Minimal inline SVG icon set (24x24, stroke-based, currentColor).
// Keeping icons inline avoids a third-party icon-font/CDN dependency.

const PATHS = {
  home: '<path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" />',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="M3 12l9 5 9-5" /><path d="M3 16l9 5 9-5" />',
  book: '<path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" /><path d="M17 20H8" />',
  play: '<circle cx="12" cy="12" r="8.5" /><path d="M10 9l5 3-5 3V9Z" />',
  edit: '<path d="M4 17.5 15 6.5l2.5 2.5L6.5 20H4v-2.5Z" /><path d="M13 8.5 15.5 11" />',
  folder: '<path d="M4 6.5a1 1 0 0 1 1-1h4.2l2 2.2H19a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.5Z" />',
  star: '<path d="M12 4.5l2.2 4.6 5 .6-3.7 3.5.9 5-4.4-2.4-4.4 2.4.9-5-3.7-3.5 5-.6L12 4.5Z" />',
  starFilled: '<path d="M12 4.5l2.2 4.6 5 .6-3.7 3.5.9 5-4.4-2.4-4.4 2.4.9-5-3.7-3.5 5-.6L12 4.5Z" fill="currentColor" />',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1" /><path d="M3.5 9.5h17" /><path d="M8 3v4M16 3v4" />',
  sun: '<circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5Z" />',
  info: '<circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5" /><circle cx="12" cy="8.2" r="0.2" fill="currentColor" stroke-width="1.6" />',
  chevron: '<path d="M6 9.5 12 15l6-5.5" />',
  chevronLeft: '<path d="M15 5.5 8.5 12l6.5 6.5" />',
  chevronRight: '<path d="M9 5.5 15.5 12 9 18.5" />',
  plus: '<path d="M12 5v14M5 12h14" />',
  external: '<path d="M9 6h9v9" /><path d="M18 6 6 18" />',
  x: '<path d="M6 6l12 12M18 6 6 18" />',
  check: '<path d="M5 12.5l4.5 4.5L19 7" />',
  trash: '<path d="M5 7h14" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M7 7l1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12" />',
  menu: '<path d="M4 6.5h16M4 12h16M4 17.5h16" />',
  target: '<circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" />',
  pin: '<path d="M12 3.5c-3 0-5 2.1-5 5 0 3.6 5 12 5 12s5-8.4 5-12c0-2.9-2-5-5-5Z" /><circle cx="12" cy="8.4" r="1.7" />',
  clock: '<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />',
};

export function icon(name, cls = 'nav-icon') {
  const body = PATHS[name] || PATHS.info;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
