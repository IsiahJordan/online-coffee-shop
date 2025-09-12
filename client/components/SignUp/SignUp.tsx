import styles from "./styles.module.css";
import { useState } from "react";
import { postSearch } from "@/services/UserService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOtp } from "@/hooks/useOtp";

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

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validated password
    if (password !== repassword){
      console.error("Error: Password Doesn't Match");
    }
    else if (isAgreeChecked === false){
      console.error("Error: Agreement Isn't Accepted");
    }
    else{
      // Pass data to server
      const newUser = {
        email: email,
        password: password
      };

      // verify email
      const valid = await postSearch({ email: email });
      const exist = Object.keys(valid.data).length;
      
      if (valid.success && exist > 0){
        console.error("Error: Email Exists");
      }
      else {
        setOtpData({ email, password });
        navigate("/sign?form=out&otp=1");
      }

    }
  }

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

