import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useLogger } from "@/hooks/useLogger";
import { IconProps, IconEnum } from "@/types/icon";
import { React, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

function getIcon({ option, styles }: { option: IconEnum, styles: React.CSSProperties }) {
  const log = useLogger("getIcon");
  log.debug(`option: ${ option }`);

  switch (option) {
    case IconEnum.EYE:
      log.debug("icon send EYE");
      return (<FaRegEye className={ styles["icon"]} data-testid="eye-icon"/>);
    case IconEnum.NEYE:
      log.debug("icon send NEYE");
      return (<FaRegEyeSlash className={ styles["icon"] } data-testid="neye-icon"/>);
    case IconEnum.LOCK:
      log.debug("icon send LOCK");
      return (<RiLockPasswordFill className={ styles["icon"] } data-testid="lock-icon"/>);
    case IconEnum.MAIL:
      log.debug("icon send MAIL");
      return (<MdEmail className={ styles["icon"] } data-testid="mail-icon"/>);
    case IconEnum.ARROW:
      log.debug("icon send ARROW");
      return (<IoArrowBack className={ styles["icon"] } data-testid="arrow-icon"/>);
      
  }
  
  log.warn("no matching icon");
  return (<></>);
}

// option -> IconEnum.<enum name>
// toggle -> if toggled via clicked call something
// type -> type btn or not
// styles -> icon classname
// onClick -> any clicked event
function Icon({ option, toggle, type, styles, onClick }: IconProps) {
  let log = useLogger("Icon");
  log.debug(`type: ${ type }`);

  log.debug("set state");
  const [iconState, setIconState] = useState(false); 
  log.debug("done set");

  if (styles === undefined) {
    log.warn("no styles for icon was set");
    styles = { };
  }

  
  let icon = (<></>);
  if (iconState === false) {
    log.debug("icon set to false");

    icon = getIcon({ option: option, styles: styles });
  }
  else {
    log.debug("icon set to true");

    icon = getIcon({ option: toggle, styles: styles });
  }
  
  log.debug("verify type of icon");

  const clicked = (e) => {
    e.preventDefault();
    log.debug(`type: ${ type }`)

    setIconState((prev) => !prev);
    onClick();
  };
  
  log.debug("verify if button");
  if (type === "button") {
    log.debug("icon is button");

    icon =  (
    <button className={ styles["icon-btn"] } onClick={ clicked } data-testid="icon-btn">
      { icon }
    </button>
    );
  }
  
  log.debug("end of icon");
  return icon;
}

export default Icon;
