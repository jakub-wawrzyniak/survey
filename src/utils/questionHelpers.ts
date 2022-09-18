import { Question } from "../types";

export function isQuestionEmpty({ type, pickedAnswer }: Question) {
  switch (type) {
    case "multichoice":
      return pickedAnswer.length === 0;
    case "multipoint":
      return Object.values(pickedAnswer).length === 0;
    case "singlechoice":
      return pickedAnswer === null;
  }
}
