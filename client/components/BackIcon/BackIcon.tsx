import { BackIconType } from "@/types/backicon";
import { useLogger } from "@/hooks/useLogger";
import Icon from "@/components/Icon";
import { IconEnum } from "@/types/icon";

function BackIcon({ styles, callback } : BackIconType) {
  return (
    <>
      <Icon
        option = { IconEnum.ARROW }
        toggle = { undefined }
        type = "button"
        styles = { styles }
        onClick = {(e) => callback()}
      />
    </>
  );
}

export default BackIcon;
