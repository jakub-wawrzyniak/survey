import { Routes, Route, Navigate } from "react-router-dom";
import { END_PAGE, PAGES, QUESTIONS, START_PAGE } from "../constants";
import { Page, Question } from "../types";
import { getUrlFromPage } from "../utils";
import { QuestionSetView } from "../views/QuestionSetView";
import { SurveyEndView } from "../views/SurveyEndView";
import { SurveyStartView } from "../views/SurveyStartView";
import { usePage } from "./usePage";
import { useTimeLogger } from "./useTimeLogger";

type QuestionsOnPage = Record<Page, Question[]>;

function getQuestionsOnPage(): QuestionsOnPage {
  const questionMap: Partial<QuestionsOnPage> = {};
  PAGES.forEach((page) => (questionMap[page] = []));
  QUESTIONS.forEach((question) => {
    const page = question.page;
    questionMap[page]!.push(question);
  });
  return questionMap as QuestionsOnPage;
}

const startUrl = getUrlFromPage(START_PAGE);
const endUrl = getUrlFromPage(END_PAGE);
const questionsOnPage = getQuestionsOnPage();
const questionViews = PAGES.filter((page) => questionsOnPage[page]).map(
  (page) => {
    const url = getUrlFromPage(page);
    const view = <QuestionSetView questions={questionsOnPage[page]} />;
    return <Route key={page} path={url} element={view} />;
  }
);

export function AppRoutes() {
  useTimeLogger();
  return (
    <Routes>
      <Route path={""} element={<Navigate replace to={startUrl} />} />
      <Route path={startUrl} element={<SurveyStartView />} />
      <Route path={endUrl} element={<SurveyEndView />} />
      {questionViews}
    </Routes>
  );
}
