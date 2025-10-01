import { ResendCodeType } from "@/types/resendcode";
import { useState, useEffect } from "react";

function ResendCode({ text, limit, styles, callback }: ResendCodeType){
  const [timeLeft, setTimeLeft] = useState(limit);
  const [resendCode, setResendCode] = useState("wait");

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
    <div className = { styles["resend-timer"] }>
      <p data-form = { resendCode ?? "wait" } className = { styles["reset"] } onClick = {() => {
        if (resendCode === "reset"){
          callback();
          setTimeLeft(limit);
          setResendCode("wait");
        }
      }} data-testid="resend-btn">
        { text }
      </p>
      <p 
        data-form = { resendCode ?? "wait" } 
        className = { styles["timer"] } 
        data-testid="resend-text">
          in { timeLeft } seconds
      </p>
    </div>
  );
}

export default ResendCode;
