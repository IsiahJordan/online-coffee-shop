import styles from "./styles.module.css";

import { generateOtp } from "@/services/OtpService";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { verifyViewport } from "@/utils/media";
import { submitOtp, useGenOtp } from "@/hooks/useOtp";
import { OtpContext } from "@/context/OtpContext";

import OtpLayout from "@/layout/OtpLayout";
import Button from "@/components/Button";
import Header from "@/components/Header";
import InputBox from "@/components/InputBox";
import BackIcon from "@/components/BackIcon";
import ResendCode from "@/components/ResendCode";

function OtpPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(Array(4).fill(""));

  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("OtpPage must be used within OtpProvider");
  }
  const { otpData, setOtpData } = context;
  
  // Verify valid entry to OTP 
  /* if ( otpData.email === ""){
    returnBack();
  } */

  // Set or Reset OTP  
  async function setOtp(){
    const res = await generateOtp({ email: otpData.email });
    await emailUser({ email: otpData.email, code: res.otp_code });
  }

  useGenOtp({ otpData: otpData, callback: setOtp });

  let is_mobile = false;
  verifyViewport({
    onMobile: () => { is_mobile = true; },
    onTablet: () => {},
    onDesktop: () => {}
  });


  const onSubmit = async (event) => {
    event.preventDefault(); 
    const code = values.join(""); 
    
    await submitOtp({
      otpData,
      code
    });
  }

  // Updates the params of the inputed data
  const handleChange = (val: string, idx: number) => {
    if (/^[0-9]?$/.test(val)){
      const newValues = [...values];
      newValues[idx] = val;
      setValues(newValues);
    }
  }

  let code_inputs = Array(4);
  for (let i = 0; i < 4; i++){
    code_inputs.push(
      <InputBox
        name = { "code" }
        hint = { undefined }
        label = { undefined }
        type = { "number" }
        onChange = { (value) => handleChange(value, i) }
      />
    )
  }

  return (
    <OtpLayout>
    <div className = { styles.component }>
      <BackIcon
          styles = { styles }
          callback = { () => navigate(-1) }
      />

      <div className = { styles.header }>

        <Header 
          title = "Verification Code"
          subtitle = "We send a 4-code to your email"
        />

      </div>   

      <form className = { styles.form }>

        <div className = { styles.code }>
          {code_inputs.map((render, key) => (
            <span key = { key }>
              { render }
            </span>
          ))}
        </div>
        
      </form>
      <footer className = { styles.footer }>

        <ResendCode
          text = "Resend Code"
          limit = { 30 }
          styles = { styles }
          callback = { setOtp }
        />

        <Button
          label = "Submit Code"
          type = "primary"
          onClick = { onSubmit }
        />
        
        { !is_mobile &&
          (
            <Button
              label = "Return Back"
              type = "secondary"
              onClick = {(e) => navigate(-1)}
            />
          )
        }

      </footer>
    </div>
    </OtpLayout>
  );
}

export default  OtpPage;
