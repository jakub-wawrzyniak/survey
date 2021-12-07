const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const fs = require("fs");
const serviceAccount = require("./keys.json");
const texts = require("../src/texts");
const questions = texts.questions;

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const dataDump = (rawAns) => {
  const out = [];
  for (let key in rawAns) {
    if (key === "time") {
      out.push("Czas wypełniania: " + +rawAns.time / 1000 + "s");
      continue;
    }
    const q = questions.find((q) => q.id === +key);
    const choice = rawAns[+key];
    if (choice.length === 0) continue;
    let strChoice;
    switch (q.type) {
      case "singlechoice":
        strChoice = q.answers[choice[0]];
        break;
      case "multichoice":
        strChoice = choice.map((c) => q.answers[c]);
        break;
      case "multipoint":
        strChoice = choice.map((c, id) => q.answers[id] + ": " + q.options[c]);
        break;
    }
    out.push(q.question + ": " + strChoice);
  }
  return out.join("\n");
};

async function getData() {
  const docs = await db.collection("answers").get();
  const rawData = [];
  docs.forEach((d) => rawData.push(d.data()));
  return rawData;
}

// const ans = rawData.map(dataDump);
// return ans.join("\n\n");

async function getDumpedData() {
  const rawData = await getData();
  return rawData.map(dataDump).join("\n\n");
}

async function getAnalizedData() {
  const rawData = await getData();
  const singleChoiceQuestions = questions.filter(
    (q) => q.type === "singlechoice"
  );
  const singleChoiceIds = singleChoiceQuestions.map((q) => q.id);
  const singleChoiceAnswers = singleChoiceIds.map((id) => {
    return {
      howMany: 0,
      id: id,
      answers: question
        .find((i) => i === id)
        .answers.map((e, i) => {
          return {};
        }),
    };
  });

  rawData.forEach((ans) => {
    for (let key in ans) {
      if (key === "time") continue;
      switch (q.type) {
        case "singlechoice":
          strChoice = q.answers[choice[0]];
          break;
        // case "multichoice":
        //   strChoice = choice.map((c) => q.answers[c]);
        //   break;
        // case "multipoint":
        //   strChoice = choice.map((c, id) => q.answers[id] + ": " + q.options[c]);
        //   break;
        default:
          continue;
      }
    }
  });
}

async function saveData() {
  const data = await getAnalizedData();
  fs.writeFileSync("./answers.txt", data);
}

saveData();
// console.log(questions);
