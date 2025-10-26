

export type CheckBoxProps = {
  name: string;
  hint: string;
  onChange: (check:boolean) => void;
  onClick?: () => void;
};
