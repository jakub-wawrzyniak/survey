const questions = [
  {
    id: 1,
    type: "multichoice",
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
    type: "long-singlechoice",
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
];

export default questions;
