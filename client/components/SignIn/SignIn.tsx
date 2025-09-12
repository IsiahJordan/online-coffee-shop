import styles from "./styles.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@/hooks/useSignIn";
import { useLogger } from "@/hooks/useLogger";

import Header from "@/components/Header";
import Button from "@/components/Button";
import ALink from "@/components/ALink";
import Form from "@/components/Form";

function SignIn(){
  const log = useLogger("SignIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  log.debug(`email: ${email}, password: ${password}`);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    await useSignIn(email, password, () => { navigate("/home"); });
  }
  
  return (
    <div className={ styles.component }>

      <Header 
        title = {["Welcome!", "Welcome to Yummies & Cream!", "Hello, Welcome!"]}
        subtitle = {["Proceed to your account", "Proceed to login", "Proceed to your account"]}
      />

      <section className={ styles.content }>
      
        <Form 
          names = { ["email", "password"] }
          labels = { ["Email", "Password"] }
          hints = { ["Enter Email", "Enter Password"] }
          types = { ["email", "password"] }
          onChanges = { [setEmail, setPassword] }
        />
  
        <ALink
          label = "Forget Password?"
          onClick = {() => navigate("/forget")}
        />

      </section> 
      <footer className={ styles.footer }>

        <Button
          label = "Sign In"
          type = "primary"
          onClick = { onSubmit }
        />

        <Button
          label = "Create Account"
          type = "secondary"
          onClick = {(e) => navigate("?form=out", { replace: true })}
        />

      </footer>
    </div>
  );
}

export default SignIn;
