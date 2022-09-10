import { Link } from "react-router-dom";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS } from "../../constants";
import { TextRegular, TextSmall } from "../Text";
import arrow from "/src/assets/right-arrow.svg";

export const Arrow = styled.img.attrs({ src: arrow, alt: "" })`
  height: 0.9rem;
`;

export const ArrowMobile = styled(Arrow)`
  height: 100%;
`;

export const NavLink = styled(Link)``;

export const NavText = styled(TextSmall)<{ $grayedOut?: boolean }>`
  font-weight: 600;
`;

export const NavDesktop = styled.nav`
  width: 95%;
  max-width: 1200px;
  margin: 1em auto;
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${BORDER_RADIUS.default};
  background-color: ${COLORS.mainBackground};
`;

export const NavMobile = styled(NavDesktop)`
  max-width: 390px;
  padding-inline: 1.5em;
  position: relative;
  height: 40px;
`;

export const NavMobileLink = styled(Link)`
  height: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 5em;
  position: absolute;
  right: 0;
  padding-inline: 1.5em;

  &:first-child {
    left: 0;
    justify-content: flex-start;
    ${ArrowMobile} {
      transform: rotate(180deg);
    }
  }
`;

export const NavMobileText = styled(TextRegular)`
  text-align: center;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
