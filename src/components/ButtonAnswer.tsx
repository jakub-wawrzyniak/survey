import { Nestable } from "../types";
import { TextAnswer } from "./Text";
import styled, { css } from "styled-components";
import { BORDER_RADIUS, COLORS } from "../constants";

const StyledButton = styled.button<{ isPicked: boolean }>`
  border: 1px solid ${COLORS.grayedOut};
  border-radius: ${BORDER_RADIUS.button};
  padding: 0.9em 1em;
  margin: 0.3em;
  flex: 1 1 0px;

  ${(p) =>
    p.isPicked &&
    css`
      background-color: ${COLORS.accent};
      border-color: ${COLORS.accent};
    `}

  @media (max-width: 550px) {
    padding: 0.5em 0.7em;
    margin: 0.3em;
  }

  @media (max-width: 390px) {
    padding: 0.3em 0.5em;
    margin: 0.2em;
  }
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
