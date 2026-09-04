import { YEARS, getYear, subjectHasContent, allSubjectsFlat, CATEGORY_LABELS } from './data.js';
import * as store from './storage.js';
import { icon } from './icons.js';
import { fetchNews, MOCK_NEWS } from './news.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const CATEGORY_ORDER = ['skripte', 'video', 'vezbe', 'dodatno'];
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
const MONTHS_FULL = ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'];
const WEEKDAYS_SR = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];

// Currently displayed month in the exam calendar widget (UI-only state,
// not persisted — resets to the current month on reload).
const calendarCursor = new Date();
calendarCursor.setHours(0, 0, 0, 0);
calendarCursor.setDate(1);

// ISO date the "add exam" modal was opened for (set right before the modal
// opens, read back on submit).
let pendingDayDate = null;

const toISODate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const fmtShort = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};
const fmtHuman = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}.`;
};

const mount = () => document.getElementById('view-mount');

// ---------------------------------------------------------------------- //
// Routing
// ---------------------------------------------------------------------- //

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);
  if (parts[0] === 'year' && parts[1]) {
    return { name: 'year', yearId: Number(parts[1]), subjectId: parts[2] === 'subject' ? parts[3] || null : null };
  }
  return { name: 'home' };
}

function navigate(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

// ---------------------------------------------------------------------- //
// Sidebar
// ---------------------------------------------------------------------- //

function buildSidebarNav() {
  const list = document.getElementById('year-nav-list');
  if (!list) return;
  list.innerHTML = YEARS.map((y) => `
    <a href="#/year/${y.id}" class="nav-link year-link" data-route="year-${y.id}">
      <span>${esc(y.label)}</span>
      <span class="nav-badge">${y.subjects.length}</span>
    </a>
  `).join('');
}

function updateSidebarActive(route) {
  document.querySelectorAll('.nav-link[data-route]').forEach((el) => {
    const r = el.dataset.route;
    const active = (route.name === 'home' && r === 'home') || (route.name === 'year' && r === `year-${route.yearId}`);
    el.classList.toggle('active', active);
  });
  document.getElementById('sidebar')?.classList.remove('is-open');
  document.getElementById('sidebar-backdrop')?.classList.remove('is-open');
}

// ---------------------------------------------------------------------- //
// Modal (generic open/close + welcome content)
// ---------------------------------------------------------------------- //

function openModal(id) {
  document.getElementById('modal-overlay')?.classList.add('is-open');
  document.getElementById(id)?.classList.add('is-open');
}
function closeModals() {
  document.getElementById('modal-overlay')?.classList.remove('is-open');
  document.querySelectorAll('.modal.is-open').forEach((m) => m.classList.remove('is-open'));
}

// ---------------------------------------------------------------------- //
// Home view
// ---------------------------------------------------------------------- //

function renderHomeView() {
  const progress = store.getProgress();
  const earned = store.totalCreditsEarned();
  const target = progress.targetCredits;
  const remaining = Math.max(0, target - earned);
  const passedCount = Object.keys(progress.passed).length;
  const nextExam = store.nextUpcomingExam();
  const daysLeft = nextExam ? store.daysUntil(nextExam.date) : null;

  return `

    <div class="home-grid">
      <div class="home-main">
        <div class="stat-row">
          <div class="stat-tile">
            <div class="stat-label">Osvojeni bodovi</div>
            <div class="stat-value accent">${earned}<span style="font-size:13px;color:var(--text-muted);font-weight:500;"> / ${target}</span></div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${target > 0 ? Math.min(100, (earned / target) * 100) : 0}%"></div></div>
          </div>
          <div class="stat-tile">
            <div class="stat-label">Preostalo do upisa</div>
            <div class="stat-value ${remaining === 0 ? 'success' : ''}">${remaining}</div>
            <div class="stat-meta">boda</div>
          </div>
          <div class="stat-tile">
            <div class="stat-label">Položenih predmeta</div>
            <div class="stat-value">${passedCount}</div>
            <div class="stat-meta">od ${allSubjectsFlat().length} ukupno</div>
          </div>
          <div class="stat-tile">
            <div class="stat-label">Do sledećeg ispita</div>
            <div class="stat-value ${daysLeft !== null ? 'warning' : ''}">${daysLeft !== null ? daysLeft : '—'}</div>
            <div class="stat-meta">${daysLeft !== null ? (daysLeft === 1 ? 'dan' : 'dana') : 'nema zakazanih'}</div>
          </div>
        </div>

        <div class="dashboard-grid">
          ${renderProgressWidget()}
          ${renderBookmarksWidget()}
          ${renderExamWidget()}
        </div>
      </div>

      <aside class="home-rail">
        <div class="panel">
          <div class="panel-header">
            <h3>Najnovije vesti sa FTN sajta</h3>
            ${icon('external', 'nav-icon')}
          </div>
          <div class="panel-body" id="news-slot">
            <div class="empty-state">Učitavanje vesti…</div>
          </div>
        </div>
      </aside>
    </div>
  `;
}

function categoryBlurb(key) {
  switch (key) {
    case 'skripte':
      return 'Ova kategorija sadrži pisane materijale koje su prethodne generacije studenata pripremile tokom slušanja predavanja i vežbi. Tu se nalaze beleške, sažeci gradiva i skenirana literatura koja pomaže da se ključni pojmovi lakše zapamte i razumeju bez potrebe da se prolazi kroz celokupnu obaveznu literaturu od početka do kraja. Redovno dopunjavanje ovih materijala omogućava da svaka nova generacija dobije proverene i sažete informacije pre polaganja ispita.';
    case 'video':
      return 'Ovde su prikupljeni snimci predavanja i vežbi sa prethodnih godina, uključujući period kada je nastava zbog vanrednih okolnosti bila organizovana isključivo onlajn. Studenti mogu ponovo odgledati objašnjenja profesora i asistenata sopstvenim tempom, vraćati se na delove koji im nisu jasni i na taj način nadoknaditi propušteno predavanje ili produbiti razumevanje složenijih tema iz nastavnog programa.';
    case 'vezbe':
      return 'U ovoj sekciji nalazi se sav materijal koji je korišćen tokom vežbi, uključujući zadatke, rešenja i primere koji se često pojavljuju na kolokvijumima i ispitima. Cilj je da student kroz samostalno rešavanje sličnih primera stekne sigurnost i praktično razumevanje gradiva pre nego što pristupi proveri znanja, umesto da uči isključivo teorijski pristup bez ikakve primene naučenog.';
    default:
      return 'Ova kategorija obuhvata sve što ne pripada prethodnim trima celinama, poput korisnih spoljnih sajtova, dodatne literature, saveta starijih studenata i drugih izvora koji mogu olakšati pripremu ispita. Materijal se dopunjuje na osnovu iskustva studenata koji su predmet već položili i žele da podele ono što im je pomoglo tokom učenja.';
  }
}

function renderProgressWidget() {
  const progress = store.getProgress();
  const earned = store.totalCreditsEarned();
  const passedEntries = Object.entries(progress.passed);

  const rows = passedEntries.length
    ? passedEntries.map(([key, entry]) => {
        const [yearId, subjectId] = key.split(':');
        const flat = allSubjectsFlat().find((s) => s.yearId === Number(yearId) && s.id === subjectId);
        return `
          <div class="passed-row">
            <span class="passed-title" title="${esc(flat?.title || subjectId)}">${esc(flat?.title || subjectId)}</span>
            <span class="passed-credits">${entry.credits} b</span>
            <button class="icon-btn" data-action="remove-passed" data-year="${yearId}" data-subject="${esc(subjectId)}" title="Ukloni">${icon('x', 'nav-icon')}</button>
          </div>`;
      }).join('')
    : '<div class="empty-state">Još nema označenih predmeta.</div>';

  return `
    <div class="panel">
      <div class="panel-header">
        <h3>Napredak</h3>
        <button type="button" class="icon-btn" data-action="open-progress-modal" title="Dodaj položen predmet / izmeni cilj">${icon('plus', 'nav-icon')}</button>
      </div>
      <div class="panel-body">
        <div class="progress-summary">
          <div class="row"><span>Osvojeno</span><b>${earned} / ${progress.targetCredits}</b></div>
          <div class="progress-bar"><div class="progress-bar-fill" style="width:${progress.targetCredits > 0 ? Math.min(100, (earned / progress.targetCredits) * 100) : 0}%"></div></div>
        </div>
        <div class="passed-list">${rows}</div>
      </div>
    </div>
  `;
}

function renderProgressModalBody() {
  const progress = store.getProgress();
  const passable = allSubjectsFlat().filter((s) => !store.isSubjectPassed(s.yearId, s.id));
  const options = passable.map((s) => `<option value="${s.yearId}:${esc(s.id)}">God. ${s.yearId} — ${esc(s.title)}</option>`).join('');

  return `
    <form class="tracker-form" id="target-form">
      <div class="field">
        <label for="target-input">a) Bodova potrebno za upis sledeće godine</label>
        <div class="row">
          <input class="input" id="target-input" type="number" min="0" step="1" value="${progress.targetCredits}" />
          <button class="btn btn-sm" type="submit">Sačuvaj cilj</button>
        </div>
      </div>
    </form>
    ${passable.length ? `
    <form class="tracker-form" id="passed-form" style="margin-bottom:0;">
      <div class="field">
        <label for="passed-select">b) Dodaj položen predmet</label>
        <select class="select" id="passed-select">${options}</select>
      </div>
      <div class="row">
        <input class="input" id="passed-credits" type="number" min="0" step="1" placeholder="Broj bodova" required />
        <button class="btn btn-primary btn-sm" type="submit">Dodaj predmet</button>
      </div>
    </form>` : '<div class="empty-state" style="margin-bottom:0;">Svi predmeti su već označeni kao položeni.</div>'}
  `;
}

function refreshProgressModal() {
  const slot = document.getElementById('progress-modal-body');
  if (slot) slot.innerHTML = renderProgressModalBody();
}

const BOOKMARKS_EXPAND_THRESHOLD = 5;

function renderBookmarksWidget() {
  const bookmarks = store.getBookmarks().slice().sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  const isExpanded = bookmarks.length > BOOKMARKS_EXPAND_THRESHOLD;
  const rows = bookmarks.length
    ? bookmarks.map((b) => `
        <div class="bookmark-row">
          <a href="#/year/${b.yearId}/subject/${esc(b.subjectId)}">${esc(b.title)}</a>
          <span class="bookmark-year">God. ${b.yearId}</span>
          <button class="icon-btn is-active" data-action="remove-bookmark" data-year="${b.yearId}" data-subject="${esc(b.subjectId)}" title="Ukloni oznaku">${icon('starFilled', 'nav-icon')}</button>
        </div>`).join('')
    : '<div class="empty-state">Nema zabeleženih predmeta.<br>Klikni na zvezdicu pored predmeta da ga zabeležiš.</div>';

  return `
    <div class="panel${isExpanded ? ' expanded' : ''}">
      <div class="panel-header">
        <h3>Oznake</h3>
        ${icon('pin', 'nav-icon')}
      </div>
      <div class="panel-body">
        <div class="bookmark-list">${rows}</div>
      </div>
    </div>
  `;
}

function renderCalendarGrid(cursor, examsByDate) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;
  const todayISO = toISODate(new Date());

  let cells = '';
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startWeekday + 1;
    let cellDate;
    let isOutside = false;
    if (dayNum < 1) { cellDate = new Date(year, month - 1, prevMonthDays + dayNum); isOutside = true; }
    else if (dayNum > daysInMonth) { cellDate = new Date(year, month + 1, dayNum - daysInMonth); isOutside = true; }
    else { cellDate = new Date(year, month, dayNum); }
    const iso = toISODate(cellDate);
    const dayExams = examsByDate.get(iso) || [];
    const hasExam = dayExams.length > 0;
    const isToday = iso === todayISO;
    const cls = ['calendar-day', isOutside && 'is-outside', isToday && 'is-today', hasExam && 'has-exam'].filter(Boolean).join(' ');
    const tooltip = hasExam ? dayExams.map((e) => `${e.title} (${e.note || 'ispit'})`).join(', ') : 'Dodaj ispit';
    cells += `<div class="${cls}" role="button" tabindex="0" data-action="open-day-modal" data-date="${iso}" title="${esc(tooltip)}"><span class="day-num">${cellDate.getDate()}</span><span class="day-add">+</span></div>`;
  }

  return `
    <div class="calendar-nav">
      <button type="button" class="icon-btn" data-action="calendar-prev" title="Prethodni mesec">${icon('chevronLeft', 'nav-icon')}</button>
      <span class="calendar-month-label">${MONTHS_FULL[month]} ${year}</span>
      <button type="button" class="icon-btn" data-action="calendar-next" title="Sledeći mesec">${icon('chevronRight', 'nav-icon')}</button>
    </div>
    <div class="calendar-grid">
      ${WEEKDAYS_SR.map((w) => `<div class="calendar-weekday">${w}</div>`).join('')}
      ${cells}
    </div>
  `;
}

function renderExamWidget() {
  const next = store.nextUpcomingExam();
  const days = next ? store.daysUntil(next.date) : null;
  const exams = store.getExams();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const examsByDate = new Map();
  exams.forEach((e) => {
    if (!examsByDate.has(e.date)) examsByDate.set(e.date, []);
    examsByDate.get(e.date).push(e);
  });

  const rows = exams.length
    ? exams.map((e) => `
        <div class="exam-row ${new Date(e.date) < today ? 'is-past' : ''}">
          <span class="exam-date">${fmtShort(e.date)}</span>
          <span class="exam-title" title="${esc(e.title)}">${esc(e.title)}</span>
          ${e.note ? `<span class="badge">${esc(e.note)}</span>` : ''}
          <button class="icon-btn" data-action="remove-exam" data-id="${e.id}" title="Ukloni">${icon('trash', 'nav-icon')}</button>
        </div>`).join('')
    : '<div class="empty-state">Nema unetih ispita. Klikni na dan u kalendaru da dodaš ispit.</div>';

  return `
    <div class="panel span-2">
      <div class="panel-header">
        <h3>Kalendar ispita</h3>
        ${icon('calendar', 'nav-icon')}
      </div>
      <div class="panel-body">
        ${next ? `
        <div class="countdown-block">
          <div class="countdown-num">${days}</div>
          <div class="countdown-label">${days === 1 ? 'dan do sledećeg ispita' : 'dana do sledećeg ispita'}</div>
          <div class="countdown-title">${esc(next.title)}${next.note ? ` · ${esc(next.note)}` : ''} · ${fmtHuman(next.date)}</div>
        </div>` : `<div class="empty-state" style="margin-bottom:12px;">Nema zakazanih ispita. Klikni na dan u kalendaru da dodaš ispit.</div>`}
        ${renderCalendarGrid(calendarCursor, examsByDate)}
        <div class="exam-list">${rows}</div>
      </div>
    </div>
  `;
}

async function hydrateNews() {
  const slot = document.getElementById('news-slot');
  if (!slot) return;
  let posts;
  let isMock = false;
  try {
    posts = await fetchNews(6);
    if (!posts.length) { posts = MOCK_NEWS; isMock = true; }
  } catch {
    posts = MOCK_NEWS;
    isMock = true;
  }
  slot.innerHTML = `<div class="news-list">${posts.map((p) => `
    <a class="news-row" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">
      <div class="news-title">${esc(p.title)}</div>
      ${p.date ? `<div class="news-date">${esc(p.date)}</div>` : ''}
      ${p.excerpt ? `<div class="news-excerpt">${esc(p.excerpt)}</div>` : ''}
    </a>`).join('')}</div>
    ${isMock ? '<div class="empty-state" style="padding-top:8px;">Prikazan je primer sadržaja (podaci nisu dostupni).</div>' : ''}`;
}

// ---------------------------------------------------------------------- //
// Year view
// ---------------------------------------------------------------------- //

function renderYearView(yearId, focusSubjectId) {
  const year = getYear(yearId);
  if (!year) {
    return `<div class="page-header"><h1 class="page-title">Godina nije pronađena</h1></div>`;
  }

  const anyContent = year.subjects.some(subjectHasContent);

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">${esc(year.label)}</h1>
        <p class="page-subtitle">Izaberi predmet za pregled skripti, video predavanja, vežbi i dodatnog materijala</p>
      </div>
      <span class="badge">${year.subjects.length} predmeta</span>
    </div>

    ${!anyContent ? `<div class="year-empty-banner">Materijal za ${esc(year.label.toLowerCase())} je trenutno u pripremi. Predmeti su navedeni ispod — sadržaj se dodaje postepeno.</div>` : ''}

    <div class="subject-list">
      ${year.subjects.map((s, idx) => renderSubjectRow(year, s, idx, s.id === focusSubjectId)).join('')}
    </div>
  `;
}

