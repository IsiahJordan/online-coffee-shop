import { createContext, useContext, useState, ReactNode } from "react";

type OtpData = {
  email: string;
  password?: string;
};

type OtpContextType = {
  otpData: OtpData;
  setOtpData: React.Dispatch<React.SetStateAction<OtpData>>;
};

const OtpContext = createContext<OtpContextType | null>(null);

export const OtpProvider = ({ children }: { children: ReactNode }) => {
  const [otpData, setOtpData] = useState<OtpData>({
    email: "",
    password: "",
  });


  return (
    <OtpContext.Provider value={{ otpData, setOtpData }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => {
  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("Otp must be used within a OtpProvider");
  }
  return context;
};

