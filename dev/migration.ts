import * as fs from "fs";
import { db } from "./config";
import { AnswerRecord, Submition } from "../src/types";
import { QUESTIONS } from "../src/constants/questions";
import { validateAnswer } from "./validation";

function backupAnswers(filename: string, data: unknown) {
  const json = JSON.stringify(data);
  fs.writeFile(`./dev/${filename}.json`, json, () => {});
}

type LegacyAnswer = Record<number, number[]> & { time: number };
async function fetchLegacyAnswers() {
  const collection = await db.collection("answers").get();
  const answers = collection.docs.map((doc) => doc.data());
  backupAnswers("legacyBackup", answers);
  return answers as LegacyAnswer[];
}

function loadLegacyAnswers() {
  const json = fs.readFileSync("./dev/legacyBackup.json");
  return JSON.parse(json as any) as LegacyAnswer[];
}

function translateAnswer(legacy: LegacyAnswer): AnswerRecord {
  const record: AnswerRecord = {};
  for (const question of QUESTIONS) {
    const { id, type } = question;
    const answer = legacy[id];
    if (answer === undefined) continue;
    if (answer.length === 0) continue;

    if (type === "singlechoice") record[id] = answer[0];
    else if (type === "multichoice") record[id] = answer;
    else {
      const translated: Record<number, number> = {};
      answer.forEach((optionId, subquestionId) => {
        if (typeof optionId !== "number") return;
        translated[subquestionId] = optionId;
      });
      record[id] = translated;
    }
  }
  return record;
}

function saveMigratedAnswers() {
  const legacy = loadLegacyAnswers();
  const submitions = legacy.map((answer, id): Submition => {
    const translated = translateAnswer(answer);
    validateAnswer(translated);
    if (typeof answer.time !== "number")
      throw `answer.time is not a num, but ${answer.time} on ${id}`;
    return {
      answers: translated,
      answerTime: answer.time,
    };
  });
  backupAnswers("migratedAnswers", submitions);
}

function loadMigratedAnswers() {
  const json = fs.readFileSync("./dev/migratedAnswers.json");
  return JSON.parse(json as any) as Submition[];
}

async function uploadMigratedAnswers() {
  const submitions = loadMigratedAnswers();
  const uploads = submitions.map((sub) => db.collection("answers").add(sub));
  await Promise.all(uploads);
}

uploadMigratedAnswers();
