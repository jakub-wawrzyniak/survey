import styled from "styled-components";
import { Link } from "react-router-dom";
import arrow from "/src/assets/right-arrow.svg";
import { BORDER_RADIUS, COLORS } from "../constants";
import { TextButton } from "./Text";

export const ControlLink = styled(Link)<{ $accent?: boolean }>`
  padding: calc(0.9em + 1px) 1em;
  margin-bottom: 0.8em;
  width: 100%;
  border-radius: ${BORDER_RADIUS.button};
  flex: 1 0 0;
  background-color: ${(p) =>
    p.$accent ? COLORS.accent : COLORS.mainBackground};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const ControlLinkArrow = styled.img.attrs({ src: arrow, alt: "" })`
  height: 14px;
  :first-child {
    transform: rotate(180deg);
  }
`;
