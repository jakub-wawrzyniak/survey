import { Options } from "./Options";
import { MultiPointQuesion } from "../types";
import styled from "styled-components";
import { TextHeader, TextSmall } from "./Text";
import { QuestionTemplate } from "./QuestionTemplate";

const Subquestion = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

type Props = { question: MultiPointQuesion };
export function QuestionMultiPoint({ question }: Props) {
  const subquestions = question.subquestions.map((questionText, id) => {
    return (
      <Subquestion key={id}>
        <Options question={question} subquestionId={id} />
        <TextSmall>{questionText}</TextSmall>
      </Subquestion>
    );
  });

  return (
    <QuestionTemplate question={question}>{subquestions}</QuestionTemplate>
  );
}
