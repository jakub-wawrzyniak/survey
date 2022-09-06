import { Routes, Route, Navigate } from "react-router-dom";
import { END_PAGE, PAGES, QUESTIONS, START_PAGE } from "../constants";
import { Page } from "../types";
import { getUrlFromPage } from "../utils";
import { SurveyEndView } from "../views/SurveyEndView";
import { SurveyStartView } from "../views/SurveyStartView";

type QuestionsOnPage = Record<Page, number[]>;

function getQuestionsOnPage(): QuestionsOnPage {
  const questionMap: Partial<QuestionsOnPage> = {};
  PAGES.forEach((page) => (questionMap[page] = []));
  QUESTIONS.forEach((question) => {
    const page = question.page;
    questionMap[page]!.push(question.id);
  });
  return questionMap as QuestionsOnPage;
}

const startUrl = getUrlFromPage(START_PAGE);
const endUrl = getUrlFromPage(END_PAGE);
export function AppRoutes() {
  return (
    <Routes>
      <Route path={""} element={<Navigate replace to={startUrl} />} />
      <Route path={startUrl} element={<SurveyStartView />} />
      <Route path={endUrl} element={<SurveyEndView />} />
    </Routes>
  );
}
