import { useSelector } from "react-redux";

const pages = [
  "Zaczynamy",
  "O tobie",
  "Ocena powietrza",
  "Energetyka i Ogrzewanie",
  "Transport",
  "Kończymy",
];

const useIsBusLover = () => {
  const selector = (s) => [0, 1].includes(s.answers[18][2]);
  return useSelector(selector);
};

const useIsDriver = () => {
  const selector = (s) => [0, 1].includes(s.answers[18][0]);
  return useSelector(selector);
};

const useHasKopciuch = () => {
  const selector = (s) => s.answers[10].includes(3);
  return useSelector(selector);
};

const useHasSolarPanels = () => {
  const selector = (s) => s.answers[16][0] === 0;
  return useSelector(selector);
};

const useHasCentralHeating = () => {
  const selector = (s) => s.answers[10][0] === 0;
  return useSelector(selector);
};

const questions = [
  {
    id: 1,
    type: "singlechoice",
    length: "short",
    question: "Z jaką płcią się identyfikujesz?",
    answers: ["Kobieta", "Mężczyzna", "Inna"],
    useShouldRender: () => true,
    page: pages[1],
  },
  {
    id: 2,
    type: "singlechoice",
    length: "medium",
    question: "W jakim jesteś wieku?",
    answers: [
      "< 18 lat",
      "18 - 25 lat",
      "26 - 35 lat",
      "36 - 45 lat",
      "46 - 65 lat",
      "> 65 lat",
    ],
    useShouldRender: () => true,
    page: pages[1],
  },
  {
    id: 3,
    type: "singlechoice",
    length: "medium",
    question: "Gdzie mieszkasz? (cz. 1)",
    answers: [
      "w mieszkaniu (blok/kamienica)",
      "w domu (jednorodzinnym/szeregowiec)",
    ],
    useShouldRender: () => true,
    page: pages[1],
  },
  {
    id: 4,
    type: "singlechoice",
    length: "long",
    question: "Gdzie mieszkasz? (cz. 2)",
    answers: [
      "w centrum Łodzi",
      "w Łodzi, poza centrum",
      "w okolicach Łodzi (Konstantynów Łódzki, Zgierz, etc)",
      "daleko od Łodzi, ale często tu bywam",
    ],
    useShouldRender: () => true,
    page: pages[1],
  },
  {
    id: 5,
    type: "singlechoice",
    length: "short",
    question: "Jakie jest twoje wykształcenie?",
    answers: [
      "podstawowe / gimnazjalne / zawodowe",
      "średnie / średnie branżowe",
      "wyższe",
    ],
    useShouldRender: () => true,
    page: pages[1],
  },
  {
    id: 6,
    type: "singlechoice",
    length: "short",
    question:
      "Jak istotna jest dla Ciebie jakość powietrza, którym oddychasz? (1 - wcale, 5 - bardzo)",
    answers: ["1", "2", "3", "4", "5"],
    useShouldRender: () => true,
    page: pages[2],
  },
  {
    id: 7,
    type: "singlechoice",
    length: "short",
    question:
      "Jak oceniasz jakość powietrza w Łodzi w skali całego roku? (1 - bardzo zła, 5 - bardzo dobra)",
    answers: ["1", "2", "3", "4", "5"],
    useShouldRender: () => true,
    page: pages[2],
  },
  {
    id: 8,
    type: "singlechoice",
    length: "short",
    question:
      "Jak oceniasz obecną jakość powietrza w porównaniu do tej sprzed 5 lat? (1 - jest znacznie gorzej, 5 - jest znacznie lepiej)",
    answers: ["1", "2", "3", "4", "5"],
    useShouldRender: () => true,
    page: pages[2],
  },
  {
    id: 9,
    type: "singlechoice",
    length: "long",
    question: "Czy zanieczyszczenie powietrza miało wpływ na Twoje zdrowie?",
    answers: [
      "Tak - mam stwierdzone schorzenia, których występowanie zwiększa smog",
      "Chyba tak - nie mam diagnozy, ale dostrzegam wpływ smogu na mnie",
      "Chyba nie - ale kto wie, co będzie za kilka lat",
      "Nie - i nie spodziewam się, żeby miało w przyszłości",
    ],
    useShouldRender: () => true,
    page: pages[2],
  },
  {
    id: 16,
    type: "singlechoice",
    length: "short",
    question: "Czy masz zainstalowane panele fotowoltaiczne?",
    answers: ["Tak", "Nie"],
    useShouldRender: () => true,
    page: pages[3],
  },
  {
    id: 17,
    type: "singlechoice",
    length: "short",
    question: "Czy masz możliwość zainstalowania paneli fotowoltaicznych?",
    answers: ["Tak", "Nie"],
    useShouldRender: () => !useHasSolarPanels(),
    page: pages[3],
  },
  {
    id: 10,
    type: "multichoice",
    length: "medium",
    question:
      "Z jakich sposobów ogrzewania swojego domu / mieszkania korzystasz?",
    answers: [
      "Centralne ogrzewanie",
      "Prąd elektryczny",
      "Kocioł na gaz",
      "Piec węglowy",
      "Kominek",
      "Nie jestem pewien",
      "Inne",
    ],
    useShouldRender: () => true,
    page: pages[3],
  },
  {
    id: 11,
    type: "singlechoice",
    length: "short",
    question:
      "Czy centralne ogrzewanie jest dostępne jako możliwość tam, gdzie mieszkasz?",
    answers: ["Tak", "Nie"],
    useShouldRender: () => !useHasCentralHeating(),
    page: pages[3],
  },
  {
    id: 12,
    type: "singlechoice",
    length: "short",
    question:
      "Czy Twoje mieszkanie / dom było wcześniej ogrzewane piecem węglowym?",
    answers: ["Tak", "Nie"],
    useShouldRender: () => !useHasKopciuch(),
    page: pages[3],
  },
  {
    id: 13,
    type: "singlechoice",
    length: "short",
    question:
      "Czy słyszałeś o dofinansowaniach do wymiany starych pieców węglowych?",
    answers: ["Tak", "Nie"],
    useShouldRender: () => true,
    page: pages[3],
  },
  {
    id: 14,
    type: "singlechoice",
    length: "short",
    question:
      "Czy wiesz ile kosztuje wymiana pieca węglowego lub jaka część kosztów jest refundowana w ramach programu?",
    answers: ["Tak", "Nie"],
    useShouldRender: () => true,
    page: pages[3],
  },
  {
    id: 18,
    type: "multipoint",
    question: "Jak często korzystasz z podanych środów transportu?",
    answers: [
      "Samochód jako kierowca",
      "Samochód jako pasażer",
      "Komunikacja miejsca",
      "Taksówki / uber",
      "Skuter / motor",
      "Rower",
      "Hulajnogi elektryczne",
    ],
    options: ["Często", "Czasem", "Wcale"],
    useShouldRender: () => true,
    page: pages[4],
  },
  {
    id: 19,
    type: "singlechoice",
    length: "short",
    question: "Gdy kierujesz autem, ilu pasażerów zwykle zabierasz?",
    answers: ["0", "1", "2", "3", "4+"],
    default: false,
    page: pages[4],
    useShouldRender: useIsDriver,
  },
  {
    id: 20,
    type: "multichoice",
    howManyAnswers: 2,
    length: "medium",
    question: "Dlaczego korzystasz z komunikacji miejskiej? (max 2)",
    answers: [
      "Nie mam samochodu",
      "Nie mam gdzie parkować samochodu",
      "Tak jest najtaniej",
      "Tak jest ekologiczniej",
      "Tak jest mi wygodnie",
      "Inne",
    ],
    page: pages[4],
    useShouldRender: useIsBusLover,
  },
  {
    id: 21,
    type: "multichoice",
    howManyAnswers: 2,
    length: "medium",
    question: "Dlaczego nie korzystasz z komunikacji miejskiej (max 2)",
    answers: [
      "Tak jest najszybciej",
      "Tak jest najwygodniej",
      "Przewożę dużo rzeczy",
      "Przewożę dużo osób",
      "Inne",
    ],
    page: pages[4],
    useShouldRender: () => !useIsBusLover(),
  },
  {
    id: 22,
    type: "multichoice",
    howManyAnswers: 3,
    length: "medium",
    question:
      "Gdybyś mógł poprawić komunikację miejską, co próbowałbyś osiągnąć? (max 3)",
    answers: [
      "krótszy czas podróży",
      "krótszy czas czekania na autobus",
      "większa punktualność",
      "mniej przesiadek",
      "inne",
      "mniejszy dystans do / z przystanków",
    ],
    page: pages[4],
    useShouldRender: useIsBusLover,
  },
  {
    id: 23,
    type: "multichoice",
    howManyAnswers: 3,
    length: "medium",
    question: "Co by cię przekonało do korzystania z MPK? (max 3)",
    answers: [
      "krótszy czas podróży",
      "krótszy czas czekania na autobus",
      "mniejszy dystans do / z przystanków",
      "większa punktualność",
      "mniej przesiadek",
      "inne",
      "nie dam się przekonać",
    ],
    page: pages[4],
    useShouldRender: () => !useIsBusLover(),
  },
  {
    id: 24,
    type: "singlechoice",
    howManyAnswers: 3,
    length: "medium",
    question:
      "Jaką podwyżkę ceny biletu zaakceptujesz, jeśli poprawie ulegną zaznaczone przez ciebie powyżej sfery?",
    answers: [
      "nie zaakceptuję podwyżki",
      "poniżej +50% ceny",
      "+50% ceny",
      "+100% ceny",
      "+200% ceny",
      "powyżej +200% ceny",
    ],
    page: pages[4],
    useShouldRender: () => true,
  },
  {
    id: 25,
    type: "multipoint",
    length: "long",
    question: "Jesteś za czy przeciw wprowadzaniu poniższych rozwiązań?",
    answers: [
      "Zwiększenie liczby buspasów (również kosztem pasów dla kierowców)",
      "Ograniczanie wjazdu samochodów do centrum",
      "Wprowadzanie ulg dla pojazdów elektrycznych (darmowe parkingi w centrum, możliwość korzystania z buspasów)",
      "Zwiększenie cen biletów parkingowych",
    ],
    options: ["Za", "Przeciw"],
    page: pages[4],
    useShouldRender: () => true,
  },
];

// exports.questions = questions;
export { questions, pages };
