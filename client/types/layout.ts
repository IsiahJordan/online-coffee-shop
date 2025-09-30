import React from "react";

export type SignTypes = "in" | "up" | "none";

export type SignProps = {
  type: SignTypes;
  children: React.ReactNode;
};
