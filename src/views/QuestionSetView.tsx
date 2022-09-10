import { ControlLinks } from "../components/ControlLinks";
import { QuestionAny } from "../components/QuestionAny";
import { Question } from "../types";

type QuestionSet = {
  questions: Question[];
};
export function QuestionSetView({ questions }: QuestionSet) {
  return (
    <>
      {questions.map((question, id) => (
        <QuestionAny key={id} question={question} />
      ))}
      <ControlLinks />
    </>
  );
}
