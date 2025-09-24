import styles from "./styles.module.css";
import { OtpContext } from "@/context/OtpContext";

import { generateOtp, verifyOtp, notifyOtp, emailUser } from "@/services/OtpService";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import OtpLayout from "@/layout/OtpLayout";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";


function OtpPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isTablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });
  const [resendCode, setResendCode] = useState("wait");
  const [values, setValues] = useState(Array(4).fill(""));
  const [timeLeft, setTimeLeft] = useState(30);
  const location = useLocation();

  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("OtpPage must be used within OtpProvider");
  }
  const { otpData, setOtpData } = context;
  
  const returnBack = () => {
    navigate(-1);
  };

  // Verify valid entry to OTP 
  /* if ( otpData.email === ""){
    returnBack();
  } */

  // Set or Reset OTP  
  async function setOtp(){
    const res = await generateOtp({ email: otpData.email });
    await emailUser({ email: otpData.email, code: res.otp_code });
  }

  useEffect(() => {
    async function genOtp(){
      if ( otpData.email ){
        await setOtp();
      }
    }
    genOtp();
  }, []);


  const onSubmit = async (event) => {
    event.preventDefault();
    
    const code = values.join(""); 
    
    try {
      const res = await verifyOtp({ email: otpData.email , code: code });
      console.log(res);

      if (!res.succeess && res.action === "return"){
        console.log("Absolute Failure");
        returnBack();
      }
      else if (!res.success){
        console.log("try again");
      }
      else {
        console.log(otpData.email);
        console.log("Very Successful")
        await notifyOtp({ email: otpData.email }); 

        if (otpData.password){
          onSuccess({ email: otpData.email, password: otpData.password });
        }
        else {
          onSuccess({ email: otpData.email });
        }
      }
    } catch (error) {
      console.error("Error with the server: ", error);
    }
  }

  // Updates the params of the inputed data
  const handleChange = (val: string, idx: number) => {
    if (/^[0-9]?$/.test(val)){
      const newValues = [...values];
      newValues[idx] = val;
      setValues(newValues);

      if (newValues.every((d) => d !== "")) {
        console.log(newValues);
      }
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      setResendCode("reset");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);


  return (
    <OtpLayout>
    <div className={styles.component}>
      { isMobile &&
        <button type="button" className={styles["back-btn"]} onClick={returnBack}>
          <IoArrowBack className={styles.arrow}/> 
        </button>
      }

      <div className={ styles.header }>

        <Header 
          title = "Verification Code"
          subtitle = "We send a 4-code to your email"
        />

      </div>   

      <form className={styles.form}>

        <div className={styles.code}>
          <input 
            type="text" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            maxLength={1} 
            className={styles["code-input"]}
            onChange={(e) => handleChange(e.target.value, 0)}
            value={values[0]}
          required/>
          <input 
            type="text" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            maxLength={1} 
            className={styles["code-input"]}
            onChange={(e) => handleChange(e.target.value, 1)}
            value={values[1]}
          required/>
          <input 
            type="text" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            maxLength={1} 
            className={styles["code-input"]}
            onChange={(e) => handleChange(e.target.value, 2)}
            value={values[2]}
          required/>
          <input 
            type="text" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            maxLength={1} 
            className={styles["code-input"]}
            onChange={(e) => handleChange(e.target.value, 3)}
            value={values[3]}
          required/>
        </div>
        
        <div className={styles["resend-timer"]}>
          <p data-form={resendCode ?? "wait"} className={styles.reset} onClick={() => {
            if (resendCode === "reset"){
              setOtp();
              setTimeLeft(30);
              setResendCode("wait");
            }
          }}>
            Resend Code
          </p>
          <p data-form={resendCode ?? "wait"} className={styles.timer}>in { timeLeft } seconds</p>
        </div>
      </form>
      <footer className={styles.footer}>

        <Button
          label = "Submit Code"
          type = "primary"
          onClick = { onSubmit }
        />

      </footer>
    </div>
    </OtpLayout>
  );
}

export default  OtpPage;
