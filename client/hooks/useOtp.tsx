import { createContext, useContext, useState, ReactNode } from "react";
import { useLogger } from "@/hooks/useLogger";
import { OtpData, OtpContextType } from "@/types/otp";

const OtpContext = createContext<OtpContextType | null>(null);

export const OtpProvider = ({ children }: { children: ReactNode }) => {
  const log = useLogger("OtpProider");

  const [otpData, setOtpData] = useState<OtpData>({
    email: "",
    password: "",
  });

  log.debug(`set email: ${ otpData.email } and password: ${ otpData.password }`);

  return (
    <OtpContext.Provider value={{ otpData, setOtpData }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => {
  const log = useLogger("useOtp");
  log.debug("otp called");
  
  const context = useContext(OtpContext);
  if (!context) {
    log.warning("Otp must be used within a OtpProvider");
  }

  return context;
};

