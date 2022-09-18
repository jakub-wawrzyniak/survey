import { useAppDispatch, useAppSelector } from "../redux";
import { selectSubmitionState, submitAnswers } from "../redux/metadataSlice";
import { ControlButton } from "./ControlClickable";
import { TextButton } from "./Text";

type SubmitionStatus = ReturnType<typeof selectSubmitionState>;
type ButtonTexts = Record<SubmitionStatus, string>;
const TEXTS: ButtonTexts = {
  notSent: "Wyślij odpowiedzi",
  pending: "Wysyłanie...",
  submited: "Wysłano! Dziękujemy :)",
  rejected: "Coś poszło nie tak - spróbuj ponownie",
};

export const ButtonSubmit = () => {
  const status = useAppSelector(selectSubmitionState);
  const dispatch = useAppDispatch();
  const submit = () => {
    if (status === "notSent" || status === "rejected")
      dispatch(submitAnswers());
  };

  return (
    <ControlButton $accent onClick={submit}>
      <TextButton onClick={console.log}>{TEXTS[status]}</TextButton>
    </ControlButton>
  );
};
