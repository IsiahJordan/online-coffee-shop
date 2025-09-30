import styles from "./styles.module.css";

import { useState, useEffect, useContext } from "react";
import { postSearch } from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import { OtpContext } from "@/context/OtpContext";
import { postVerifyPassword, postUpdatePassword } from "@/services/UserService";
import { useLogger } from "@/hooks/useLogger";

import NewPasswordLayout from "@/layout/NewPasswordLayout";
import Button from "@/components/Button";
import Header from "@/components/Header";
import InputBox from "@/components/InputBox";
import Form from "@/components/Form";

function NewPasswordPage(){
  const [showPassword, setShowPassword] = useState([false, false]);
  const [newPassword, setNewPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const navigate = useNavigate();
  const log = useLogger();

  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("OtpPage must be used within OtpProvider");
  }
  const { otpData, setOtpData } = context;

  /*
  if (!otpData.email){
    console.error("Error no email");
    navigate("/sign/in");
  }*/

  const onShowClick = (event, index) => {
    event.preventDefault();
    setShowPassword((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validated password
    if (newPassword !== repassword){
      log.error("Error: Password Doesn't Match");
    }
    else{
      log.debug(otpData.email);
      log.debug(newPassword);
      const userNewPassword = {
        email: otpData.email,
        password: newPassword
      }

      await postUpdatePassword(userNewPassword);

      navigate("/sign/in");
    }
  }

  return (
    <NewPasswordLayout>
      <div className={ styles.page }>

        <Header 
          title = "Send Email"  
          subtitle = "Enter The New Password"
        />

        <section className={ styles.content }>
          <div className={ styles.form }>

            <Form 
              names = { ["password", "repassword"] }
              labels = { ["New Password", "New Re-Password"] }
              hints = { ["Enter New Password", "Enter New Re-Password"] }
              types = { ["password", "password"] }
              onChanges = { [setNewPassword, setRePassword] }
            />

            <hr/>

            <Button
              label = "Change Password"
              type = "primary"
              onClick = { onSubmit }
            />
            
            <Button
              label = "Return to Sign In"
              type = "secondary"
              onClick = {(e) => navigate("/sign/in")}
            />

          </div>
        </section> 
      </div>
    </NewPasswordLayout>
  );
}

export default NewPasswordPage;
