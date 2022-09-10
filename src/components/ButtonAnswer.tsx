import { Nestable } from "../types";
import { TextSmall } from "./Text";
import styled, { css } from "styled-components";

const TextAnswer = styled(TextSmall)`
  margin: 0.5em 0;
`;

const StyledButton = styled.button<{ isPicked: boolean }>`
  border: 1px solid var(--grayed-out);
  border-radius: var(--btn-radius);
  padding: 0.9em 1em;
  margin: 0.3em;
  flex: 1 1 0px;

  ${(p) =>
    p.isPicked &&
    css`
      background-color: var(--accent);
      border-color: var(--accent);
    `}
`;

type AnswerButtonProps = Nestable & {
  isOn: boolean;
  onClick: () => void;
};
export function ButtonAnswer({ children, isOn, onClick }: AnswerButtonProps) {
  return (
    <StyledButton onClick={onClick} isPicked={isOn}>
      <TextAnswer>{children}</TextAnswer>
    </StyledButton>
  );
}
