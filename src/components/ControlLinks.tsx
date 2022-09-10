import styled from "styled-components";
import { usePage } from "../router";
import { ControlLink, ControlLinkArrow } from "./ControlLink";
import { TextButton } from "./Text";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto 4em auto;
  width: 100%;
  flex-direction: row;
  justify-content: stretch;
  gap: 8px;
`;

export const ControlLinks = () => {
  const { nextPageUrl, prevPageUrl } = usePage();

  const error = (t: string) => `usePage didn't return a ${t} url`;
  if (nextPageUrl === undefined) throw error("next");
  if (prevPageUrl === undefined) throw error("previous");

  return (
    <Wrapper>
      <ControlLink to={prevPageUrl}>
        <ControlLinkArrow />
        <TextButton>Powrót</TextButton>
      </ControlLink>
      <ControlLink $accent to={nextPageUrl}>
        <TextButton>Dalej</TextButton>
        <ControlLinkArrow />
      </ControlLink>
    </Wrapper>
  );
};
