import {
  MultiChoiceQuestion,
  MultiPointQuestion,
  QuestionRecord,
  ShowIf,
  SingleChoiceQuestion,
} from "../types";
import { checkType } from "../utils";

const not = (dontShowIf: ShowIf) => {
  const showIf: ShowIf = (r) => !dontShowIf(r);
  return showIf;
};

const transportAnswers = (record: QuestionRecord) => {
  const question = record[18] as MultiPointQuestion;
  checkType(question, "multipoint");
  const { pickedAnswer } = question;

  const neverAnswer = 2;
  const busAnswer = pickedAnswer[2];
  const carAnswer = pickedAnswer[0];

  return { busAnswer, carAnswer, neverAnswer };
};

const isUsingBus: ShowIf = (record) => {
  const { neverAnswer, busAnswer } = transportAnswers(record);
  return busAnswer !== undefined && busAnswer !== neverAnswer;
};

const notUsingBus: ShowIf = (record) => {
  const { neverAnswer, busAnswer } = transportAnswers(record);
  return busAnswer !== undefined && busAnswer === neverAnswer;
};

const busAnswered: ShowIf = (record) => {
  const { busAnswer } = transportAnswers(record);
  return busAnswer !== undefined;
};

const isDrivingCar: ShowIf = (record) => {
  const { neverAnswer, carAnswer } = transportAnswers(record);
  return carAnswer !== undefined && carAnswer !== neverAnswer;
};

const hasCoalFurnace: ShowIf = (record) => {
  const question = record[10] as MultiChoiceQuestion;
  checkType(question, "multichoice");
  return question.pickedAnswer.includes(3);
};

const noCoalFurnace = not(hasCoalFurnace);

const solarPanelAnswers = (record: QuestionRecord) => {
  const question = record[16] as SingleChoiceQuestion;
  checkType(question, "singlechoice");
  const { pickedAnswer: answer } = question;
  return { answer, yes: 0, no: 1 };
};

const hasSolarPanels: ShowIf = (record) => {
  const { answer, yes } = solarPanelAnswers(record);
  return answer === yes;
};

const noSolarPanels: ShowIf = (record) => {
  const { answer, no } = solarPanelAnswers(record);
  return answer === no;
};

const hasCentralHeating: ShowIf = (record) => {
  const question = record[10] as MultiChoiceQuestion;
  checkType(question, "multichoice");
  return question.pickedAnswer.includes(0);
};

const noCentralHeating = not(hasCentralHeating);

export const SHOW_QUESTION_IF: Record<number, ShowIf> = {
  11: noCentralHeating,
  12: noCoalFurnace,
  17: noSolarPanels,
  19: isDrivingCar,
  20: isUsingBus,
  21: notUsingBus,
  22: isUsingBus,
  23: notUsingBus,
  24: busAnswered,
};
