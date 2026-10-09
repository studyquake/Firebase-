import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBGyJSl9p1bxqm7x63pbe4WJ9lHnNQSA_E",
  authDomain: "studyquake586.firebaseapp.com",
  projectId: "studyquake586",
  storageBucket: "studyquake586.firebasestorage.app",
  messagingSenderId: "170403982802",
  appId: "1:170403982802:web:83b595d30364c294b4ec0b",
  measurementId: "G-52SNKVBJ7L"
};

const app = initializeApp(DEFAULT_FIREBASE_CONFIG);
const db = getFirestore(app);

const reasoningTopics = [
  { id: "top_1", title: "Making Series / श्रंखला निर्माण", subtopics: [{ title: "Number Series" }, { title: "Alphabet Series" }] },
  { id: "top_2", title: "Analogy / सादृश्यता", subtopics: [{ title: "Word Analogy" }, { title: "Number Analogy" }] },
  { id: "top_3", title: "Figure Matrix Questions / आकृति आव्यूह", subtopics: [{ title: "Pattern Completion" }] },
  { id: "top_4", title: "Classification / वर्गीकरण (विषम छांटना)", subtopics: [{ title: "Word Classification" }, { title: "Symbol Classification" }] },
  { id: "top_5", title: "Alphabet Test / वर्णमाला परीक्षण", subtopics: [{ title: "Alphabetical Order" }, { title: "Letter Pairs" }] },
  { id: "top_6", title: "Passage and Conclusions / गद्यांश और निष्कर्ष", subtopics: [{ title: "Statement & Argument" }, { title: "Conclusion Derivation" }] },
  { id: "top_7", title: "Blood Relations / रक्त संबंध", subtopics: [{ title: "Family Tree" }, { title: "Coded Relations" }] },
  { id: "top_8", title: "Coding-Decoding / कोडिंग-डिकोडिंग", subtopics: [{ title: "Letter Coding" }, { title: "Number Coding" }] },
  { id: "top_9", title: "Direction Sense Test / दिशा ज्ञान परीक्षण", subtopics: [{ title: "Distance & Direction" }, { title: "Angle Turnings" }] },
  { id: "top_10", title: "Sitting Arrangement / बैठक व्यवस्था", subtopics: [{ title: "Linear Arrangement" }, { title: "Circular Arrangement" }] },
  { id: "top_11", title: "Input-Output / इनपुट-आउटपुट", subtopics: [{ title: "Machine Input Steps" }] },
  { id: "top_12", title: "Number Ranking & Time Sequence / संख्या रैंकिंग और समय क्रम", subtopics: [{ title: "Position from Left/Right" }, { title: "Time Sequence" }] },
  { id: "top_13", title: "Making Judgments / निर्णय लेना", subtopics: [{ title: "Eligibility Criteria Decision" }] },
  { id: "top_14", title: "Logical Arrangement of Words / शब्दों का तार्किक क्रम", subtopics: [{ title: "Dictionary Order" }, { title: "Meaningful Sequence" }] },
  { id: "top_15", title: "Inserting Missing Character / लुप्त पद भरना", subtopics: [{ title: "Missing Number in Matrix" }, { title: "Circle Pattern" }] }
];

const englishTopics = [
  { id: "eng_1", title: "Comprehension of Unseen Passage", subtopics: [{ title: "Fact Retrieval" }, { title: "Inference & Title" }] },
  { id: "eng_2", title: "Correction of Common Errors; Correct Usage", subtopics: [{ title: "Subject-Verb Agreement" }, { title: "Tenses & Prepositions" }, { title: "Articles" }] },
  { id: "eng_3", title: "Synonyms & Antonyms", subtopics: [{ title: "Vocabulary Practice" }, { title: "Contextual Meanings" }] },
  { id: "eng_4", title: "Phrases and Idioms", subtopics: [{ title: "Common Idioms" }, { title: "Phrasal Verbs" }] },
  { id: "eng_5", title: "One Word Substitution", subtopics: [{ title: "General Words" }, { title: "Academic & Legal Terms" }] }
];

async function seed() {
  console.log("Starting Firebase Firestore upload for Patwar Exam...");

  // 1. Create main document: curriculum_updates/syllabus_patwar
  const syllabusRef = doc(db, "curriculum_updates", "syllabus_patwar");
  await setDoc(syllabusRef, {
    level: "patwar",
    examName: "Rajasthan Patwar Exam",
    schemaVersion: 2,
    subjectCount: 2,
    subjectIds: ["subj_patwar_reasoning", "subj_patwar_english"],
    subjects: [
      {
        id: "subj_patwar_reasoning",
        name: "Reasoning",
        code: "REA",
        topicsCount: 15,
        description: "Mental ability and reasoning for Patwar exam"
      },
      {
        id: "subj_patwar_english",
        name: "General English",
        code: "ENG",
        topicsCount: 5,
        description: "General English language proficiency"
      }
    ],
    updatedAt: serverTimestamp()
  }, { merge: true });

  console.log("✓ Root document curriculum_updates/syllabus_patwar created/updated successfully.");

  // 2. Add Reasoning Subject to subcollection
  const reasoningRef = doc(db, "curriculum_updates", "syllabus_patwar", "subjects", "subj_patwar_reasoning");
  await setDoc(reasoningRef, {
    id: "subj_patwar_reasoning",
    name: "Reasoning",
    code: "REA",
    chaptersCount: 15,
    topicsCount: 15,
    description: "Complete 15 topics covering Verbal, Non-Verbal, Logical Reasoning and Decision Making",
    topics: reasoningTopics,
    updatedAt: serverTimestamp()
  }, { merge: true });
  console.log("✓ Subcollection document: curriculum_updates/syllabus_patwar/subjects/subj_patwar_reasoning saved!");

  // 3. Add General English Subject to subcollection
  const englishRef = doc(db, "curriculum_updates", "syllabus_patwar", "subjects", "subj_patwar_english");
  await setDoc(englishRef, {
    id: "subj_patwar_english",
    name: "General English",
    code: "ENG",
    chaptersCount: 5,
    topicsCount: 5,
    description: "Comprehension, Grammar correction, Synonyms/Antonyms, Idioms & Phrases",
    topics: englishTopics,
    updatedAt: serverTimestamp()
  }, { merge: true });
  console.log("✓ Subcollection document: curriculum_updates/syllabus_patwar/subjects/subj_patwar_english saved!");

  console.log("🎉 All Patwar data successfully added to Firebase Firestore!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error adding to Firestore:", err);
  process.exit(1);
});
