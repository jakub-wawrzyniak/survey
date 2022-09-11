import { useId } from "react";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS } from "../constants";
import { Nestable } from "../types";
import { TextSmall } from "./Text";

const Input = styled.input`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const Label = styled.label`
  border: none;
  padding: 0.9em 0.9em;
  border-radius: ${BORDER_RADIUS.button};
  background-color: ${COLORS.mainBackground};

  ${Input}:checked + & {
    background-color: ${COLORS.accent};
  }

  @media (max-width: 390px) {
    padding: 0.7em;
  }
`;

type OptionButtonProps = Nestable & {
  isOn: boolean;
  onClick: () => void;
};
export function OptionButton({ children, isOn, onClick }: OptionButtonProps) {
  const id = useId();
  return (
    <>
      <Input
        id={id}
        type="radio"
        onChange={onClick}
        onClick={isOn ? onClick : () => {}} // Allows unsetting the option, without loosing accesibility
        checked={isOn}
      />
      <Label htmlFor={id}>
        <TextSmall>{children}</TextSmall>
      </Label>
    </>
  );
}
