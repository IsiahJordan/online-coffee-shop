import styles from "./styles.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { postLogin } from "@/services/UserService";
import { useNavigate } from "react-router-dom";

function SignIn(){
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isTablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });

  // For eye icon 
  const onShowClick = (event) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Data to be sent on api/users/login
    const newUser = {
      email: email,
      password: password
    };

    try {
      const res = await postLogin(newUser);
      console.log(res);
      navigate("/home");
    } catch (err) {
      console.error("Login Error", err);
    }
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
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <div className={styles["input-group"]}>
            <MdEmail className={styles["icon-left"]}/>
            <input 
                name="email" 
                type="email" 
                className={styles.input} 
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
            required/>
          </div>

          {/* Password input */}
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <div className={styles["input-group"]}>
            <RiLockPasswordFill className={styles["icon-left"]}/>
            <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                className={styles.input} 
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
            required/>
            { showPassword ? (
              <button className={styles["show-icon"]} onClick={onShowClick}>
                <FaRegEye className={styles["icon-right"]}/>
              </button>
            ):(
              <button className={styles["show-icon"]} onClick={onShowClick}>
                <FaRegEyeSlash className={styles["icon-right"]}/>
              </button>
            )}
          </div>
          <a className={styles.link} href="">Forget Password?</a>
        </form>
      </section> 
      <footer className={styles.footer}>
        <button className={styles["primary-btn"]} onClick={onSubmit}>Sign In</button>
        <button className={styles["secondary-btn"]} onClick={(e) => navigate("?form=out", { replace: true })}>Create Account</button>
      </footer>
    </div>
  );
}

export default SignIn;
