import { MultiChoiceQuestion } from "../types";
import { ButtonAnswer } from "./ButtonAnswer";
import { QuestionTemplate } from "./QuestionTemplate";

type Props = { question: MultiChoiceQuestion };
export function QuestionMultiChoice({ question }: Props) {
  const answerButtons = question.answers.map((ans, id) => (
    <ButtonAnswer
      key={id}
      type="checkbox"
      isOn={id % 2 == 0}
      onClick={() => {}}
    >
      {ans}
    </ButtonAnswer>
  ));

  return (
    <QuestionTemplate question={question}>{answerButtons}</QuestionTemplate>
  );
}
