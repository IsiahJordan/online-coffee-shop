import styles from "./styles.module.css";
import { OtpContext } from "@/context/OtpContext";

import { useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignUp } from "@/hooks/useSignUp";
import { useLogger } from "@/hooks/useLogger";
import { postRegister } from "@/services/UserService";

import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Header from "@/components/Header";
import Form from "@/components/Form";
import CheckBox from "@/components/CheckBox";

function SignUpPage() {
  const log = useLogger("SignUp");
  log.debug("use signup page loading");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const navigate = useNavigate();

  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("OtpPage must be used within OtpProvider");
  }
  const { otpData, setOtpData } = context;

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
        repassword: rePassword,
        callback: () => {
          log.debug("navigate to otp");

          setOtpData({ 
            email: email, 
            password: password,
            onSuccess: async () => {
              await postRegister({ email: otpData.email, password: otpData.password });
              navigate("/sign/in");
            }
          });
          navigate("/otp");
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
          values = { [email, password, rePassword ] }
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
          onClick = {(e) => navigate("/sign/in")}
        />

      </footer>
    </div>
  );
}

export default SignUpPage;
