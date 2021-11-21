const questions = [
  {
    id: 1,
    type: "multichoice",
    length: "long",
    question:
      "Jak oceniasz obecną jakość powietrza w porównaniu do tej sprzed 5 lat?",
    answers: [
      "Jest znacznie lepiej",
      "Jest nieco lepiej",
      "Bez zmian",
      "Jest nieco gorzej",
      "Jest znacznie gorzej",
    ],
    default: true,
  },
  {
    id: 2,
    type: "singlechoice",
    length: "short",
    question:
      "Jak oceniasz obecną jakość powietrza w porównaniu do tej sprzed 5 lat?",
    answers: [
      "Jest znacznie lepiej",
      "Jest nieco lepiej",
      "Bez zmian",
      "Jest nieco gorzej",
      "Jest znacznie gorzej",
    ],
    default: true,
  },
  {
    id: 3,
    type: "singlechoice",
    length: "short",
    question: "Z jaką płcią się identyfikujesz?",
    answers: ["Kobieta", "Mężczyzna", "Inna"],
    default: true,
  },
];

export default questions;
