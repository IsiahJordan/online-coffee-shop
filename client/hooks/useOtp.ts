import { useLogger } from "@/hooks/useLogger";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { verifyOtp, notifyOtp, emailUser } from "@/services/OtpService";
import { OtpProps, GenOtpProps } from "@/types/otp";

export const submitOtp = async ({ otpData, code, navigate }: OtpProps) => {
  const log = useLogger("useOtp");
  log.info("otp called");
  
    const res = await verifyOtp({ email: otpData.email , code: code });
    log.info(res);

    if (!res.succeess && res.action === "return"){
      log.error("Absolute Failure");
      navigate(-1);
    }
    else if (!res.success){
      log.debug("try again");
    }
    else {
      log.info("Very Successful")
      await notifyOtp({ email: otpData.email }); 

      if (otpData.password){
        otpData.onSuccess({ email: otpData.email, password: otpData.password });
      }
      else {
        otpData.onSuccess({ email: otpData.email });
      }
    }
};

export const useGenOtp = ({ otpData, callback }: GenOtpProps) => {
  useEffect(() => {
    async function genOtp(){
      if ( otpData.email ){
        await callback();
      }
    }
    genOtp();
  }, []);
}
