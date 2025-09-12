import React from "react";

export type InputType = "email" | "password" | "text";

export type InputProps = {
  name: string;
  hint: string;
  label?: string;
  type: InputType;
  onChange: (text: string) => void; 
};

export type UseInputProps = {
  type: InputType;
  styles: React.CSSProperties;
  onClick: () => void;
};
