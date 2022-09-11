import { Nestable } from "../types";
import { TextAnswer } from "./Text";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS } from "../constants";
import { useId } from "react";

const Input = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;

  border: 1px solid ${COLORS.grayedOut};
  border-radius: ${BORDER_RADIUS.button};
  padding: 0.9em 1em;
  margin: 0.3em;
  flex: 1 1 0px;

  :hover {
    cursor: pointer;
  }

  ${Input}:checked + & {
    background-color: ${COLORS.accent};
    border-color: ${COLORS.accent};
  }

  ${Input}:focus + & {
    outline: 3px solid ${COLORS.outline};
  }

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
  type: "radio" | "checkbox";
  name?: string;
};
export function ButtonAnswer({
  children,
  type,
  isOn,
  onClick,
}: AnswerButtonProps) {
  const id = useId();
  return (
    <>
      <Input id={id} type={type} checked={isOn} onClick={onClick} />
      <Label htmlFor={id}>
        <TextAnswer>{children}</TextAnswer>
      </Label>
    </>
  );
}
