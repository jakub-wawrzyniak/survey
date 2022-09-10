import styled from "styled-components";

export const InfoContainer = styled.article`
  width: 100%;
  margin: 1.5em 0;
  padding: 2em 4em;
  border-radius: var(--border-radius);
  background-color: var(--main-bgc);

  @media (max-width: 550px) {
    margin: 1.5em 0;
    padding: 2em 3em;
  }
`;

export const InfoList = styled.ul`
  margin: 1.5em 0;
`;

export const InfoListElement = styled.li`
  margin: 0.6em 0;
`;
