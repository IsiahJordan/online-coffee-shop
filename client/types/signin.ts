
export type InputData = {
  hint?: string;
  type: string; // Type of input box (i.e. Email, Password)
  onChange: (text: string) => string; 
};

