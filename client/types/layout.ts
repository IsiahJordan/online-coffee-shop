import React from "react";

export type SignTypes = "in" | "up" | "none";

export type SignProps = {
  name?: string; // name of the classname
  type: SignTypes;
  children: React.ReactNode;
};
