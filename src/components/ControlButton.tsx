import { Link } from "react-router-dom";

type ControlButtonProps = {
  children: React.ReactNode;
  href: string;
  accent?: boolean;
};

// FIXME: Refactor name
export function ControlButton({
  children,
  href,
  accent = false,
}: ControlButtonProps) {
  let className = "ControlButton";
  if (accent) className += " accent";
  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
}
