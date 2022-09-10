import { Fragment } from "react";
import { PAGES } from "../../constants";
import { usePage } from "../../router";
import { getUrlFromPage } from "../../utils";
import { Arrow, NavDesktop, NavLink, NavText } from "./styled";

export function PageSelectorDesktop() {
  const { pageId } = usePage();
  const navLinks = PAGES.map((p, id) => {
    const isVisited = id <= pageId;
    const href = getUrlFromPage(p);
    return (
      <Fragment key={id}>
        {id !== 0 && <Arrow />}
        <NavLink to={href}>
          <NavText $grayedOut={!isVisited}>{p}</NavText>
        </NavLink>
      </Fragment>
    );
  });
  return <NavDesktop>{navLinks}</NavDesktop>;
}
