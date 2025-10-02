import React, { ReactNode, useEffect, useState } from "react";
import { InputProps } from "@/types/inputbox";
import styles from "./styles.module.css";
import { useInputBox } from "@/hooks/useInputBox";
import { useLogger } from "@/hooks/useLogger";

export default function InputBox({ name, hint, label, type, value, onChange }: InputProps) {
  const log = useLogger("InputBox");
  log.debug(`name: ${name}, hint: ${hint}, label: ${label},  type: ${type}`);

  // initial states
  const initialTypeState = type === "number" ? "text" : type;
  const [inputText, setInputText] = useState("");
  const [typeState, setTypeState] = useState(initialTypeState);

  // Keep typeState in sync if parent changes `type` prop
  useEffect(() => {
    setTypeState(type === "number" ? "text" : type);
  }, [type]);

  // Icon hook — call unconditionally (hooks must be called in the same order)
  const handleIconClick = () => {
    if (type === "password") {
      setTypeState((prev) => (prev === "password" ? "text" : "password"));
    }
  };

  const iconsResult = useInputBox({ type, styles, onClick: handleIconClick });
  let left_icon: ReactNode = (<></>);
  let right_icon: ReactNode = (<></>);

  // useInputBox might return a single ReactNode or a tuple [left, right]
  if (Array.isArray(iconsResult)) {
    left_icon = iconsResult[0] ?? (<></>);
    right_icon = iconsResult[1] ?? (<></>);
  } else if (iconsResult) {
    left_icon = iconsResult as ReactNode;
  }

  // defaults
  let cls_name: string = "input";
  let group_name: string = "";
  let pattern: string = "";
  let max_length: number = 100;
  let input_mode: string = "";

  switch (type) {
    case "email":
      cls_name = "input";
      group_name = "input-group";
      break;
    case "password":
      cls_name = "input";
      group_name = "input-group";
      break;
    case "number":
      cls_name = "code-input";
      pattern = "[0-9]*";
      max_length = 1; // only allow a single digit
      input_mode = "numeric"; // mobile keyboard hint
      break;
    default:
      cls_name = "input";
      group_name = "input-group";
  }

  const handleChange = (e) => {
    log.debug("user changed input text");

    if (type === "number") {
      // strip non-digits and enforce length
      log.debug("entered code");
      const filtered = e.target.value.replace(/\D/g, "").slice(0, max_length);
      const v = e.target.value;
      onChange(v);
    } else {
      log.debug("entered text");
      const v = e.target.value;
      onChange(v);
    }

    log.debug("end of onChange");
  };

  return (
    <>
      {label && (
        <label className={ styles.label } htmlFor={ name } data-testid="label">
          { label }
        </label>
      )}

      <div className={ styles[group_name] } data-testid="group-input">
        { left_icon }

        <input
          id = { name }
          name = { name }
          type = { typeState }
          inputMode = { input_mode || undefined }
          className = { styles[cls_name] }
          pattern = { pattern || undefined }
          placeholder=  { hint }
          maxLength = { max_length }
          value = { value }
          onChange = { handleChange }
          data-testid = "input"
        /> 

        { right_icon }
      </div>
    </>
  );
}

