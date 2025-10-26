import React from "react";

export type ResendCodeProps = {
  text: string; // send code text
  limit: number;
  styles: React.CSSProperties;
  callback: () => void;
};
