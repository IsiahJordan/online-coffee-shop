
export type InputType = "email" | "password" | "text";

export type InputProps = {
  hint: string;
  label?: string;
  type: InputType;
  onChange: (text: string) => void; 
};

