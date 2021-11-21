import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./App.css";
import questions from "./questions";

const initalState = {
  appState: "Zaczynamy",
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "appState/change":
      return { ...state, appState: action.payload };
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

function Button({ children }) {
  const [isOn, setIsOn] = useState(false);
  const handleClick = () => setIsOn((isOn) => !isOn);
  return (
    <button onClick={handleClick} className={isOn ? "on button" : "off button"}>
      {children}
    </button>
  );
}

function MultiChoice({ question, howManyAnswers = question.answers.length }) {
  // if (howManyAnswers === undefined) howManyAnswers = ;
  console.log(howManyAnswers);
  const ansBtns = question.answers.map((ans, id) => {
    return (
      <Button key={id}>
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
        return <MultiChoice question={question} />;
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
