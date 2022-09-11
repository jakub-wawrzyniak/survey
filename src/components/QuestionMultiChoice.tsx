import { useAppDispatch, useAppSelector } from "../redux";
import { selectQuestion, toggleMultiChoice } from "../redux/questionSlice";
import { MultiChoiceQuestion } from "../types";
import { ButtonAnswer } from "./ButtonAnswer";
import { QuestionTemplate } from "./QuestionTemplate";

type Props = { question: MultiChoiceQuestion };
export function QuestionMultiChoice({ question }: Props) {
  const { pickedAnswer } = useAppSelector(
    selectQuestion(question.id)
  ) as MultiChoiceQuestion;
  const dispatch = useAppDispatch();
  const toggleAnswer = (answerId: number) => {
    const payload = { answerId, questionId: question.id };
    dispatch(toggleMultiChoice(payload));
  };
  const answerButtons = question.answers.map((ans, id) => (
    <ButtonAnswer
      key={id}
      type="checkbox"
      isOn={pickedAnswer.includes(id)}
      onClick={() => toggleAnswer(id)}
    >
      {ans}
    </ButtonAnswer>
  ));

  return (
    <QuestionTemplate question={question}>{answerButtons}</QuestionTemplate>
  );
}
