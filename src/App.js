import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./App.css";
import { questions, pages } from "./texts";
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
  const selector = (state) => pages.findIndex((e) => e === state.appState);
  const pageId = useSelector(selector);
  const dispatch = useDispatch();
  const jsx = pages.map((p, id) => {
    const className = id > pageId ? "notVisited" : "";
    const event = { type: "appState/change", payload: p };
    return (
      <button key={p} onClick={() => dispatch(event)}>
        <h5 className={className}>{p}</h5>
      </button>
    );
  });
  return <div className="PageSelector">{jsx}</div>;
}

function ControlButtons() {
  const selector = (s) => pages.findIndex((p) => p === s.appState);
  const pageId = useSelector(selector);
  const dispatch = useDispatch();
  const isLast = pageId === pages.length - 1;
  const isFirst = pageId === 0;
  const turnPage = (way) => {
    const newPageId = pageId + way;
    if (newPageId >= pages.length) return;
    if (newPageId < 0) return;
    dispatch({
      type: "appState/change",
      payload: pages[newPageId],
    });
  };
  return (
    <div className="ControlButtons">
      <button
        className={isFirst ? "ControlButton off" : "ControlButton on"}
        onClick={() => turnPage(-1)}
      >
        <h4>{"< Powrót"}</h4>
      </button>
      <button
        className={isLast ? "ControlButton off" : "ControlButton on"}
        onClick={() => turnPage(1)}
      >
        <h4>{"Dalej >"}</h4>
      </button>
    </div>
  );
}

function Questionare() {
  const page = useSelector((s) => s.appState);
  return (
    <main id="quest">
      <PageSelector />
      <div id="questContainer">
        {questions
          .filter((q) => q.page === page)
          .map((q) => (
            <Question question={q} key={q.id} />
          ))}
        <ControlButtons />
      </div>
    </main>
  );
}

function App() {
  return <Questionare />;
}

export { App, store };
