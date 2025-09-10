import styles from "./styles.module.css"
import { useLogger } from "@/hooks/useLogger";
import { useHeader } from "@/hooks/useHeader";
import { HeaderProps } from "@/types/header";

function Header({ title, subtitle }: HeaderProps) {
  const log = useLogger("Header");

  log.debug("set variables");
  let title_block = (<></>);
  let sub_title_block = (<></>);
  log.debug("done setting")

  const [final_title, final_subtitle] = useHeader({ title: title, subtitle: subtitle });
  log.debug(`final title: ${final_title} and subtitle: ${final_subtitle}`);

  title_block = (
    <h1 className={styles.title}>
      { final_title }
    </h1>
  );
  
  log.debug("set title block");

  sub_title_block = (
    <p className={styles.subtitle}>
      { final_subtitle }
    </p>
  );

  log.debug("set sub title block");

  log.debug("end of component");
  return (
    <>
      <header className={styles.header}>
          { title_block }
          { sub_title_block }
      </header>
    </>
  );
}

export default Header;
