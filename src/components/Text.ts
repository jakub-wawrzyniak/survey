import styled, { css } from "styled-components";
import { COLORS } from "../constants";

const textDefaults = css`
  font-family: "Roboto";
  margin: 0;
  padding: 0;
`;

// h3
export const TextTitle = styled.h2`
  ${textDefaults}
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 0.5em;
  text-align: center;
  @media (max-width: 550px) {
    font-size: 1.25rem;
  }
`;

// p
export const TextRegular = styled.p`
  ${textDefaults}
  font-size: 0.9rem;
  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

// h4
export const TextButton = styled.p`
  ${textDefaults}
  font-size: 1rem;
  font-weight: 500;
  @media (max-width: 550px) {
    font-size: 0.9rem;
  }
`;

// h4
export const TextHeader = styled(TextButton)`
  text-align: center;
  margin-bottom: 0.5em;
`;

//h5
export const TextSmall = styled.p`
  ${textDefaults}
  font-size: 0.9rem;
  font-weight: 400;
  color: ${COLORS.gentleDark};
  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

export const TextAnswer = styled(TextSmall)`
  margin: 0.5em 0;
`;
