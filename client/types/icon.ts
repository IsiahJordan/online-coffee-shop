import React from "react";

export enum IconEnum {
  NONE,
  EYE,
  NEYE,
  LOCK,
  MAIL
};

export type IconProps = {
  option: IconEnum;
  toggle?: IconEnum; // icon that will be used in click 
  type: "icon" | "button";
  styles: React.CSSProperties;
  onClick?: () => void;
};
