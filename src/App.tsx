import { useAppDispatch, useAppSelector } from "./redux";
import { Fragment, useEffect, useState } from "react";
import { QUESTIONS } from "./constants/questions";
import { PAGES } from "./constants/pages";
// import { Question } from "./components/Question/index";
import { useIsMobile } from "./utils/useIsMobile";
import leftArrow from "src/imgs/left-arrow.svg";
import rightArrow from "src/imgs/right-arrow.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { addDoc, getDocs, collection, getFirestore } from "firebase/firestore";
import { Page } from "./types";
import React from "react";
import { AppRoutes } from "./router";
import { PageSelector } from "./components/PageSelector";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyBcqGLhgPjiDmes0WCk25fH32cgKSZHNBQ",
//   authDomain: "test-7c874.firebaseapp.com",
//   projectId: "test-7c874",
//   storageBucket: "test-7c874.appspot.com",
//   messagingSenderId: "467835212184",
//   appId: "1:467835212184:web:22b2c6695b64acbc159bed",
// };

// initializeApp(firebaseConfig);
// const db = getFirestore();

// function MobilePageSelector() {
//   const page = useAppSelector((s) => s.page) as Page;
//   const pageId = PAGES.findIndex((p) => p === page);
//   const dispatch = useAppDispatch();
//   const turnPage = (way: number) => dispatch(changePage(PAGES[pageId + way]));

//   return (
//     // FIXME: Markup
//     <div className="PageSelector mobile">
//       {pageId !== 0 ? (
//         <button onClick={() => turnPage(-1)}>
//           <img src={leftArrow} alt="<" />
//         </button>
//       ) : (
//         <button></button>
//       )}
//       <h5 className="h5">{page}</h5>
//       {pageId !== PAGES.length - 1 ? (
//         <button onClick={() => turnPage(1)}>
//           <img src={rightArrow} alt=">" />
//         </button>
//       ) : (
//         <button></button>
//       )}
//     </div>
//   );
// }

// function DesktopPageSelector() {
//   const selector = (s: ReduxState) => PAGES.findIndex((e) => e === s.page);
//   const pageId = useAppSelector(selector);
//   const dispatch = useAppDispatch();
//   const jsx = PAGES.map((p, id) => {
//     const className = id > pageId ? "notVisited" : "";
//     const pickThisPage = () => dispatch(changePage(p));
//     return (
//       <Fragment key={p}>
//         {id !== 0 && <img src={rightArrow} alt=">" />}
//         <button onClick={pickThisPage}>
//           <h5 className={className}>{p}</h5>
//         </button>
//       </Fragment>
//     );
//   });
//   return <div className="PageSelector desktop">{jsx}</div>;
// }

// function PageSelector() {
//   const isMobile = useIsMobile();
//   return isMobile ? <MobilePageSelector /> : <DesktopPageSelector />;
// }

// type ControlButtonProps = {
//   children: React.ReactNode;
//   onClick: () => void;
//   accent?: boolean;
// };
// function ControlButton({
//   children,
//   onClick,
//   accent = false,
// }: ControlButtonProps) {
//   let className = "ControlButton";
//   if (accent) className += " accent";
//   return (
//     <button className={className} onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// function ControlButtons() {
//   const selector = (s: ReduxState) => PAGES.findIndex((p) => p === s.page);
//   const pageId = useAppSelector(selector) as number;
//   const dispatch = useAppDispatch();
//   const turnPage = (way: number) => dispatch(changePage(PAGES[pageId + way]));

//   return (
//     <div className="ControlButtons">
//       <ControlButton onClick={() => turnPage(-1)}>
//         <img src={leftArrow} alt="<" />
//         <h4>Powrót</h4>
//       </ControlButton>
//       <ControlButton accent={true} onClick={() => turnPage(1)}>
//         <h4>Dalej</h4>
//         <img src={rightArrow} alt=">" />
//       </ControlButton>
//     </div>
//   );
// }

// function StartSurvey() {
//   const dispatch = useAppDispatch();
//   const handleClick = () => dispatch(changePage(PAGES[1]));
//   return (
//     <Fragment>
//       <div className="infoComponent">
//         <h3 className="h3">>Kilka rzeczy, o których warto wspomnieć</h3>
//         <p className="p>
//           Jest nam bardzo miło, że tu jesteś! Zanim przejdziemy do ankiety, jest
//           kilka rzeczy, o których musisz wiedzieć.
//         </p>
//         <ul className="ul">
//           <li>
//             <p className="p>
//               <strong>
//                 Ankieta jest adresowana do osób, które często bywają w Łodzi.
//               </strong>{" "}
//               Jeśli nie jesteś taką osobą - przykro nam, ta ankieta nie jest dla
//               Ciebie.
//             </p>
//           </li>
//           <li>
//             <p className="p>
//               Ankieta jest w pełni anonimowa. Oprócz odpowiedzi, zbieramy tylko
//               czas przebywania na stronie.
//             </p>
//           </li>
//           <li>
//             <p className="p>
//               Zamierzamy w przyszłości upublicznić wyniki ankiety, dlatego żadne
//               pytanie nie jest obowiązkowe. Podziel się z nami tym, czym
//               chciałbyś się podzielić z innymi!
//             </p>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <ControlButton accent={true} onClick={handleClick}>
//           <h4>Zaczynamy ankietę</h4>
//         </ControlButton>
//       </div>
//     </Fragment>
//   );
// }

