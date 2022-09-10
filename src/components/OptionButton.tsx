import styled from "styled-components";
import { BORDER_RADIUS, COLORS } from "../constants";
import { TextSmall } from "./Text";

const StyledButton = styled.button<{ $isOn: boolean }>`
  border: none;
  padding: 0.9em 0.9em;
  border-radius: ${BORDER_RADIUS.button};
  background-color: ${(p) => (p.$isOn ? COLORS.accent : COLORS.mainBackground)};
`;

type OptionButtonProps = {
  value: string;
};
export function OptionButton({ value }: OptionButtonProps) {
  const $isOn = Math.random() > 0.5;
  return (
    <StyledButton $isOn={$isOn}>
      <TextSmall>{value}</TextSmall>
    </StyledButton>
  );
}
