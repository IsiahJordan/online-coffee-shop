import styles from "./styles.module.css";
import { useLogger } from "@/hooks/useLogger";
import InputBox from "@/components/InputBox";
import { FormProps } from "@/types/form";

function Form ({ labels, hints, types, onChanges }: FormProps) {
  const log = useLogger("Form");
  log.debug(`labels: ${ labels }, hints: ${ hints }, and types: ${ types }`);

  for (let i = 0; i < labels.length(); i++){
    log.debug(`LABELS: ${labels[i]}`);
  }
  
  log.debug("end of component");
  return (
    <>
      <form className={ styles.form }>
        
        { labels.map((label, index) => (
          <>
            <InputBox
              hint = { hints[index] }
              label = { label }
              type = { types[index] }
              onChange = { onChanges[index] }
            />
          </> 
        ))}
        
      </form>
    </>
  );
}

export default Form;
