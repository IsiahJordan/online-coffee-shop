import { createContext, useContext, useState, ReactNode } from "react";

type SignupData = {
  email: string;
  password: string;
};

type SignUpContextType = {
  signupData: SignupData;
  setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
};

const SignUpContext = createContext<SignUpContextType | null>(null);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
  });


  return (
    <SignUpContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }
  return context;
};

