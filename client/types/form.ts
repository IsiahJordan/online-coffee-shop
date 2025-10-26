import { InputType } from "./inputbox";

export type FormProps = {
  names: string[];
  labels: string[];
  hints: string[];
  types: InputType[];
  onChanges: (() => void)[];
};
