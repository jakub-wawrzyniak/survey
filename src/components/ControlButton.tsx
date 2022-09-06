type ControlButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  accent?: boolean;
};

export function ControlButton({
  children,
  onClick,
  accent = false,
}: ControlButtonProps) {
  let className = "ControlButton";
  if (accent) className += " accent";
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
