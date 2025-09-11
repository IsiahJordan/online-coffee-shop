import styles from "./styles.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@/hooks/useSignIn";
import Header from "@/components/Header";
import Button from "@/components/Button";
import ALink from "@/components/ALink";
import Form from "@/components/Form";

function SignIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    await useSignIn(email, password, () => { navigate("/home"); });
  }

  return (
    <div className={ styles.component }>

      <Header 
        title = {["Welcome!", "Welcome to Yummies & Cream!", "Hello, Welcome!"]}
        subtitle = {["Proceed to your account", "Proceed to Login", "Proceed to your account"]}
      />

      <section className={ styles.content }>
      
        <Form 
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
          onClick = {(e) => navigate("?form=out", { replace: true })}
        />

        <Button
          label = "Create Account"
          type = "secondary"
          onClick = { onSubmit }
        />

      </footer>
    </div>
  );
}

export default SignIn;
