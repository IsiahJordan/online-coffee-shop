import styles from "./styles.module.css";
import { CheckBoxProps } from "@/types/checkbox";
import { useLogger } from "@/hooks/useLogger";

function CheckBox({ name, label, onChange, onClick }: CheckBoxProps) {
  const log = useLogger("CheckBox");
  log.debug(`name: ${name}, label: ${label}`);

  log.debug("determine if onChange is set");
  let text_block = (<>{ label }</>);
  if (onClick) {
    text_block = (
      <a className={ styles.link } onClick={(e) => 
      { 
          e.preventDefault(); 
          onClick(); 
        }} href="#" data-testid="link">
        { label }
      </a>
    );
  }

  log.debug("end of checkbox");
  return (
    <>
      <div className={ styles.terms }>
        <input name={ name } type="checkbox" onChange={
          (e) => {
            log.debug(`toggle: ${ e.target.checked }`);
            onChange(e.target.checked);
          }
        } data-testid="box"/>
        { text_block }
      </div>
    </> 
  );
}

export default CheckBox;