function renderSubjectRow(year, subject, idx, expanded) {
  const hasContent = subjectHasContent(subject);
  const itemCount = CATEGORY_ORDER.reduce((sum, k) => sum + (subject.categories[k]?.length || 0), 0);
  const bookmarked = store.isBookmarked(year.id, subject.id);
  const passed = store.isSubjectPassed(year.id, subject.id);

  return `
    <div class="subject-row ${expanded ? 'is-expanded' : ''}" id="subject-${esc(subject.id)}" data-year="${year.id}" data-subject="${esc(subject.id)}">
      <div class="subject-row-header" role="button" tabindex="0" data-action="toggle-subject" data-year="${year.id}" data-subject="${esc(subject.id)}">
        <span class="subject-index">${String(idx + 1).padStart(2, '0')}</span>
        <span class="subject-row-title">
          <span class="t">${esc(subject.title)}</span>
          <span class="meta">
            <span>${hasContent ? `${itemCount} ${itemCount === 1 ? 'stavka' : 'stavki'}` : 'Uskoro dostupno'}</span>
            ${passed ? `<span style="color:var(--success);display:flex;align-items:center;gap:2px;">${icon('check', 'nav-icon')} položeno</span>` : ''}
          </span>
        </span>
        <span class="subject-row-actions">
          <button type="button" class="icon-btn ${bookmarked ? 'is-active' : ''}" data-action="toggle-bookmark" data-year="${year.id}" data-subject="${esc(subject.id)}" data-title="${esc(subject.title)}" data-yearlabel="${esc(year.label)}" title="${bookmarked ? 'Ukloni oznaku' : 'Zabeleži predmet'}">${icon(bookmarked ? 'starFilled' : 'star', 'nav-icon')}</button>
          <span class="chevron">${icon('chevron', 'nav-icon')}</span>
        </span>
      </div>
      <div class="subject-row-collapse">
        <div class="subject-row-collapse-inner">
          <div class="subject-row-body">
            ${renderSubjectBody(subject)}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSubjectBody(subject) {
  const hasContent = subjectHasContent(subject);
  if (!hasContent && !subject.advice) {
    return `<div class="empty-state">Materijal za ovaj predmet još nije dodat. Predloži materijal na <b>sekulovicFTN@gmail.com</b>.</div>`;
  }
  return `
    ${subject.advice ? `
      <div class="advice-box">
        <span class="icon-box">${icon('info', 'nav-icon')}</span>
        <span><b>Savet:</b> ${esc(subject.advice)}</span>
      </div>` : ''}
    ${hasContent ? `
    <div class="category-grid">
      ${CATEGORY_ORDER.map((key) => `
        <div class="category-block">
          <h4>${CATEGORY_LABELS[key]}</h4>
          <div class="material-list">
            ${subject.categories[key]?.length ? subject.categories[key].map(renderMaterialItem).join('') : '<div class="category-empty">Nema materijala.</div>'}
          </div>
        </div>
      `).join('')}
    </div>` : ''}
  `;
}

function renderMaterialItem(item) {
  const href = encodeURI(item.url);
  return `
    <div class="material-item">
      <a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(item.title)} ${icon('external', 'nav-icon')}</a>
      ${item.note ? `<div class="material-note">${esc(item.note)}</div>` : ''}
      ${item.extra?.length ? `<div class="material-extra">${item.extra.map((e) => `<a href="${esc(encodeURI(e.url))}" target="_blank" rel="noopener noreferrer">${esc(e.title)}</a>`).join(' · ')}</div>` : ''}
    </div>
  `;
}

// ---------------------------------------------------------------------- //
// Render dispatch
// ---------------------------------------------------------------------- //

function render() {
  const route = parseHash();
  updateSidebarActive(route);
  const el = mount();
  if (!el) return;

  if (route.name === 'year') {
    el.innerHTML = `<div class="view">${renderYearView(route.yearId, route.subjectId)}</div>`;
    if (route.subjectId) {
      requestAnimationFrame(() => {
        document.getElementById(`subject-${route.subjectId}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    }
  } else {
    el.innerHTML = `<div class="view">${renderHomeView()}</div>`;
    hydrateNews();
  }
  window.scrollTo({ top: 0 });
}

