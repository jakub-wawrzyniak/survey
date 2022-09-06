import { AnyQuestion } from "../components/Question";
import { Question } from "../types";

type QuestionSet = {
  questions: Question[];
};
export function QuestionSetView({ questions }: QuestionSet) {
  return (
    <>
      {questions.map((question, id) => (
        <AnyQuestion key={id} question={question} />
      ))}
    </>
  );
}
