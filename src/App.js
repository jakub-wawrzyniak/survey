import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { Fragment, useEffect, useState } from "react";
import { QUESTIONS } from "./constants/questions";
import { PAGES } from "./constants/pages";
import { Question } from "./components/Question";
import { useIsMobile } from "./utils/useIsMobile";
import { shouldLogTime } from "./utils/timer";
import leftArrow from "./imgs/left-arrow.svg";
import rightArrow from "./imgs/right-arrow.svg";
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, getDocs, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcqGLhgPjiDmes0WCk25fH32cgKSZHNBQ",
  authDomain: "test-7c874.firebaseapp.com",
  projectId: "test-7c874",
  storageBucket: "test-7c874.appspot.com",
  messagingSenderId: "467835212184",
  appId: "1:467835212184:web:22b2c6695b64acbc159bed",
};

initializeApp(firebaseConfig);
const db = getFirestore();

function getEmptyAnswers() {
  const out = {};
  QUESTIONS.forEach((q) => (out[q.id] = []));
  return out;
}

const initalState = {
  appState: PAGES[0],
  answersSent: false,
  answers: getEmptyAnswers(), // FIXME
  timeLog: [],
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "appState/change":
      const logTime = shouldLogTime(state.appState, action.payload);
      const log = [...state.timeLog];
      if (logTime) log.push(Date.now());
      return { ...state, appState: action.payload, timeLog: log };
    case "answers/update":
      const newState = { ...state, answers: { ...state.answers } };
      newState.answers[action.payload.id] = action.payload.value;
      return newState;
    case "answers/sent":
      return { ...state, answersSent: true };
    default:
      return state;
  }
};

const store = createStore(reducer);

function MobilePageSelector() {
  const page = useSelector((s) => s.appState);
  const pageId = PAGES.findIndex((p) => p === page);
  const dispatch = useDispatch();
  const turnPage = (way) =>
    dispatch({
      type: "appState/change",
      payload: PAGES[pageId + way],
    });

  return (
    // FIXME: Markup
    <div className="PageSelector mobile">
      {pageId !== 0 ? (
        <button onClick={() => turnPage(-1)}>
          <img src={leftArrow} alt="<" />
        </button>
      ) : (
        <button></button>
      )}
      <h5>{page}</h5>
      {pageId !== PAGES.length - 1 ? (
        <button onClick={() => turnPage(1)}>
          <img src={rightArrow} alt=">" />
        </button>
      ) : (
        <button></button>
      )}
    </div>
  );
}

function DesktopPageSelector() {
  const selector = (state) => PAGES.findIndex((e) => e === state.appState);
  const pageId = useSelector(selector);
  const dispatch = useDispatch();
  const jsx = PAGES.map((p, id) => {
    const className = id > pageId ? "notVisited" : "";
    const event = { type: "appState/change", payload: p };
    return (
      <Fragment key={p}>
        {id !== 0 && <img src={rightArrow} alt=">" />}
        <button onClick={() => dispatch(event)}>
          <h5 className={className}>{p}</h5>
        </button>
      </Fragment>
    );
  });
  return <div className="PageSelector desktop">{jsx}</div>;
}

function PageSelector() {
  const isMobile = useIsMobile();
  return isMobile ? <MobilePageSelector /> : <DesktopPageSelector />;
}

