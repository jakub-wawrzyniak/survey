import { Question, ShowQuestionIf } from "../types";
import { PAGES } from "./pages";

function not(showIf: ShowQuestionIf): ShowQuestionIf {
  return {
    ...showIf,
    negate: !showIf.negate,
  };
}

const isUsingBus: ShowQuestionIf = {
  negate: true,
  questionId: 18,
  expectedAnswer: [2, 2],
};
const notUsingBus = not(isUsingBus);

const isDrivingCar: ShowQuestionIf = {
  negate: true,
  questionId: 18,
  expectedAnswer: [0, 2],
};

const hasCoalFurnace: ShowQuestionIf = {
  questionId: 10,
  expectedAnswer: 3,
};
const noCoalFurnace = not(hasCoalFurnace);

const hasSolarPanels: ShowQuestionIf = {
  questionId: 16,
  expectedAnswer: 0,
};
const noSolarPanels = not(hasSolarPanels);

const hasCentralHeating: ShowQuestionIf = {
  questionId: 10,
  expectedAnswer: 0,
};
const noCentralHeating = not(hasCentralHeating);

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title: "Z jaką płcią się identyfikujesz?",
    answers: ["Kobieta", "Mężczyzna", "Inna"],
    page: PAGES[1],
  },
  {
    id: 2,
    type: "singlechoice",
    pickedAnswer: null,
    length: "medium",
    title: "W jakim jesteś wieku?",
    answers: [
      "< 18 lat",
      "18 - 25 lat",
      "26 - 35 lat",
      "36 - 45 lat",
      "46 - 65 lat",
      "> 65 lat",
    ],
    page: PAGES[1],
  },
  {
    id: 3,
    type: "singlechoice",
    pickedAnswer: null,
    length: "medium",
    title: "Gdzie mieszkasz? (cz. 1)",
    answers: [
      "w mieszkaniu (blok/kamienica)",
      "w domu (jednorodzinnym/szeregowiec)",
    ],
    page: PAGES[1],
  },
  {
    id: 4,
    type: "singlechoice",
    pickedAnswer: null,
    length: "long",
    title: "Gdzie mieszkasz? (cz. 2)",
    answers: [
      "w centrum Łodzi",
      "w Łodzi, poza centrum",
      "w okolicach Łodzi (Konstantynów Łódzki, Zgierz, etc)",
      "daleko od Łodzi, ale często tu bywam",
    ],
    page: PAGES[1],
  },
  {
    id: 5,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title: "Jakie jest twoje wykształcenie?",
    answers: [
      "podstawowe / gimnazjalne / zawodowe",
      "średnie / średnie branżowe",
      "wyższe",
    ],
    page: PAGES[1],
  },

  {
    id: 6,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title:
      "Jak istotna jest dla Ciebie jakość powietrza, którym oddychasz? (1 - wcale, 5 - bardzo)",
    answers: ["1", "2", "3", "4", "5"],
    page: PAGES[2],
  },
  {
    id: 7,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title:
      "Jak oceniasz jakość powietrza w Łodzi w skali całego roku? (1 - bardzo zła, 5 - bardzo dobra)",
    answers: ["1", "2", "3", "4", "5"],
    page: PAGES[2],
  },
  {
    id: 8,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title:
      "Jak oceniasz obecną jakość powietrza w porównaniu do tej sprzed 5 lat? (1 - jest znacznie gorzej, 5 - jest znacznie lepiej)",
    answers: ["1", "2", "3", "4", "5"],
    page: PAGES[2],
  },
  {
    id: 9,
    type: "singlechoice",
    pickedAnswer: null,
    length: "long",
    title: "Czy zanieczyszczenie powietrza miało wpływ na Twoje zdrowie?",
    answers: [
      "Tak - mam stwierdzone schorzenia, których występowanie zwiększa smog",
      "Chyba tak - nie mam diagnozy, ale dostrzegam wpływ smogu na mnie",
      "Chyba nie - ale kto wie, co będzie za kilka lat",
      "Nie - i nie spodziewam się, żeby miało w przyszłości",
    ],
    page: PAGES[2],
  },
  {
    id: 16,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title: "Czy masz zainstalowane panele fotowoltaiczne?",
    answers: ["Tak", "Nie"],
    page: PAGES[3],
  },
  {
    id: 17,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title: "Czy masz możliwość zainstalowania paneli fotowoltaicznych?",
    answers: ["Tak", "Nie"],
    showIf: noSolarPanels,
    page: PAGES[3],
  },
  {
    id: 10,
    type: "multichoice",
    pickedAnswer: [],
    length: "medium",
    title: "Z jakich sposobów ogrzewania swojego domu / mieszkania korzystasz?",
    answers: [
      "Centralne ogrzewanie",
      "Prąd elektryczny",
      "Kocioł na gaz",
      "Piec węglowy",
      "Kominek",
      "Nie jestem pewien",
      "Inne",
    ],
    page: PAGES[3],
  },
  {
    id: 11,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title:
      "Czy centralne ogrzewanie jest dostępne jako możliwość tam, gdzie mieszkasz?",
    answers: ["Tak", "Nie"],
    showIf: noCentralHeating,
    page: PAGES[3],
  },
  {
    id: 12,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title:
      "Czy Twoje mieszkanie / dom było wcześniej ogrzewane piecem węglowym?",
    answers: ["Tak", "Nie"],
    showIf: noCoalFurnace,
    page: PAGES[3],
  },
  {
    id: 13,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title:
      "Czy słyszałeś o dofinansowaniach do wymiany starych pieców węglowych?",
    answers: ["Tak", "Nie"],
    page: PAGES[3],
  },
  {
    id: 14,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title:
      "Czy wiesz ile kosztuje wymiana pieca węglowego lub jaka część kosztów jest refundowana w ramach programu?",
    answers: ["Tak", "Nie"],
    page: PAGES[3],
  },
  {
    id: 18,
    type: "multipoint",
    pickedAnswer: {},
    title: "Jak często korzystasz z podanych środów transportu?",
    subquestions: [
      "Samochód jako kierowca",
      "Samochód jako pasażer",
      "Komunikacja miejsca",
      "Taksówki / uber",
      "Skuter / motor",
      "Rower",
      "Hulajnogi elektryczne",
    ],
    options: ["Często", "Czasem", "Wcale"],
    page: PAGES[4],
  },
  {
    id: 19,
    type: "singlechoice",
    pickedAnswer: null,
    length: "short",
    title: "Gdy kierujesz autem, ilu pasażerów zwykle zabierasz?",
    answers: ["0", "1", "2", "3", "4+"],
    page: PAGES[4],
    showIf: isDrivingCar,
  },
  {
    id: 20,
    type: "multichoice",
    pickedAnswer: [],
    maxNoOfAnswers: 2,
    length: "medium",
    title: "Dlaczego korzystasz z komunikacji miejskiej?",
    answers: [
      "Nie mam samochodu",
      "Nie mam gdzie parkować samochodu",
      "Tak jest najtaniej",
      "Tak jest ekologiczniej",
      "Tak jest mi wygodnie",
      "Inne",
    ],
    page: PAGES[4],
    showIf: isUsingBus,
  },
  {
    id: 21,
    type: "multichoice",
    pickedAnswer: [],
    maxNoOfAnswers: 2,
    length: "medium",
    title: "Dlaczego nie korzystasz z komunikacji miejskiej (max 2)",
    answers: [
      "Tak jest najszybciej",
      "Tak jest najwygodniej",
      "Przewożę dużo rzeczy",
      "Przewożę dużo osób",
      "Inne",
    ],
    page: PAGES[4],
    showIf: notUsingBus,
  },
  {
    id: 22,
    type: "multichoice",
    pickedAnswer: [],
    maxNoOfAnswers: 3,
    length: "medium",
    title:
      "Gdybyś mógł poprawić komunikację miejską, co próbowałbyś osiągnąć? (max 3)",
    answers: [
      "krótszy czas podróży",
      "krótszy czas czekania na autobus",
      "większa punktualność",
      "mniej przesiadek",
      "inne",
      "mniejszy dystans do / z przystanków",
    ],
    page: PAGES[4],
    showIf: isUsingBus,
  },
  {
    id: 23,
    type: "multichoice",
    pickedAnswer: [],
    maxNoOfAnswers: 3,
    length: "medium",
    title: "Co by cię przekonało do korzystania z MPK? (max 3)",
    answers: [
      "krótszy czas podróży",
      "krótszy czas czekania na autobus",
      "mniejszy dystans do / z przystanków",
      "większa punktualność",
      "mniej przesiadek",
      "inne",
      "nie dam się przekonać",
    ],
    page: PAGES[4],
    showIf: notUsingBus,
  },
  {
    id: 24,
    type: "singlechoice",
    pickedAnswer: null,
    length: "medium",
    title:
      "Jaką podwyżkę ceny biletu zaakceptujesz, jeśli poprawie ulegną zaznaczone przez ciebie powyżej sfery?",
    answers: [
      "nie zaakceptuję podwyżki",
      "poniżej +50% ceny",
      "+50% ceny",
      "+100% ceny",
      "+200% ceny",
      "powyżej +200% ceny",
    ],
    page: PAGES[4],
  },
  {
    id: 25,
    type: "multipoint",
    pickedAnswer: {},
    title: "Jesteś za czy przeciw wprowadzaniu poniższych rozwiązań?",
    subquestions: [
      "Zwiększenie liczby buspasów (również kosztem pasów dla kierowców)",
      "Ograniczanie wjazdu samochodów do centrum",
      "Wprowadzanie ulg dla pojazdów elektrycznych (darmowe parkingi w centrum, możliwość korzystania z buspasów)",
      "Zwiększenie cen biletów parkingowych",
    ],
    options: ["Za", "Przeciw"],
    page: PAGES[4],
  },
];

export { QUESTIONS };
