import { useAppDispatch, useAppSelector } from "../redux";
import { selectQuestion, toggleSingleChoice } from "../redux/questionSlice";
import { SingleChoiceQuestion } from "../types";
import { ButtonAnswer } from "./ButtonAnswer";
import { QuestionTemplate } from "./QuestionTemplate";

type Props = { question: SingleChoiceQuestion };
export function QuestionSingleChoice({ question }: Props) {
  const { pickedAnswer } = useAppSelector(selectQuestion(question.id));
  const dispatch = useAppDispatch();
  const toggleAnswer = (answerId: number) => {
    const payload = { answerId, questionId: question.id };
    dispatch(toggleSingleChoice(payload));
  };

  const answerButtons = question.answers.map((ans, id) => (
    <ButtonAnswer
      key={id}
      type="radio"
      isOn={pickedAnswer === id}
      onClick={() => toggleAnswer(id)}
    >
      {ans}
    </ButtonAnswer>
  ));
  return (
    <QuestionTemplate question={question}>{answerButtons}</QuestionTemplate>
  );
}
