import "./Question.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

function AnswerButton({ children, isOn, onClick }) {
  return (
    <button
      onClick={onClick}
      className={isOn ? "AnswerButton on" : "AnswerButton off"}
    >
      {children}
    </button>
  );
}

function getAnswerSelector(q) {
  return (state) => state.answers[q.id];
}

function action(quesiton, newValue) {
  return {
    type: "answers/update",
    payload: {
      id: quesiton.id,
      value: newValue,
    },
  };
}

function MultiChoice({ question, howManyAnswers = question.answers.length }) {
  const getMultiChoiceButtonHandler = (
    question,
    answerIds,
    id,
    dispatch,
    howManyAnswers
  ) => {
    const isOn = answerIds.includes(id);
    if (howManyAnswers === answerIds.length && !isOn) return () => {};
    let newAnswerIds = [...answerIds];
    if (isOn) newAnswerIds = newAnswerIds.filter((i) => i !== id);
    else newAnswerIds.push(id);
    return () => dispatch(action(question, newAnswerIds));
  };

  return (
    <QuestionTemplate
      question={question}
      howManyAnswers={howManyAnswers}
      getButtonHandler={getMultiChoiceButtonHandler}
    />
  );
}

function QuestionTemplate({ question, howManyAnswers, getButtonHandler }) {
  const answerIds = useSelector(getAnswerSelector(question), shallowEqual);
  const dispatch = useDispatch();
  const ansBtns = question.answers.map((ans, id) => {
    const handleClick = getButtonHandler(
      question,
      answerIds,
      id,
      dispatch,
      howManyAnswers
    );
    return (
      <AnswerButton
        key={id}
        isOn={answerIds.includes(id)}
        onClick={handleClick}
      >
        <h5 className="answerText">{ans}</h5>
      </AnswerButton>
    );
  });
  return (
    <div className={"question"}>
      <h4 className="questionHeader">{question.question}</h4>
      <div className={"answersContainer " + question.length}>{ansBtns}</div>
    </div>
  );
}

function SingleChoice({ question }) {
  const getSingleChoiceButtonHandler = (question, answerIds, id, dispatch) => {
    const newValue = answerIds[0] === id ? [] : [id];
    return () => dispatch(action(question, newValue));
  };
  return (
    <QuestionTemplate
      question={question}
      getButtonHandler={getSingleChoiceButtonHandler}
    />
  );
}

function OptionButton({ children, isOn, onClick }) {
  return (
    <button
      onClick={onClick}
      className={isOn ? "OptionButton on" : "OptionButton off"}
    >
      {children}
    </button>
  );
}

function Options({ question: q, id: ansId }) {
  const dispatch = useDispatch();
  const answers = useSelector((s) => s.answers[q.id]);
  const answer = answers[ansId];
  // undefined means the client didnt select an option yet
  const buttons = q.options.map((op, opId) => {
    const isOn = answer === opId;
    const handleClick = () => {
      const newValue = [...answers];
      if (isOn) delete newValue[ansId];
      else newValue[ansId] = opId;
      dispatch(action(q, newValue));
    };
    return (
      <OptionButton key={opId} isOn={isOn} onClick={handleClick}>
        <h5>{op}</h5>
      </OptionButton>
    );
  });
  return <div className="optionsContainer">{buttons}</div>;
}

function MultiPoint({ question: q }) {
  const answers = q.answers.map((ans, id) => {
    return (
      <div key={id} className="optionAnswer">
        <Options question={q} id={id} />
        <h5 className="answerText">{ans}</h5>
      </div>
    );
  });
  return (
    <div className={"question"}>
      <h4 className="questionHeader">{q.question}</h4>
      <div>{answers}</div>
    </div>
  );
}

function Question({ question }) {
  if (question.default) {
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
  }
  return <h3>Case for quest no {question.id} is not yet implemented :c</h3>;
}

export default Question;
