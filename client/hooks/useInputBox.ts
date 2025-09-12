import { UseInputProps } from "@/types/inputbox";
import { IconEnum } from "@/types/icon";
import Icon from "@/components/Icon";
import { useLogger } from "@/hooks/useLogger";

export function useInputBox({ type, styles, onClick }: UseInputProps) {
  const log = useLogger("useInputBox");

  if (type === "email") {
    log.debug("email type inputbox created");

    return Icon({ 
      option: IconEnum.MAIL, 
      toggle: undefined, 
      type: "icon", 
      styles: styles, 
      onClick: undefined 
    });

    log.debug("end of email icon");
  }
  else if (type === "password") {
    log.debug("password type inputbox created");
    
    log.debug("end of password icon");
    return [
      Icon({ 
        option: IconEnum.LOCK, 
        toggle: undefined, 
        type: "icon", 
        styles: styles, 
        onClick: undefined }), 
      Icon({ 
        option: IconEnum.NEYE, 
        toggle: IconEnum.EYE, 
        type: "button", 
        styles: styles, 
        onClick: onClick }) 
    ];

  }
}
