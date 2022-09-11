import { SingleChoiceQuestion } from "../types";
import { ButtonAnswer } from "./ButtonAnswer";
import { QuestionTemplate } from "./QuestionTemplate";

type Props = { question: SingleChoiceQuestion };
export function QuestionSingleChoice({ question }: Props) {
  const answerButtons = question.answers.map((ans, id) => (
    <ButtonAnswer type="radio" isOn={id % 2 == 0} key={id} onClick={() => {}}>
      {ans}
    </ButtonAnswer>
  ));
  return (
    <QuestionTemplate question={question}>{answerButtons}</QuestionTemplate>
  );
}
