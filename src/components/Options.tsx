import styled from "styled-components";
import { BORDER_RADIUS, COLORS } from "../constants";
import { useAppDispatch, useAppSelector } from "../redux";
import { selectQuestion, toggleMultiPoint } from "../redux/questionSlice";
import { MultiPointQuestion } from "../types";
import { OptionButton } from "./OptionButton";

const Container = styled.div`
  display: flex;
  flex-flow: row;
  border: 1px solid ${COLORS.grayedOut};
  border-radius: ${BORDER_RADIUS.button};
  margin: 0.22em 1em 0.2em 0;
`;

type OptionsProps = {
  question: MultiPointQuestion;
  subquestionId: number;
};
export function Options({ question, subquestionId }: OptionsProps) {
  const { pickedAnswer } = useAppSelector(
    selectQuestion(question.id)
  ) as MultiPointQuestion;
  const dispatch = useAppDispatch();
  const toggleOption = (optionId: number) => {
    const payload = { optionId, subquestionId, questionId: question.id };
    dispatch(toggleMultiPoint(payload));
  };

  const buttons = question.options.map((op, opId) => {
    return (
      <OptionButton
        key={opId}
        isOn={pickedAnswer[subquestionId] === opId}
        onClick={() => toggleOption(opId)}
      >
        {op}
      </OptionButton>
    );
  });

  return <Container>{buttons}</Container>;
}
