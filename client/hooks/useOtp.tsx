import { createContext, useContext, useState, ReactNode } from "react";
import { useLogger } from "@/hooks/useLogger";
import { OtpData, OtpContextType } from "@/types/otp";

export const useOtp = () => {
  const log = useLogger("useOtp");
  log.debug("otp called");
  
  const context = useContext(OtpContext);
  if (!context) {
    log.warning("Otp must be used within a OtpProvider");
  }

  return context;
};