// function SendButton() {
//   const answersSent = useAppSelector((s) => s.surveySent) as boolean;
//   const answers = useAppSelector((s) => s.questions) as Question[];
//   const timeLog = useAppSelector((s) => s.timeLog) as number[];
//   const dispatch = useAppDispatch();
//   const [loading, setLoading] = useState(false);

//   const send = async () => {
//     try {
//       const answerTime = getAnswerTime(timeLog);
//       setLoading(true);
//       await addDoc(collection(db, "answers"), answers);
//       dispatch(sendSurvey());
//     } catch (e) {
//       console.error("Error while sending answers: ", e);
//     }
//   };

//   let [accent, text] = [true, "Wyślij odpowiedzi"];
//   if (answersSent) [accent, text] = [false, "Odpowiedzi wysłane - dziękujemy!"];
//   else if (loading) [accent, text] = [false, "Wysyłanie odpowiedzi..."];
//   return (
//     <ControlButton
//       onClick={() => {
//         !answersSent && !loading && send();
//       }}
//       accent={accent}
//     >
//       <h4>{text}</h4>
//     </ControlButton>
//   );
// }

// function getAnswerTime(logs: number[]) {
//   return logs.reduce((acc, log, id) => {
//     return id % 2 === 0 ? acc - log : acc + log;
//   }, 0);
// }

// function HowManyAnsersInDB() {
//   const [howMany, setHowMany] = useState(10);
//   useEffect(() => {
//     (async () => {
//       try {
//         const docs = await getDocs(collection(db, "answers"));
//         let howMany = 0;
//         docs.forEach((_) => howMany++);
//         setHowMany(howMany);
//       } catch (e) {
//         console.error("Error while reading DB: ", e);
//         setHowMany(11);
//       }
//     })();
//   }, []);
//   return <Fragment>{howMany}</Fragment>;
// }

// function EndSurvey() {
//   const dispatch = useAppDispatch();
//   const answers = useAppSelector((s) => s.questions) as Question[];
//   const timeLog = useAppSelector((s) => s.timeLog) as number[];
//   const handleClick = () => dispatch(changePage(PAGES[1]));
//   const noOfAnswers = answers.filter((ans) => ans.pickedAnswer).length;
//   const time = getAnswerTime(timeLog) / 1000;
//   const avg = noOfAnswers ? (time / noOfAnswers).toFixed(1) : "- ";
//   return (
//     <Fragment>
//       <div className="infoComponent">
//         <h3 className="h3">>To już koniec ankiety</h3>
//         <p className="p>
//           Jesteśmy wdzięczni, że poświęciłeś nam chwilę by wypełnić ankietę.
//           Możesz nam teraz wysłać swoje odpowiedzi, albo wrócić do nich i
//           przejrzeć je jeszcze raz.
//         </p>
//         <ul className="ul">
//           <li>
//             <p className="p>
//               Wypełniłeś {noOfAnswers} pytań, poświęcając średnio {avg}s na
//               wypełnienie każdego z nich
//             </p>
//           </li>
//           <li>
//             <p className="p>
//               Jesteś jednym z naszych <HowManyAnsersInDB /> ankietowanych! Miło
//               nam, że dołączasz do tego wąskiego grona
//             </p>
//           </li>
//         </ul>
//       </div>
//       <SendButton />
//       <ControlButton onClick={handleClick}>
//         <img src={leftArrow} alt="<" />
//         <h4>Powrót do pytań</h4>
//       </ControlButton>
//     </Fragment>
//   );
// }

// function Questionare() {
//   const page = useAppSelector((s) => s.page);
//   const pageId = PAGES.findIndex((p) => p === page);
//   const Element =
//     pageId === 0
//       ? StartSurvey
//       : pageId === PAGES.length - 1
//       ? EndSurvey
//       : ControlButtons;
//   return (
//     <main id="quest">
//       <p className="pageSelector />
//       <div id="questContainer">
//         {QUESTIONS.filter((q) => q.page === page).map((q) => (
//           <Question question={q} key={q.id} />
//         ))}
//         <Element />
//       </div>
//     </main>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <main id="quest">
        <PageSelector />
        <div id="questContainer">
          <AppRoutes />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
