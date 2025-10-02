
export type InputData = {
  hint?: string;
  type: string; 
  onChange: (text: string) => string; 
};

export type UserProps = {
  email: string;
  password: string;
  onSuccess?: () => void;
};
