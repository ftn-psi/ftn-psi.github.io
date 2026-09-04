// localStorage-backed persistence for onboarding, progress tracker,
// bookmarks and the exam calendar. Every read is defensive against missing
// or corrupted data so a fresh visitor always gets sane defaults.

const KEYS = {
  onboarding: 'ftn.onboardingSeen',
  progress: 'ftn.progress.v1',
  bookmarks: 'ftn.bookmarks.v1',
  exams: 'ftn.exams.v1',
  plan: 'ftn.plan.v1',
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode / quota) — fail silently */
  }
}

export const subjectKey = (yearId, subjectId) => `${yearId}:${subjectId}`;

// ---------- onboarding modal ----------

export function hasSeenOnboarding() {
  return localStorage.getItem(KEYS.onboarding) === '1';
}

export function markOnboardingSeen() {
  localStorage.setItem(KEYS.onboarding, '1');
}

// ---------- progress tracker ----------

const DEFAULT_PROGRESS = { targetCredits: 60, passed: {} };

export function getProgress() {
  const data = readJSON(KEYS.progress, DEFAULT_PROGRESS);
  return { targetCredits: Number(data.targetCredits) || 60, passed: data.passed || {} };
}

export function setProgressTarget(targetCredits) {
  const progress = getProgress();
  progress.targetCredits = Math.max(0, Number(targetCredits) || 0);
  writeJSON(KEYS.progress, progress);
  return progress;
}

export function isSubjectPassed(yearId, subjectId) {
  const progress = getProgress();
  return Boolean(progress.passed[subjectKey(yearId, subjectId)]);
}

export function setSubjectPassed(yearId, subjectId, credits) {
  const progress = getProgress();
  progress.passed[subjectKey(yearId, subjectId)] = {
    credits: Math.max(0, Number(credits) || 0),
    passedAt: new Date().toISOString(),
  };
  writeJSON(KEYS.progress, progress);
  return progress;
}

export function unpassSubject(yearId, subjectId) {
  const progress = getProgress();
  delete progress.passed[subjectKey(yearId, subjectId)];
  writeJSON(KEYS.progress, progress);
  return progress;
}

export function totalCreditsEarned() {
  const progress = getProgress();
  return Object.values(progress.passed).reduce((sum, entry) => sum + (Number(entry.credits) || 0), 0);
}

// ---------- exam plan ("Plan polaganja") ----------
// Subjects a student intends to take, each with a pre-set credit value.
// Marking one passed moves its credits into the progress tracker above and
// drops it from the plan; cancelling just drops it, no credits awarded.

export function getPlan() {
  return readJSON(KEYS.plan, []);
}

export function isInPlan(yearId, subjectId) {
  const key = subjectKey(yearId, subjectId);
  return getPlan().some((p) => p.key === key);
}

export function addToPlan(yearId, subjectId, credits) {
  const plan = getPlan();
  const key = subjectKey(yearId, subjectId);
  if (plan.some((p) => p.key === key)) return plan;
  plan.push({
    key,
    yearId: Number(yearId),
    subjectId,
    credits: Math.max(0, Number(credits) || 0),
    addedAt: new Date().toISOString(),
  });
  writeJSON(KEYS.plan, plan);
  return plan;
}

export function removeFromPlan(yearId, subjectId) {
  const key = subjectKey(yearId, subjectId);
  const plan = getPlan().filter((p) => p.key !== key);
  writeJSON(KEYS.plan, plan);
  return plan;
}

export function passPlanItem(yearId, subjectId) {
  const key = subjectKey(yearId, subjectId);
  const item = getPlan().find((p) => p.key === key);
  if (!item) return null;
  setSubjectPassed(yearId, subjectId, item.credits);
  removeFromPlan(yearId, subjectId);
  return item;
}

// ---------- bookmarks ----------

export function getBookmarks() {
  return readJSON(KEYS.bookmarks, []);
}

export function isBookmarked(yearId, subjectId) {
  const key = subjectKey(yearId, subjectId);
  return getBookmarks().some((b) => b.key === key);
}

export function toggleBookmark(yearId, subjectId, title, yearLabel) {
  const key = subjectKey(yearId, subjectId);
  let bookmarks = getBookmarks();
  if (bookmarks.some((b) => b.key === key)) {
    bookmarks = bookmarks.filter((b) => b.key !== key);
  } else {
    bookmarks.push({ key, yearId: Number(yearId), subjectId, title, yearLabel, addedAt: new Date().toISOString() });
  }
  writeJSON(KEYS.bookmarks, bookmarks);
  return bookmarks;
}

export function removeBookmark(yearId, subjectId) {
  const key = subjectKey(yearId, subjectId);
  const bookmarks = getBookmarks().filter((b) => b.key !== key);
  writeJSON(KEYS.bookmarks, bookmarks);
  return bookmarks;
}

// ---------- exam calendar ----------

export function getExams() {
  const exams = readJSON(KEYS.exams, []);
  return exams.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function addExam({ title, date, note, subjectKey: sKey }) {
  const exams = readJSON(KEYS.exams, []);
  const exam = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title || 'Ispit',
    date,
    note: note || '',
    subjectKey: sKey || null,
    createdAt: new Date().toISOString(),
  };
  exams.push(exam);
  writeJSON(KEYS.exams, exams);
  return exam;
}

export function removeExam(id) {
  const exams = readJSON(KEYS.exams, []).filter((e) => e.id !== id);
  writeJSON(KEYS.exams, exams);
  return exams;
}

export function nextUpcomingExam() {
  const now = new Date();
  const upcoming = getExams()
    .map((e) => ({ ...e, dateObj: new Date(e.date) }))
    .filter((e) => !Number.isNaN(e.dateObj.getTime()) && e.dateObj >= startOfToday(now));
  upcoming.sort((a, b) => a.dateObj - b.dateObj);
  return upcoming[0] || null;
}

function startOfToday(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function daysUntil(dateStr) {
  const target = new Date(dateStr);
  if (Number.isNaN(target.getTime())) return null;
  const today = startOfToday(new Date());
  const targetDay = startOfToday(target);
  return Math.round((targetDay - today) / 86400000);
}
