import { useIsMobile } from "../../utils";
import { PageSelectorMobile } from "./PageSelectorMobile";

export function PageSelector() {
  const isMobile = useIsMobile();
  return isMobile ? <PageSelectorMobile /> : <PageSelectorMobile />;
}
