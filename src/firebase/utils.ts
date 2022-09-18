import { QUESTIONS } from "../constants";
import { AnswerRecord, QuestionRecord, Submition } from "../types";
import { isQuestionEmpty } from "../utils/questionHelpers";
import { RootState } from "../redux/store";

function stripAnswers(record: QuestionRecord): AnswerRecord {
  const answers: AnswerRecord = {};
  for (const { id } of QUESTIONS) {
    const question = record[id];
    if (isQuestionEmpty(question)) continue;
    answers[id] = question.pickedAnswer;
  }
  return answers;
}

export function getSubmition(state: RootState): Submition {
  const answers = stripAnswers(state.questions);
  const answerTime = state.metadata.answerTimeMS;
  return { answers, answerTime };
}
