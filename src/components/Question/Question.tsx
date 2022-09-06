import "./Question.css";
import {
  MultiChoiceQuestion,
  Nestable,
  SingleChoiceQuestion,
  MultiPointQuesion,
  Question,
} from "../../types";

type AnswerButtonProps = Nestable & {
  isOn: boolean;
  onClick: () => void;
};
function AnswerButton({ children, isOn, onClick }: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={isOn ? "AnswerButton on" : "AnswerButton off"}
    >
      <h5 className="h5 answerText">{children}</h5>
    </button>
  );
}

type Handle<T> = { question: T };
function MultiChoice({ question }: Handle<MultiChoiceQuestion>) {
  const answerButtons = question.answers.map((ans, id) => (
    <AnswerButton isOn={id % 2 == 0} key={id} onClick={() => {}}>
      {ans}
    </AnswerButton>
  ));

  return (
    <QuestionTemplate question={question}>{answerButtons}</QuestionTemplate>
  );
}

type QuestionTemplateProps = Nestable & { question: Question };
function QuestionTemplate({ children, question }: QuestionTemplateProps) {
  let length = "";
  if ("length" in question) length = question.length;

  return (
    <div className={"question"}>
      <h4 className="questionHeader h4">{question.title}</h4>
      <div className={"answersContainer " + length}>{children}</div>
    </div>
  );
}

function SingleChoice({ question }: Handle<SingleChoiceQuestion>) {
  const answerButtons = question.answers.map((ans, id) => (
    <AnswerButton isOn={id % 2 == 0} key={id} onClick={() => {}}>
      {ans}
    </AnswerButton>
  ));
  return (
    <QuestionTemplate question={question}>{answerButtons}</QuestionTemplate>
  );
}

type OptionButtonProps = {
  value: string;
};
function OptionButton({ value }: OptionButtonProps) {
  const isOn = Math.random() > 0.5;
  return (
    <button className={isOn ? "OptionButton on" : "OptionButton off"}>
      <h5 className="h5">{value}</h5>
    </button>
  );
}

type OptionsProps = Handle<MultiPointQuesion> & { subquestionId: number };
function Options({ question, subquestionId }: OptionsProps) {
  // const dispatch = useDispatch();
  // const answers = useSelector((s) => s.answers[q.id]);
  // const answer = answers[ansId];
  // undefined means the client didnt select an option yet
  const buttons = question.options.map((op, opId) => {
    // const isOn = answer === opId;
    // const isOn = false;
    // const handleClick = () => {
    //   const newValue = [...answers];
    //   if (isOn) delete newValue[ansId];
    //   else newValue[ansId] = opId;
    //   dispatch(action(q, newValue));
    // };

    return <OptionButton key={opId} value={op} />;
  });

  return <div className="optionsContainer">{buttons}</div>;
}

function MultiPoint({ question }: Handle<MultiPointQuesion>) {
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

export function AnyQuestion({ question }: Handle<Question>) {
  // const shouldRender = question.useShouldRender();
  // const answer = useSelector((s) => s.answers[question.id]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  // if (!shouldRender && answer.length !== 0) dispatch(action(question, []));
  // });

  // if (shouldRender) {
  switch (question.type) {
    case "multichoice":
      return <MultiChoice question={question} />;
    case "singlechoice":
      return <SingleChoice question={question} />;
    case "multipoint":
      return <MultiPoint question={question} />;
    default:
      break;
  }
  // } else return <Fragment></Fragment>;

  throw "Unhandled type of question: a typo in texts.js?";
}
