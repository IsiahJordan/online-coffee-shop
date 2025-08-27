import { IoArrowBack } from "react-icons/io5";
import styles from "./styles.module.css";
import { useMediaQuery } from "react-responsive";
import { generateOtp, verifyOtp, notifyOtp, emailUser } from "@/services/OtpService";
import { useNavigate, useLocation } from "react-router-dom";
import { useOtp } from "@/hooks/useOtp";
import { useState, useEffect } from "react";

interface VerifyOtpProps {
  onSuccess?: (data: { email: string; }) => void | Promise<void>;
};

function OTP({ onSuccess }: VerifyOtpProps){
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isTablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });
  const [resendCode, setResendCode] = useState("wait");
  const [values, setValues] = useState(Array(4).fill(""));
  const [timeLeft, setTimeLeft] = useState(30);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { otpData, setOtpData } = useOtp();
  
  const returnBack = () => {
    params.delete("otp");

    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };

  // Verify valid entry to OTP 
  if ( otpData.email === ""){
    returnBack();
  }

  // Set or Reset OTP  
  async function setOtp(){
    const res = await generateOtp({ email: otpData.email });
    await emailUser({ email: otpData.email, code: res.otp_code });
  }

  useEffect(() => {
    setOtp();
  }, []);


  const onSubmit = async (event) => {
    event.preventDefault();
    
    const code = values.join(""); 
    
    try {
      const res = await verifyOtp({ email: otpData.email , code: code });
      console.log(res);

      if (!res.succeess && res.action === "return"){
        console.log("Absolute Failure");
        params.delete("otp");
      }
      else if (!res.success){
        console.log("try again");
      }
      else {
        console.log("Very Successful")
        await notifyOtp({ email: otpData.email }); // Notify successful otp

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

  // Creates timer in 30 seconds and rerenders the page
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
    <div className={styles.component}>
      <button type="button" className={styles["back-btn"]} onClick={returnBack}>
        <IoArrowBack className={styles.arrow}/>
      </button>

      {/* Outer shell outside from form */}
      <header className={styles.header}>
        { isMobile ? (
          <>
            <h1 className={styles.title}> 
              Verification Code
            </h1> 
            <p className={styles.description}>
              We send a 4-code to your email
            </p>
          </>
        ): isTablet ? (
          <>
            <h1 className={styles.title}> 
              Welcome to Yummies & Cream!
            </h1> 
            <p className={styles.description}>
              Create your Account
            </p>
          </>
        ): (
          <>
            <h1 className={styles.title}>
              Nice to Meet You!
            </h1>
            <p className={styles.description}>
              Create your account
            </p>
          </>
        )}
      </header>   

      {/* Main form conent */}
      <section className={styles.content}>
        <form className={styles.form}>

          {/* Input contents */}
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
            <p data-form={resendCode ?? "wait"} className={styles.reset} onClink={setOtp}>Resend Code</p>
            <p data-form={resendCode ?? "wait"} className={styles.timer}>in { timeLeft } seconds</p>
          </div>
        </form>
      </section> 
      <footer className={styles.footer}>
        <button className={styles["primary-btn"]} onClick={onSubmit}>Submit Code</button>
      </footer>
    </div>
  );
}

export default OTP;
