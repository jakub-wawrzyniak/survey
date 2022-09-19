import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";

function getCredential() {
  const file = fs.readFileSync("./dev/keys.json");
  const json = JSON.parse(file as any);
  return cert(json);
}

const app = initializeApp({
  credential: getCredential(),
});

export const db = getFirestore(app);
