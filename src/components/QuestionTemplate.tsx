import styled from "styled-components";
import { BORDER_RADIUS, COLORS } from "../constants";
import { Length, Nestable, Question } from "../types";
import { TextHeader, TextAnswer } from "./Text";

const QuestionContainer = styled.form`
  margin: 1.5em 0;
  padding: 1em 2em;
  border-radius: ${BORDER_RADIUS.default};
  background-color: ${COLORS.mainBackground};

  @media (max-width: 550px) {
    margin: 1em 0;
    padding: 1em 0.7em;
  }
`;

const answerContainers: Record<Length, ReturnType<typeof styled.div>> = {
  long: styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    ${TextAnswer} {
      text-align: left;
    }
  `,

  medium: styled.div`
    display: flex;
    flex-flow: row wrap;
    ${TextAnswer} {
      white-space: nowrap;
    }
  `,

  short: styled.div`
    display: flex;
    flex-direction: row;
    ${TextAnswer} {
      text-align: center;
    }
  `,
};

type QuestionTemplateProps = Nestable & { question: Question };
export function QuestionTemplate({
  children,
  question,
}: QuestionTemplateProps) {
  let answers = <div>{children}</div>;
  if ("length" in question) {
    const AnswerContainer = answerContainers[question.length];
    answers = <AnswerContainer>{children}</AnswerContainer>;
  }

  return (
    <QuestionContainer onChange={(e: unknown) => console.log(e)}>
      <TextHeader>{question.title}</TextHeader>
      {answers}
    </QuestionContainer>
  );
}
