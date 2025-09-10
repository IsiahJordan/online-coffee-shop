import styles from "./styles.module.css";
import { ButtonProps } from "@/types/button";
import { useLogger } from "@/hooks/useLogger";
import React from "react";

function Button({ label, type, onClick }: ButtonProps) {
  const log = useLogger("Button");
  
  const onInteract = (e: React.MouseEvent<HTMLButtonElement>) => {
    log.debug("user clicked a button");

    onClick(e);
    log.debug("end of onClick");
  };

  return (
    <>
      <button className={ styles[type] } onClick={ onInteract }>
        { label }
      </button>
    </>
  );
}

export default Button;
