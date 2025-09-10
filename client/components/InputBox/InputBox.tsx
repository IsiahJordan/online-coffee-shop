import { InputProps } from "@/types/inputbox";
import { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useLogger } from "@/hooks/useLogger";

function InputBox({ hint, label, type, onChange }: InputProps) {
  const log = useLogger("InputBox");

  // If icon from right is set, then it's clickable
  log.debug("creating states");
  const [iconState, setIconState] = useState(false); 
  const [inputText, setInputText] = useState("");
  log.debug("end of states");

  // Left and right icon interactable & uninteractable
  log.debug("creating icons");
  let left_icon: ReactNode = (<></>);
  let right_icon: ReactNode = (<></>);
  log.debug("end of states");

  if (type === "email") {
    log.debug("email type inputbox created");

    left_icon = (
      <>
        <MdEmail className={styles["icon"]}/>
      </>
    );

    log.debug("end of email icon");
  }
  else if (type === "password") {
    log.debug("password type inputbox created");
    
    log.debug("set left icon to lock password fill");
    left_icon = (
      <>
        <RiLockPasswordFill className={styles["icon"]}/>
      </>
    );

    log.debug("end of password icon");
    
    log.debug("set right icon to eye icon");
    right_icon = (
      <>
        { iconState ? (
          <FaRegEye className={styles["icon"]}/>
        ):(
          <FaRegEyeSlash className={styles["icon"]}/>
        )}
      </>
    );

    log.debug("end of eye icon");
  }

  return (
    <>
      { label &&
        <label className={ styles.label } htmlFor={ type }>
          { label }
        </label>
      }
      <div className={ styles["input-group"] }>
        { left_icon }
        <input 
          name={ type }
          type={ type }
          className={ styles.input } 
          placeholder={ hint }
          onChange={(e) => {
            log.debug("user changed input text");

            setInputText(e.target.value);
            onChange(e.target.value);

            log.debug("end of onChange");
          }}
        />
        <button className={ styles["icon-right"] } onClick={(e) => {
          log.debug("user clicked button")

          e.preventDefault();
          setIconState((prev) => !prev)

          log.debug(`set icon state to ${iconState}`);
        }}>
          { right_icon }
        </button>
      </div>
    </>
  );
}

export default InputBox;
