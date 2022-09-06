type OptionButtonProps = {
  value: string;
};
export function OptionButton({ value }: OptionButtonProps) {
  const isOn = Math.random() > 0.5;
  return (
    <button className={isOn ? "OptionButton on" : "OptionButton off"}>
      <h5 className="h5">{value}</h5>
    </button>
  );
}
