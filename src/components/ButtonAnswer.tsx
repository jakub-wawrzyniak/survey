import { Nestable } from "../types";

type AnswerButtonProps = Nestable & {
  isOn: boolean;
  onClick: () => void;
};
export function ButtonAnswer({ children, isOn, onClick }: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={isOn ? "AnswerButton on" : "AnswerButton off"}
    >
      <h5 className="h5 answerText">{children}</h5>
    </button>
  );
}
