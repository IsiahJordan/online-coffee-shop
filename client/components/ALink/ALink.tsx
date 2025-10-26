import { LinkProps } from "@/types/alink";
import styles from "./styles.module.css";
import { useLogger } from "@/hooks/useLogger";

function ALink({ label, onClick }: LinkProps) {
  const log = useLogger("ALink");
  log.debug(`label: ${label}`);
  
  log.debug("end of component");
  return (
    <>
      <a href="#" className={ styles.link } onClick={ onClick }>
        { label }
      </a>
    </>
  );
}

export default ALink;
