const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteOldSessions = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const db = admin.firestore();
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000; // 90 days ago
  const oldSessions = await db.collection("sessions")
      .where("timestamp", "<", new Date(cutoff).toISOString())
      .get();

  const batch = db.batch();
  oldSessions.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  console.log(`Deleted ${oldSessions.size} old sessions.`);
  return null;
});
