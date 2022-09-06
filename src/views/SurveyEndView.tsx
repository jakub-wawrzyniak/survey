import { ControlButton } from "../components/ControlButton";
import { PAGES } from "../constants";
import { usePage } from "../router";
import { getUrlFromPage } from "../utils";

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
              {/* Jesteś jednym z naszych <HowManyAnsersInDB /> ankietowanych! Miło */}
              Jesteś jednym z naszych 3 ankietowanych! Miło nam, że dołączasz do
              tego wąskiego grona
            </p>
          </li>
        </ul>
      </div>
      {/* <SendButton /> */}
      <ControlButton href={getUrlFromPage(PAGES[1])}>
        {/* <img src={leftArrow} alt="<" /> */}
        <h4>Powrót do pytań</h4>
      </ControlButton>
    </>
  );
}
