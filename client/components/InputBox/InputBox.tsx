import { InputProps } from "@/types/inputbox";
import { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import { useInputBox } from "@/hooks/useInputBox";
import { useLogger } from "@/hooks/useLogger";

function InputBox({ name, hint, label, type, onChange }: InputProps) {
  const log = useLogger("InputBox");
  log.debug(`name: ${ name }, hint: ${ hint }, label: ${ label },  type: ${ type }`);

  // If icon from right is set, then it's clickable
  log.debug("creating states");
  const [inputText, setInputText] = useState("");
  const [typeState, setTypeState] = useState(type);
  log.debug("end of states");

  // Left and right icon interactable & uninteractable
  log.debug("creating icons");
  let left_icon: ReactNode = (<></>);
  let right_icon: ReactNode = (<></>);
  log.debug("end of states");

  switch (type) {
    case "email":
      log.debug("email is set");

      left_icon = useInputBox({ type, styles, undefined });
      break;
    case "password":
      log.debug("password is set");
      [left_icon, right_icon] = useInputBox({ 
        type: type, 
        styles: styles, 
        onClick: () => { 
          log.debug("icon clicked");

          typeState === "password" ? setTypeState("text") : setTypeState("password"); 
        }
      });
      break;
    case "code":
      break;
  }

  return (
    <>
      { label &&
        <label className={ styles.label } htmlFor={ name }>
          { label }
        </label>
      }
      <div className={ styles["input-group"] }>
        { left_icon }
        <input 
          name={ name }
          type={ typeState }
          className={ styles.input } 
          placeholder={ hint }
          onChange={(e) => {
            e.preventDefault();
            log.debug("user changed input text");

            setInputText(e.target.value);
            onChange(e.target.value);

            log.debug("end of onChange");
          }}
k        />
        { right_icon }
      </div>
    </>
  );
}

export default InputBox;
