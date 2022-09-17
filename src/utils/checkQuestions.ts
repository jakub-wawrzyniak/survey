import {
  MultiChoiceQuestion,
  MultiPointQuestion,
  Question,
  SingleChoiceQuestion,
} from "../types";

type MultiPointPayload = {
  subquestionId: number;
  optionId: number;
};
export function checkExists(q: Question | undefined, id: number) {
  if (q !== undefined) return;
  throw `Couldn't find a question with id=${id}`;
}

export function checkType(q: Question, type: Question["type"]) {
  if (q.type === type) return;
  throw `Question with id=${q.id} turned out to be ${q.type}, but was expected to be ${type}`;
}

export function checkAnswerId(
  q: MultiChoiceQuestion | SingleChoiceQuestion,
  answerId: number
) {
  if (q.answers.length > answerId) return;
  throw `Cannot toggle answerId=${answerId}, because max id for questionId=${q.id} is ${q.answers.length}`;
}

export function checkSubquestionId(
  q: MultiPointQuestion,
  { subquestionId }: MultiPointPayload
) {
  if (q.subquestions.length > subquestionId) return;
  throw `Cannot toggle answer for questionId=${q.id} subquestionId=${subquestionId}, because this question has only ${q.subquestions.length} subquestions`;
}

export function checkOptionId(
  q: MultiPointQuestion,
  { optionId }: MultiPointPayload
) {
  if (q.options.length > optionId) return;
  throw `Cannot toggle answer for questionId=${q.id} option=${optionId}, because this question has only ${q.options.length} options`;
}
