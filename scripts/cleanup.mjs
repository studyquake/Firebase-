import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBGyJSl9p1bxqm7x63pbe4WJ9lHnNQSA_E",
  authDomain: "studyquake586.firebaseapp.com",
  projectId: "studyquake586",
  storageBucket: "studyquake586.firebasestorage.app",
  messagingSenderId: "170403982802",
  appId: "1:170403982802:web:83b595d30364c294b4ec0b",
  measurementId: "G-52SNKVBJ7L"
};

const app = initializeApp(config);
const db = getFirestore(app);

async function clean() {
  console.log("Removing duplicate subj_patwar_english and subj_patwar_reasoning...");
  try {
    await deleteDoc(doc(db, "curriculum_updates", "syllabus_patwar", "subjects", "subj_patwar_english"));
    console.log("✓ Removed subj_patwar_english");
  } catch (e) {
    console.log("subj_patwar_english error/already removed:", e.message);
  }

  try {
    await deleteDoc(doc(db, "curriculum_updates", "syllabus_patwar", "subjects", "subj_patwar_reasoning"));
    console.log("✓ Removed subj_patwar_reasoning");
  } catch (e) {
    console.log("subj_patwar_reasoning error/already removed:", e.message);
  }

  try {
    await updateDoc(doc(db, "curriculum_updates", "syllabus_patwar"), {
      subjectIds: ["subj_1788269390218"],
      subjectCount: 1,
      subjects: [
        {
          id: "subj_1788269390218",
          name: "General English",
          code: "ENG",
          topicsCount: 5,
          description: "General English syllabus with 5 topics, subtopics, units, notes, pyqs, and mcqs"
        }
      ]
    });
    console.log("✓ Restored root document syllabus_patwar with authentic subj_1788269390218");
  } catch (e) {
    console.error("Error updating root:", e);
  }

  process.exit(0);
}

clean();