// ---------------------------------------------------------------------- //
// Event delegation
// ---------------------------------------------------------------------- //

function wireGlobalEvents() {
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    // let hash links navigate natively; just close mobile sidebar/menus
    if (link) {
      document.getElementById('sidebar')?.classList.remove('is-open');
      document.getElementById('sidebar-backdrop')?.classList.remove('is-open');
    }

    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;

    switch (action) {
      case 'toggle-subject': {
        const row = document.getElementById(`subject-${actionEl.dataset.subject}`);
        row?.classList.toggle('is-expanded');
        break;
      }
      case 'toggle-bookmark': {
        const { year, subject, title, yearlabel } = actionEl.dataset;
        store.toggleBookmark(year, subject, title, yearlabel);
        const nowActive = store.isBookmarked(year, subject);
        actionEl.classList.toggle('is-active', nowActive);
        actionEl.title = nowActive ? 'Ukloni oznaku' : 'Zabeleži predmet';
        actionEl.innerHTML = icon(nowActive ? 'starFilled' : 'star', 'nav-icon');
        break;
      }
      case 'remove-bookmark': {
        store.removeBookmark(actionEl.dataset.year, actionEl.dataset.subject);
        render();
        break;
      }
      case 'remove-passed': {
        store.clearSubjectPassed(actionEl.dataset.year, actionEl.dataset.subject);
        render();
        break;
      }
      case 'remove-exam': {
        store.removeExam(actionEl.dataset.id);
        render();
        break;
      }
      case 'calendar-prev':
        calendarCursor.setMonth(calendarCursor.getMonth() - 1);
        render();
        break;
      case 'calendar-next':
        calendarCursor.setMonth(calendarCursor.getMonth() + 1);
        render();
        break;
      case 'open-day-modal': {
        pendingDayDate = actionEl.dataset.date;
        const dateLabel = document.getElementById('day-modal-date');
        if (dateLabel) dateLabel.textContent = fmtHuman(pendingDayDate);
        document.getElementById('day-exam-subject').value = '';
        document.getElementById('day-exam-type').value = 'Kolokvijum';
        openModal('day-modal');
        break;
      }
      case 'open-about':
        openModal('welcome-modal');
        break;
      case 'open-progress-modal':
        refreshProgressModal();
        openModal('progress-modal');
        break;
      case 'close-modal':
        closeModals();
        break;
      case 'toggle-mobile-sidebar':
        document.getElementById('sidebar')?.classList.toggle('is-open');
        document.getElementById('sidebar-backdrop')?.classList.toggle('is-open');
        break;
      default:
        break;
    }
  });

  document.getElementById('sidebar-backdrop')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.remove('is-open');
    document.getElementById('sidebar-backdrop')?.classList.remove('is-open');
  });

  document.getElementById('modal-overlay')?.addEventListener('click', closeModals);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
    if (e.key === 'Enter' || e.key === ' ') {
      const el = e.target.closest('[role="button"][data-action]');
      if (el) { e.preventDefault(); el.click(); }
    }
  });

  document.body.addEventListener('submit', (e) => {
    if (e.target.id === 'target-form') {
      e.preventDefault();
      const val = document.getElementById('target-input').value;
      store.setProgressTarget(val);
      render();
      refreshProgressModal();
    } else if (e.target.id === 'passed-form') {
      e.preventDefault();
      const sel = document.getElementById('passed-select').value;
      const credits = document.getElementById('passed-credits').value;
      const [yearId, subjectId] = sel.split(':');
      if (yearId && subjectId) store.setSubjectPassed(yearId, subjectId, credits);
      render();
      refreshProgressModal();
    } else if (e.target.id === 'day-exam-form') {
      e.preventDefault();
      const title = document.getElementById('day-exam-subject').value.trim();
      const note = document.getElementById('day-exam-type').value;
      if (!title || !pendingDayDate) return;
      store.addExam({ title, date: pendingDayDate, note });
      pendingDayDate = null;
      closeModals();
      render();
    }
  });

  window.addEventListener('hashchange', render);
}

// ---------------------------------------------------------------------- //
// Init
// ---------------------------------------------------------------------- //

function init() {
  buildSidebarNav();
  wireGlobalEvents();
  render();

  if (!store.hasSeenOnboarding()) {
    openModal('welcome-modal');
    store.markOnboardingSeen();
  }
}

document.addEventListener('DOMContentLoaded', init);
