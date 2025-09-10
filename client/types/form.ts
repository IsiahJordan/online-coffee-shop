import { InputType } from "./inputbox";

export type FormProps = {
  labels: string[];
  hints: string[];
  types: InputType[];
  onChanges: (() => void)[];
};
