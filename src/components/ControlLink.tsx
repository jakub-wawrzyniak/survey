import styled from "styled-components";
import { Link } from "react-router-dom";
import arrow from "/src/assets/right-arrow.svg";
import { BORDER_RADIUS, COLORS } from "../constants";
import { TextButton } from "./Text";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const ControlLinkArrow = styled.img.attrs({ src: arrow, alt: "" })`
  height: 14px;
  :first-child {
    transform: rotate(180deg);
  }

  @media (max-width: 390px) {
    height: 12px;
  }
`;

export const ControlLink = styled(Link).attrs({ onClick: scrollToTop })<{
  $accent?: boolean;
}>`
  padding: 0.9em 1em;
  margin-bottom: 0.8em;
  width: 100%;
  border-radius: ${BORDER_RADIUS.button};
  flex: 1 0 0;
  background-color: ${(p) =>
    p.$accent ? COLORS.accent : COLORS.mainBackground};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;

  @media (max-width: 390px) {
    padding: 0.7em;
  }
`;

/**
 * This version centers just its text instead of both text AND the arrow next to
 * it
 */
export const ControlLinkCentered = styled(ControlLink)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  ${TextButton} {
    grid-column: 2 / 3;
  }

  ${ControlLinkArrow}:first-child {
    grid-column: 1/2;
    justify-self: end;
  }
  ${ControlLinkArrow}:last-child {
    grid-column: 3/4;
    justify-self: start;
  }
`;
