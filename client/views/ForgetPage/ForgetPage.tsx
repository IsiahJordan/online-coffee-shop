import styles from "./styles.module.css";

import { postTempUser } from "@/services/AuthService";
import { postSearch } from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { verifyViewport } from "@/utils/media";
import { OtpContext } from "@/context/OtpContext";
import { useLogger } from "@/hooks/useLogger";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputBox from "@/components/InputBox";
import BackIcon from "@/components/BackIcon";
import Form from "@/components/Form";

function ForgetPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const log = useLogger();
  
  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("OtpPage must be used within OtpProvider");
  }
  const { otpData, setOtpData } = context;

  let is_mobile = false;
  verifyViewport({
    onMobile: () => { is_mobile = true; },
    onTablet: () => {},
    onDesktop: () => {}
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const account = await postSearch({ email: email });

    if (account.success){
      setOtpData({ email: email, onSuccess: async () => {
        postTempUser({ email: email });
        navigate("/password/change");
      }});
      navigate("/otp");
    }
    else {
      log.error("Account Doesn't Exist");
    }
  }

  return (
      <div className={ styles.page }>

          <BackIcon
              styles = { styles }
              callback = { () => navigate(-1) }
          />

          <header className={ styles.header }>
            <Header 
              title = "Send Email"  
            />
            <p className={styles.description}>
              Input your email address and we will email the code
              to you.
            </p>
          </header>   

          <section className={ styles.content }>
            <div className={ styles.form }>

              <Form 
                names = { ["email"] }
                labels = { ["Email"] }
                hints = { ["Enter Email"] }
                types = { ["email"] }
                values = { [email] }
                onChanges = { [setEmail] }
              />
              
              <hr/>
          
              <Button
                label = "Confirm Email"
                type = "primary"
                onClick = { onSubmit }
              />
              
              { !is_mobile &&
                (
                  <Button
                    label = "Return to Sign In"
                    type = "secondary"
                    onClick = {(e) => navigate(-1)}
                  />
                )
              }

            </div>
          </section> 
      </div>
  );
}

export default ForgetPage;
