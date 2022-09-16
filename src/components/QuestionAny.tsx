import { useAppSelector } from "../redux";
import { selectShouldShowQuestion } from "../redux/questionSlice";
import { Question } from "../types";
import { QuestionMultiChoice } from "./QuestionMultiChoice";
import { QuestionMultiPoint } from "./QuestionMultiPoint";
import { QuestionSingleChoice } from "./QuestionSingleChoice";

type Props = { question: Question };
export function QuestionAny({ question }: Props) {
  const { id, type } = question;
  const shouldRender = useAppSelector(selectShouldShowQuestion(id));
  if (!shouldRender) return;

  switch (type) {
    case "multichoice":
      return <QuestionMultiChoice question={question} />;
    case "singlechoice":
      return <QuestionSingleChoice question={question} />;
    case "multipoint":
      return <QuestionMultiPoint question={question} />;
    default:
      throw "Unhandled type of question: a typo in texts.js?";
  }
}
