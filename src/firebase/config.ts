// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, writeBatch, doc, increment } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";
import { getSubmition } from "./utils";
import { RootState } from "../redux/store";

const firebaseConfig = {
  apiKey: "AIzaSyBcqGLhgPjiDmes0WCk25fH32cgKSZHNBQ",
  authDomain: "test-7c874.firebaseapp.com",
  projectId: "test-7c874",
  storageBucket: "test-7c874.appspot.com",
  messagingSenderId: "467835212184",
  appId: "1:467835212184:web:22b2c6695b64acbc159bed",
};

async function connectEmulators() {
  const { connectFirestoreEmulator } = await import("firebase/firestore");
  const { connectAuthEmulator } = await import("firebase/auth");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const cred = signInAnonymously(auth);
const db = getFirestore(app);
if (import.meta.env.DEV) connectEmulators();
getPerformance(app);
getAnalytics(app);

export async function submitAnswers(state: RootState) {
  const submition = getSubmition(state);
  const batch = writeBatch(db);
  const { uid } = (await cred).user;
  const answers = doc(db, "answers", uid);
  const count = doc(db, "metadata", "counter");
  batch.set(answers, submition);
  batch.update(count, { howManyAnswers: increment(1) });
  await batch.commit();
}
