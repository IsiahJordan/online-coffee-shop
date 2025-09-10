import styles from "./styles.module.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@/hooks/useSignIn";
import InputBox from "@/components/InputBox";
import Button from "@/components/Button";

function SignIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isTablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });

  const onSubmit = async (event) => {
    event.preventDefault();

    await useSignIn(email, password, () => { navigate("/home"); });
  }

  return (
    <div className={styles.component}>

      {/* Design space unrelated to form */}
      <header className={styles.header}>
        { isMobile ? (
        <>
          <h1 className={styles.title}>
            Welcome!
          </h1> 
          <p className={styles.description}>
            Proceed to your account
          </p>
        </>
        ) : isTablet ? (
        <>
          <h1 className={styles.title}>
            Welcome to Yummies & Cream!
          </h1> 
          <p className={styles.description}>
            Proceed to Login
          </p>
        </>
        ) : (
          <>
            <h1 className={styles.title}>
              Hello, Welcome!
            </h1>
            <p className={styles.description}>
              Proceed to your account
            </p>
          </>
        )}

      </header>

      {/* Main form content */}
      <section className={styles.content}>
        <form className={styles.form}>
          
          <InputBox
            hint = "Enter Email"
            label = "Email"
            type = "email"
            onChange = { setEmail }
          />
          
          <InputBox
            hint = "Enter Password"
            label = "Password"
            type = "password"
            onChange = { setPassword }
          />
          
          <a className={styles.link} onClick={() => navigate("/forget")}>Forget Password?</a>
        </form>
      </section> 
      <footer className={styles.footer}>

        <Button
          label = "Sign In"
          type = "primary"
          onClick = {(e) => navigate("?form=out", { replace: true })}
        />

        <Button
          label = "Create Account"
          type = "secondary"
          onClick = {onSubmit}
        />

      </footer>
    </div>
  );
}

export default SignIn;
