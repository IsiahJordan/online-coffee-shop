import { useLogger } from "@/hooks/useLogger";
import { verifyViewport } from "@/utils/media";
import { HeaderProps } from "@/types/header";

export function useHeader({ title, subtitle }: HeaderProps) {
  const log = useLogger("useHeader");
  log.debug(`title: ${ title } and subtitle: ${ subtitle }`);
  
  log.debug("verify subtitle");
  if (subtitle) {
    log.debug("subtitle has a value");

    if (typeof subtitle !== "string") {
      log.debug("subtitle is an array");
      
      // verify if mobile, tablet, or desktop then set
      verifyViewport({
        onMobile: () => { subtitle = subtitle[0]; },
        onTablet: () => { subtitle = subtitle[1]; },
        onDesktop: () => { subtitle = subtitle[2]; }
      });
    }
    
    log.debug(`subtitle: ${subtitle}`);
  }

  if (typeof title !== "string") {
    log.debug("title type is an array");
     
    verifyViewport({
      onMobile: () => { title = title[0]; },
      onTablet: () => { title = title[1]; },
      onDesktop: () => { title = title[2]; }
    });
  }
  
  log.debug(`title: ${title}`)


  return [title, subtitle];
}
