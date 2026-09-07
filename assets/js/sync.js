// Cross-device sync via Firebase Firestore. Lets a device push its local
// progress/oznake/plan/kalendar data to a shared document keyed by a short
// numeric code, and lets another device pull it back down using that code.
//
// The Firebase SDK is loaded lazily (only once the sync modal is actually
// used) straight from Google's CDN as native ES modules — no build step,
// works fine as a static GitHub Pages site. See firebase-config.js for the
// one-time project setup this depends on.

import { firebaseConfig } from './firebase-config.js';

const SDK_VERSION = '10.12.2';
const APP_URL = `https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-app.js`;
const FIRESTORE_URL = `https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-firestore.js`;

let dbPromise = null;

export function isConfigured() {
  return Boolean(firebaseConfig?.apiKey) && !firebaseConfig.apiKey.startsWith('PASTE_');
}

export function isCodeValid(code) {
  return /^[0-9]{4,8}$/.test(String(code || '').trim());
}

async function getDb() {
  if (!isConfigured()) {
    throw new Error('Sinhronizacija još nije podešena na ovom sajtu (nedostaje Firebase konfiguracija u firebase-config.js).');
  }
  if (!dbPromise) {
    dbPromise = (async () => {
      const [{ initializeApp }, firestore] = await Promise.all([
        import(APP_URL),
        import(FIRESTORE_URL),
      ]);
      const app = initializeApp(firebaseConfig);
      return { db: firestore.getFirestore(app), fs: firestore };
    })().catch((err) => {
      dbPromise = null; // allow retry instead of caching a broken connection
      throw err;
    });
  }
  return dbPromise;
}

// Returns the saved bundle for `code`, or null if no save exists yet.
export async function pullSync(code) {
  const { db, fs } = await getDb();
  const ref = fs.doc(db, 'syncs', String(code).trim());
  const snap = await fs.getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// Creates or overwrites the saved bundle for `code` with `bundle`.
export async function pushSync(code, bundle) {
  const { db, fs } = await getDb();
  const ref = fs.doc(db, 'syncs', String(code).trim());
  const payload = { ...bundle, updatedAt: new Date().toISOString() };
  await fs.setDoc(ref, payload);
  return payload;
}
