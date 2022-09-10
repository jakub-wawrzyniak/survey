import {
  ControlLinkArrow,
  ControlLinkCentered,
} from "../components/ControlLink";
import { FIRST_QUESTION_PAGE } from "../constants";
import { getUrlFromPage } from "../utils";
import {
  InfoContainer,
  InfoList,
  InfoListElement,
} from "../components/InfoComponents";
import { TextRegular, TextTitle, TextButton } from "../components/Text";

export function SurveyEndView() {
  // const answers = useAppSelector((s) => s.questions) as Question[];
  // const timeLog = useAppSelector((s) => s.timeLog) as number[];
  // const handleClick = () => dispatch(changePage(PAGES[1]));
  const noOfAnswers = 3;
  // const noOfAnswers = answers.filter((ans) => ans.pickedAnswer).length;
  // const time = getAnswerTime(timeLog) / 1000;
  //   const avg = noOfAnswers ? (time / noOfAnswers).toFixed(1) : "- ";
  const avg = 5;
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
              Wypełniłeś {noOfAnswers} pytań, poświęcając średnio {avg}s na
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
      {/* <SendButton /> */}
      <ControlLinkCentered to={getUrlFromPage(FIRST_QUESTION_PAGE)}>
        <ControlLinkArrow />
        <TextButton>Powrót do pytań</TextButton>
      </ControlLinkCentered>
    </>
  );
}
