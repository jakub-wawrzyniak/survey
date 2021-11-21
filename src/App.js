import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./App.css";
import questions from "./questions";
import Question from "./Question/Question";

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
    "Kończymy",
  ];
  const selector = (state) => pages.findIndex((e) => e === state.appState);
  const pageId = useSelector(selector);
  const dispatch = useDispatch();
  const jsx = pages.map((p, id) => {
    const className = id > pageId ? "notVisited" : "";
    const event = { type: "appState/change", payload: p };
    return (
      <button key={p} onClick={() => dispatch(event)}>
        <h4 className={className}>{p}</h4>
      </button>
    );
  });
  return <div className="PageSelector">{jsx}</div>;
}

function Questionare() {
  return (
    <main id="quest">
      <PageSelector />
      <div id="questContainer">
        {questions.map((q) => (
          <Question question={q} key={q.id} />
        ))}
      </div>
    </main>
  );
}

function App() {
  return <Questionare />;
}

export { App, store };
