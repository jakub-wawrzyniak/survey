import { Question } from "../types";
import { QuestionMultiChoice } from "./QuestionMultiChoice";
import { QuestionMultiPoint } from "./QuestionMultiPoint";
import { QuestionSingleChoice } from "./QuestionSingleChoice";

type Props = { question: Question };
export function QuestionAny({ question }: Props) {
  // const shouldRender = question.useShouldRender();
  // const answer = useSelector((s) => s.answers[question.id]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  // if (!shouldRender && answer.length !== 0) dispatch(action(question, []));
  // });

  // if (shouldRender) {
  switch (question.type) {
    case "multichoice":
      return <QuestionMultiChoice question={question} />;
    case "singlechoice":
      return <QuestionSingleChoice question={question} />;
    case "multipoint":
      return <QuestionMultiPoint question={question} />;
    default:
      break;
  }
  // } else return <Fragment></Fragment>;

  throw "Unhandled type of question: a typo in texts.js?";
}
