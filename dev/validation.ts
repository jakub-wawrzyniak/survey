import { QUESTIONS } from "../src/constants/questions";
import {
  Question,
  AnswerRecord,
  SingleChoiceQuestion,
  MultiChoiceQuestion,
  MultiPointQuestion,
} from "../src/types";

function validateSingleChoice(
  q: SingleChoiceQuestion,
  ans: Question["pickedAnswer"]
) {
  if (ans === null) return;
  const picked = q.answers[ans as any];
  if (picked !== undefined) return;
  throw `Cannot use ${ans} as an id of possible answer lists for question id=${q.id}`;
}

function validateMultiChoice(
  q: MultiChoiceQuestion,
  ans: Question["pickedAnswer"]
) {
  if (!Array.isArray(ans))
    throw `Expected an array as a multichoice answer, got ${ans}`;
  const answerIds = ans as unknown[];
  const howManyAnwersAllowed = q.maxNoOfAnswers ?? q.answers.length;
  if (answerIds.length > howManyAnwersAllowed)
    throw "Found more items in a list than available options";
  const isValid = answerIds.every(
    (id) => typeof id === "number" && q.answers[id] !== undefined
  );
  if (!isValid) throw "At least one answerId does not index possible answers";
}

function validateMultiPoint(
  q: MultiPointQuestion,
  ans: Question["pickedAnswer"]
) {
  if (typeof ans !== "object")
    throw "Only objects are allowed as answers to multipoint questions";
  const answers = ans as any;
  q.subquestions.forEach((_, id) => {
    const optionId = answers[id];
    if (optionId === undefined) return;
    const referecesOption = q.options[optionId] !== undefined;
    if (!referecesOption)
      throw `${optionId} cannot be used as an index of ${q.options}`;
  });
}

export function validateAnswer(record: AnswerRecord) {
  for (const q of QUESTIONS) {
    const { type } = q;
    const ans = record[q.id];
    if (ans === undefined) continue;
    if (type === "singlechoice") validateSingleChoice(q, ans);
    else if (type === "multichoice") validateMultiChoice(q, ans);
    else validateMultiPoint(q, ans);
  }
}
