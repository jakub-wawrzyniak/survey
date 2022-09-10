import styled, { css } from "styled-components";

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
export const TextHeader = TextButton;

//h5
export const TextSmall = styled.p`
  ${textDefaults}
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--gentle-dark);
  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;
