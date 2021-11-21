import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./App.css";
import questions from "./questions";

function getEmptyAnswers() {
  const out = {};
  questions.forEach((q) => (out[q.id] = []));
  return out;
}

const initalState = {
  appState: "Zaczynamy",
  answers: getEmptyAnswers(),
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "appState/change":
      return { ...state, appState: action.payload };
    case "answers/update":
      const newState = { ...state, answers: { ...state.answers } };
      newState.answers[action.payload.id] = action.payload.value;
      return newState;
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

function PageSelector() {
  const pages = [
    "Zaczynamy",
    "O tobie",
    "Ocena powietrza",
    "Energetyka i Ogrzewanie",
    "Transport",
    "Podsumowanie",
  ];
  const selector = (state) => pages.findIndex((e) => e === state.appState);
  const doneId = useSelector(selector);
  const dispatch = useDispatch();
  const jsx = pages.map((p, id) => {
    const className = id > doneId ? "toBeDone" : "";
    const event = { type: "appState/change", payload: p };
    return (
      <button key={p} onClick={() => dispatch(event)}>
        <h4 className={className}>{p}</h4>
      </button>
    );
  });
  return <div className="PageSelector">{jsx}</div>;
}

function Button({ children, isOn, toggle }) {
  return (
    <button onClick={toggle} className={isOn ? "on button" : "off button"}>
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
  const answerIds = useSelector(getAnswerSelector(question), shallowEqual);
  const dispatch = useDispatch();
  const ansBtns = question.answers.map((ans, id) => {
    const isOn = answerIds.includes(id);
    const toggle = () => {
      let newAnswerIds = [...answerIds];
      if (isOn) newAnswerIds = newAnswerIds.filter((i) => i !== id);
      else if (answerIds.length >= howManyAnswers) return;
      else newAnswerIds.push(id);
      dispatch(action(question, newAnswerIds));
    };
    return (
      <Button key={id} isOn={isOn} toggle={toggle}>
        <h5 className="longAnswer">{ans}</h5>
      </Button>
    );
  });
  return (
    <div className={"Multichoice question"}>
      <h4 className="questionHeader">{question.question}</h4>
      <div className="longAnswers">{ansBtns}</div>
    </div>
  );
}

function Question({ question }) {
  if (question.default) {
    switch (question.type) {
      case "multichoice":
        return <MultiChoice question={question} howManyAnswers={2} />;
      default:
        break;
    }
  }
  return <h3>Case for quest no {question.id} is not yet implemented :c</h3>;
}

function Questionare() {
  return (
    <main id="quest">
      <PageSelector />
      <div id="questContainer">
        <Question question={questions[0]} />
      </div>
    </main>
  );
}

function App() {
  return <Questionare />;
}

export { App, store };
