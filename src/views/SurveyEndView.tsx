import {
  ControlLinkArrow,
  ControlLinkCentered,
} from "../components/ControlClickable";
import { FIRST_QUESTION_PAGE } from "../constants";
import { getUrlFromPage } from "../utils";
import {
  InfoContainer,
  InfoList,
  InfoListElement,
} from "../components/InfoComponents";
import { TextRegular, TextTitle, TextButton } from "../components/Text";
import { useAppSelector } from "../redux";
import { selectAnswerTime } from "../redux/metadataSlice";
import { selectHowManyAnswered } from "../redux/questionSlice";
import { ButtonSubmit } from "../components";

function getAvgTime(noOfAnswers: number, answerTime: number) {
  if (noOfAnswers === 0) return "- sekund";
  const avgTime = answerTime / noOfAnswers;
  const seconds = (avgTime % 60).toFixed(0);
  const minutes = (avgTime / 60).toFixed(0);

  let time = "";
  if (minutes !== "0") time += `${minutes} minut `;
  time += `${seconds} sekund`;

  return time;
}

export function SurveyEndView() {
  const answerTime = useAppSelector(selectAnswerTime);
  const noOfAnswers = useAppSelector(selectHowManyAnswered);
  const avgTime = getAvgTime(noOfAnswers, answerTime);
  return (
    <>
      <InfoContainer>
        <TextTitle>To już koniec ankiety</TextTitle>
        <TextRegular>
          Jesteśmy wdzięczni, że poświęciłeś nam chwilę by wypełnić ankietę.
          Możesz nam teraz wysłać swoje odpowiedzi, albo wrócić do nich i
          przejrzeć je jeszcze raz.
        </TextRegular>
        <InfoList>
          <InfoListElement>
            <TextRegular>
              Wypełniłeś {noOfAnswers} pytań, poświęcając średnio {avgTime} na
              wypełnienie każdego z nich
            </TextRegular>
          </InfoListElement>
          <InfoListElement>
            <TextRegular>
              {/* Jesteś jednym z naszych <HowManyAnsersInDB /> ankietowanych! Miło */}
              Jesteś jednym z naszych 3 ankietowanych! Miło nam, że dołączasz do
              tego wąskiego grona
            </TextRegular>
          </InfoListElement>
        </InfoList>
      </InfoContainer>
      <ButtonSubmit />
      <ControlLinkCentered to={getUrlFromPage(FIRST_QUESTION_PAGE)}>
        <ControlLinkArrow />
        <TextButton>Powrót do pytań</TextButton>
      </ControlLinkCentered>
    </>
  );
}
