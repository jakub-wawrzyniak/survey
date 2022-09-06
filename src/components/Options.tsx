import { MultiPointQuesion } from "../types";
import { OptionButton } from "./OptionButton";

type OptionsProps = {
  question: MultiPointQuesion;
  subquestionId: number;
};
export function Options({ question, subquestionId }: OptionsProps) {
  // const dispatch = useDispatch();
  // const answers = useSelector((s) => s.answers[q.id]);
  // const answer = answers[ansId];
  // undefined means the client didnt select an option yet
  const buttons = question.options.map((op, opId) => {
    // const isOn = answer === opId;
    // const isOn = false;
    // const handleClick = () => {
    //   const newValue = [...answers];
    //   if (isOn) delete newValue[ansId];
    //   else newValue[ansId] = opId;
    //   dispatch(action(q, newValue));
    // };

    return <OptionButton key={opId} value={op} />;
  });

  return <div className="optionsContainer">{buttons}</div>;
}
