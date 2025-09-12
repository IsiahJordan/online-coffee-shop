import styles from "./styles.module.css";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOtp } from "@/hooks/useOtp";
import { useSignUp } from "@/hooks/useSignUp";
import { useLogger } from "@/hooks/useLogger";

import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Header from "@/components/Header";
import Form from "@/components/Form";
import CheckBox from "@/components/CheckBox";

function SignUp(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { otpData, setOtpData } = useOtp();
  const log = useLogger("SignUp");
  log.debug("use signup page loading");

  const onSubmit = async (event) => {
    event.preventDefault();
    log.debug("submit user");
    
    if (isAgreeChecked !== true) {
      log.warn("aggree is not checked");
    }
    else {
      log.debug("verifying account");

      await useSignUp({
        email: email,
        password: password,
        repassword: repassword,
        callback: () => {
          log.debug("navigate to otp");

          setOtpData({ email: email, password: password });
          navigate("/sign?form=out&otp=1");
        }
      });
    }
  }

  log.debug("use signup page finish");
  return (
    <div className={styles.component}>

      <Header 
        title = {["Welcome!", "Welcome to Yummies & Cream!", "Nice to Meet You!"]}
        subtitle = {["Create account", "Create your account", "Create your accont"]}
      />

      <section className={styles.content}>

        <Form 
          names = { ["email", "password", "repassword"] }
          labels = { ["Email", "Password", "Re-Password"] }
          hints = { ["Enter Email", "Enter Password", "Enter Re-Password"] }
          types = { ["email", "password", "password"] }
          onChanges = { [setEmail, setPassword, setRepassword] }
        />
      
        <CheckBox
          name = "agree"
          label = "I agree with Terms & Conditions"
          onChange = { setIsAgreeChecked }
          onClick = { (e) => {} }
        />

      </section> 
      <footer className={styles.footer}>

        <Button
          label = "Sign Up"
          type = "primary"
          onClick = { onSubmit }
        />

        <Button
          label = "Proceed to Sign In"
          type = "secondary"
          onClick = {(e) => navigate("?form=in", { replace: true })}
        />

      </footer>
    </div>
  );
}

export default SignUp;

