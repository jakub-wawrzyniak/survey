import styled from "styled-components";
import { BORDER_RADIUS, COLORS } from "../constants";

export const InfoContainer = styled.article`
  width: 100%;
  margin: 1.5em 0;
  padding: 2em 4em;
  border-radius: ${BORDER_RADIUS.default};
  background-color: ${COLORS.mainBackground};

  @media (max-width: 550px) {
    margin: 1.5em 0;
    padding: 2em 3em;
  }

  @media (max-width: 390px) {
    padding: 1.5em 2em;
  }
`;

export const InfoList = styled.ul`
  margin: 1.5em 0;
  padding-left: 1em;
`;

export const InfoListElement = styled.li`
  margin: 0.6em 0;
`;
