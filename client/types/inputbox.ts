
export type InputProps = {
  hint: string;
  label?: string;
  type: "email" | "password" | "text"; // Type of input box 
  onChange: (text: string) => void; 
};

