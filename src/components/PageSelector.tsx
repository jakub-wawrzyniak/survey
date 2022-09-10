import { PAGES } from "../constants";
import { usePage } from "../router";
import { getUrlFromPage, useIsMobile } from "../utils";
import rightArrow from "/src/assets/right-arrow.svg";
import leftArrow from "/src/assets/left-arrow.svg";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function MobilePageSelector() {
  const page = usePage();
  return (
    <div className="PageSelector mobile">
      {page.prevPageUrl && (
        <button>
          <img className="img" src={leftArrow} alt="<" />
        </button>
      )}

      <h5 className="h5">{page.pageName}</h5>

      {page.nextPageUrl && (
        <button>
          <img className="img" src={rightArrow} alt=">" />
        </button>
      )}
    </div>
  );
}

function DesktopPageSelector() {
  const { pageId } = usePage();
  const navLinks = PAGES.map((p, id) => {
    const className = id > pageId ? "notVisited" : "";
    const href = getUrlFromPage(p);
    return (
      <Fragment key={id}>
        {id !== 0 && <img className="img" src={rightArrow} alt=">" />}
        <Link to={href}>
          <h5 className={"h5 " + className}>{p}</h5>
        </Link>
      </Fragment>
    );
  });
  return <div className="PageSelector desktop">{navLinks}</div>;
}

export function PageSelector() {
  const isMobile = useIsMobile();
  return isMobile ? <MobilePageSelector /> : <DesktopPageSelector />;
}
