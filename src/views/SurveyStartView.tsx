import { ControlButton } from "../components/ControlButton";
import { usePage } from "../router/usePage";

export function SurveyStartView() {
  const { nextPageUrl } = usePage();
  return (
    <>
      <div className="infoComponent">
        <h3 className="h3">Kilka rzeczy, o których warto wspomnieć</h3>
        <p className="p">
          Jest nam bardzo miło, że tu jesteś! Zanim przejdziemy do ankiety, jest
          kilka rzeczy, o których musisz wiedzieć.
        </p>
        <ul className="ul">
          <li className="li">
            <p className="p">
              <strong>
                Ankieta jest adresowana do osób, które często bywają w Łodzi.
              </strong>{" "}
              Jeśli nie jesteś taką osobą - przykro nam, ta ankieta nie jest dla
              Ciebie.
            </p>
          </li>
          <li className="li">
            <p className="p">
              Ankieta jest w pełni anonimowa. Oprócz odpowiedzi, zbieramy tylko
              czas przebywania na stronie.
            </p>
          </li>
          <li className="li">
            <p className="p">
              Zamierzamy w przyszłości upublicznić wyniki ankiety, dlatego żadne
              pytanie nie jest obowiązkowe. Podziel się z nami tym, czym
              chciałbyś się podzielić z innymi!
            </p>
          </li>
        </ul>
      </div>
      <div>
        <ControlButton accent={true} href="">
          <h4 className="h4">Zaczynamy ankietę</h4>
        </ControlButton>
      </div>
    </>
  );
}
