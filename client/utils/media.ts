import { MediaProps } from "@/types/media";
import { useMediaQuery } from "react-responsive";
import { useLogger } from "@/hooks/useLogger";

// check if viewport is mobile, tablet, or desktop
export function verifyViewport({ onMobile, onTablet, onDesktop }: MediaProps) {
  const log = useLogger("verifyViewport");

  log.debug("set media query");
  const is_mobile = useMediaQuery({ maxWidth: 700 });
  const is_tablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });
  log.debug("done setting media query");

  if (is_mobile) {
    log.debug("viewport is mobile");
    onMobile();
  }
  else if (is_tablet) {
    log.debug("viewport is tablet");
    onTablet();
  }
  else {
    log.debug("viewport is desktop");
    onDesktop();
  }
  
  log.debug("end of function");
}
