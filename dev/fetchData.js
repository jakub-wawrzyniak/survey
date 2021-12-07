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

function getAnswerTemplates() {
  const answers = questions.map((q) => {
    const temp = { id: q.id, howMany: 0, answers: {} };
    q.answers.forEach((ans, id) => (temp.answers[id] = 0));
    if (q.type === "multipoint") {
      const options = {};
      q.options.forEach((op, id) => (options[id] = 0));
      q.answers.forEach((ans, id) => (temp.answers[id] = { ...options }));
    }
    return temp;
  });
  return answers;
}

async function getAnalizedData() {
  const rawData = await getData();
  const answers = getAnswerTemplates();
  let ansTimes = 0;
  let ansCount = 0;
  rawData.forEach((ans) => {
    ansTimes += ans.time;
    delete ans.time;
    for (let key in ans) {
      ansCount++;
      const a = answers.find((a) => a.id === +key);
      const q = questions.find((q) => q.id === +key);
      a.howMany++;
      const choice = ans[+key];
      switch (q.type) {
        case "multipoint":
          choice.forEach((c, id) => a.answers[id][c]++);
        default:
          choice.forEach((c) => a.answers[c]++);
      }
    }
  });
  return answers;
}

function stringifyAnalizedData(answers) {
  let out = "";
  answers.forEach((ans) => {
    const q = questions.find((q) => q.id === ans.id);
    out += `${ans.id}: ${q.question}\n`;
    for (let ansId in ans.answers) {
      if (q.type === "multipoint") continue;
      out += `\t${ans.answers[ansId]} (${Math.round(
        (ans.answers[ansId] * 100) / ans.howMany
      )}%): ${q.answers[+ansId]}\n`;
    }
    out += "\n";
  });
  return out;
}

async function saveData() {
  const data = await getAnalizedData();
  const str = stringifyAnalizedData(data);
  // console.log(str);
  fs.writeFileSync("./answers.txt", str);
}

saveData();
