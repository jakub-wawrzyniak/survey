import { useIsMobile } from "../../utils";
import { PageSelectorDesktop } from "./PageSelectorDesktop";
import { PageSelectorMobile } from "./PageSelectorMobile";

export function PageSelector() {
  const isMobile = useIsMobile();
  return isMobile ? <PageSelectorMobile /> : <PageSelectorDesktop />;
}
