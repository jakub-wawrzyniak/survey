import { ArrowMobile, NavMobileText, NavMobile, NavMobileLink } from "./styled";
import { usePage } from "../../router";

function Link({ to }: { to?: string }) {
  if (to === undefined) return <></>;
  return (
    <NavMobileLink to={to}>
      <ArrowMobile />
    </NavMobileLink>
  );
}

export function PageSelectorMobile() {
  const { prevPageUrl, nextPageUrl, pageName } = usePage();
  return (
    <NavMobile>
      <Link to={prevPageUrl} />
      <NavMobileText>{pageName}</NavMobileText>
      <Link to={nextPageUrl} />
    </NavMobile>
  );
}
