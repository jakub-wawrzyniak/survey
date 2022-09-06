import { Options } from "./Options";
import { MultiPointQuesion } from "../types";

type Props = { question: MultiPointQuesion };
export function QuestionMultiPoint({ question }: Props) {
  const subquestions = question.subquestions.map((questionText, id) => {
    return (
      <div key={id} className="optionAnswer">
        <Options question={question} subquestionId={id} />
        <h5 className="h5 answerText">{questionText}</h5>
      </div>
    );
  });

  return (
    <div className={"question"}>
      <h4 className="questionHeader h4">{question.title}</h4>
      <div>{subquestions}</div>
    </div>
  );
}
