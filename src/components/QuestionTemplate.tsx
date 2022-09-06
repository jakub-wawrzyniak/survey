import { Nestable, Question } from "../types";

type QuestionTemplateProps = Nestable & { question: Question };
export function QuestionTemplate({
  children,
  question,
}: QuestionTemplateProps) {
  let length = "";
  if ("length" in question) length = question.length;

  return (
    <div className={"question"}>
      <h4 className="questionHeader h4">{question.title}</h4>
      <div className={"answersContainer " + length}>{children}</div>
    </div>
  );
}
