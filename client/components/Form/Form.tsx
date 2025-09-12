import styles from "./styles.module.css";
import { useLogger } from "@/hooks/useLogger";
import InputBox from "@/components/InputBox";
import { FormProps } from "@/types/form";

function Form ({ names, labels, hints, types, onChanges }: FormProps) {
  const log = useLogger("Form");
  log.debug(`names: ${ names }, labels: ${ labels }, hints: ${ hints }, types: ${ types }`);
  
  log.debug("end of component");
  return (
    <>
      <form className={ styles.form }>
        
        { labels.map((label, index) => (
          <div key={ index }>
            <InputBox
              name = { names[index] }
              hint = { hints[index] }
              label = { labels[index] }
              type = { types[index] }
              onChange = { onChanges[index] }
            />
          </div> 
        ))}
        
      </form>
    </>
  );
}

export default Form;