function ControlButton({ children, onClick, accent = false }) {
  let className = "ControlButton";
  if (accent) className += " accent";
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function ControlButtons() {
  const selector = (s) => PAGES.findIndex((p) => p === s.appState);
  const pageId = useSelector(selector);
  const dispatch = useDispatch();
  const turnPage = (way) =>
    dispatch({
      type: "appState/change",
      payload: PAGES[pageId + way],
    });

  return (
    <div className="ControlButtons">
      <ControlButton onClick={() => turnPage(-1)}>
        <img src={leftArrow} alt="<" />
        <h4>Powrót</h4>
      </ControlButton>
      <ControlButton accent={true} onClick={() => turnPage(1)}>
        <h4>Dalej</h4>
        <img src={rightArrow} alt=">" />
      </ControlButton>
    </div>
  );
}

function StartSurvey() {
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch({
      type: "appState/change",
      payload: PAGES[1],
    });
  return (
    <Fragment>
      <div className="infoComponent">
        <h3>Kilka rzeczy, o których warto wspomnieć</h3>
        <p>
          Jest nam bardzo miło, że tu jesteś! Zanim przejdziemy do ankiety, jest
          kilka rzeczy, o których musisz wiedzieć.
        </p>
        <ul>
          <li>
            <p>
              <strong>
                Ankieta jest adresowana do osób, które często bywają w Łodzi.
              </strong>{" "}
              Jeśli nie jesteś taką osobą - przykro nam, ta ankieta nie jest dla
              Ciebie.
            </p>
          </li>
          <li>
            <p>
              Ankieta jest w pełni anonimowa. Oprócz odpowiedzi, zbieramy tylko
              czas przebywania na stronie.
            </p>
          </li>
          <li>
            <p>
              Zamierzamy w przyszłości upublicznić wyniki ankiety, dlatego żadne
              pytanie nie jest obowiązkowe. Podziel się z nami tym, czym
              chciałbyś się podzielić z innymi!
            </p>
          </li>
        </ul>
      </div>
      <div>
        <ControlButton accent={true} onClick={handleClick}>
          <h4>Zaczynamy ankietę</h4>
        </ControlButton>
      </div>
    </Fragment>
  );
}

function SendButton() {
  const answersSent = useSelector((s) => s.answersSent);
  const [loading, setLoading] = useState(false);
  const send = async () => {
    try {
      const answers = store.getState().answers;
      answers.time = getAnswerTime();
      const multiPointQuests = QUESTIONS.filter((q) => q.type === "multipoint");
      multiPointQuests.forEach((q) =>
        q.answers.forEach((_, id) => {
          if (answers[q.id][id] === undefined) answers[q.id][id] = null;
        })
      );
      setLoading(true);
      await addDoc(collection(db, "answers"), answers);
      store.dispatch({ type: "answers/sent" });
    } catch (e) {
      console.error("Error while sending answers: ", e);
    }
  };

  let [accent, text, onClick] = [true, "Wyślij odpowiedzi", send];
  if (answersSent)
    [accent, text, onClick] = [
      false,
      "Odpowiedzi wysłane - dziękujemy!",
      () => {},
    ];
  else if (loading)
    [accent, text, onClick] = [false, "Wysyłanie odpowiedzi...", () => {}];
  return (
    <ControlButton onClick={onClick} accent={accent}>
      <h4>{text}</h4>
    </ControlButton>
  );
}

function getAnswerTime() {
  const timeLog = store.getState().timeLog;
  return timeLog.reduce((acc, log, id) => {
    return id % 2 === 0 ? acc - log : acc + log;
  }, 0);
}

function getNoOfAnswers() {
  const answers = store.getState().answers;
  return Object.values(answers).reduce((acc, ans) => {
    return ans.some((v) => v || v === 0) ? acc + 1 : acc;
  }, 0);
}

function HowManyAnsersInDB() {
  const [howMany, setHowMany] = useState(10);
  useEffect(() => {
    (async () => {
      try {
        const docs = await getDocs(collection(db, "answers"));
        let howMany = 0;
        docs.forEach((_) => howMany++);
        setHowMany(howMany);
      } catch (e) {
        console.error("Error while reading DB: ", e);
        setHowMany(11);
      }
    })();
  }, []);
  return <Fragment>{howMany}</Fragment>;
}

function EndSurvey() {
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch({
      type: "appState/change",
      payload: PAGES[PAGES.length - 2],
    });
  const noOfAnswers = getNoOfAnswers();
  const time = getAnswerTime() / 1000;
  const avg = noOfAnswers ? (time / noOfAnswers).toFixed(1) : "- ";
  return (
    <Fragment>
      <div className="infoComponent">
        <h3>To już koniec ankiety</h3>
        <p>
          Jesteśmy wdzięczni, że poświęciłeś nam chwilę by wypełnić ankietę.
          Możesz nam teraz wysłać swoje odpowiedzi, albo wrócić do nich i
          przejrzeć je jeszcze raz.
        </p>
        <ul>
          <li>
            <p>
              Wypełniłeś {noOfAnswers} pytań, poświęcając średnio {avg}s na
              wypełnienie każdego z nich
            </p>
          </li>
          <li>
            <p>
              Jesteś jednym z naszych <HowManyAnsersInDB /> ankietowanych! Miło
              nam, że dołączasz do tego wąskiego grona
            </p>
          </li>
        </ul>
      </div>
      <SendButton />
      <ControlButton onClick={handleClick}>
        <img src={leftArrow} alt="<" />
        <h4>Powrót do pytań</h4>
      </ControlButton>
    </Fragment>
  );
}

function Questionare() {
  const page = useSelector((s) => s.appState);
  const pageId = PAGES.findIndex((p) => p === page);
  const Element =
    pageId === 0
      ? StartSurvey
      : pageId === PAGES.length - 1
      ? EndSurvey
      : ControlButtons;
  return (
    <main id="quest">
      <PageSelector />
      <div id="questContainer">
        {QUESTIONS.filter((q) => q.page === page).map((q) => (
          <Question question={q} key={q.id} />
        ))}
        <Element />
      </div>
    </main>
  );
}

function App() {
  return <Questionare />;
}

export { App, store };
