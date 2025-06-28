const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
});
const db = getFirestore();

async function deleteOldSessions() {
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000; // 90 days ago
  const oldSessions = await db.collection('sessions')
    .where('timestamp', '<', new Date(cutoff).toISOString())
    .get();

  if (oldSessions.empty) {
    console.log('No old sessions to delete.');
    return;
  }

  const batch = db.batch();
  oldSessions.forEach(doc => batch.delete(doc.ref));
  await batch.commit();

  console.log(`Deleted ${oldSessions.size} old sessions.`);
}

deleteOldSessions().catch(console.error); 