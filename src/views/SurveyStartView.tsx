import {
  ControlLink,
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

export function SurveyStartView() {
  return (
    <>
      <InfoContainer>
        <TextTitle>Kilka rzeczy, o których warto wspomnieć</TextTitle>
        <TextRegular>
          Jest nam bardzo miło, że tu jesteś! Zanim przejdziemy do ankiety, jest
          kilka rzeczy, o których musisz wiedzieć.
        </TextRegular>
        <InfoList>
          <InfoListElement>
            <TextRegular>
              <strong>
                Ankieta jest adresowana do osób, które często bywają w Łodzi.
              </strong>{" "}
              Jeśli nie jesteś taką osobą - przykro nam, ta ankieta nie jest dla
              Ciebie.
            </TextRegular>
          </InfoListElement>
          <InfoListElement>
            <TextRegular>
              Ankieta jest w pełni anonimowa. Oprócz odpowiedzi, zbieramy tylko
              czas przebywania na stronie.
            </TextRegular>
          </InfoListElement>
          <InfoListElement>
            <TextRegular>
              Zamierzamy w przyszłości upublicznić wyniki ankiety, dlatego żadne
              pytanie nie jest obowiązkowe. Podziel się z nami tym, czym
              chciałbyś się podzielić z innymi!
            </TextRegular>
          </InfoListElement>
        </InfoList>
      </InfoContainer>
      <ControlLinkCentered $accent to={getUrlFromPage(FIRST_QUESTION_PAGE)}>
        <TextButton>Zaczynamy ankietę</TextButton>
        <ControlLinkArrow />
      </ControlLinkCentered>
    </>
  );
}
