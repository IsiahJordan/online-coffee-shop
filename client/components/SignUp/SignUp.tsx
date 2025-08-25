import styles from "./styles.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { postSearch } from "@/services/UserService";
import { FaRegEye } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useOtp } from "@/hooks/useOtp";

function SignUp(){
  const [showPassword, setShowPassword] = useState([false, false]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isTablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });
  const [searchParams, setSearchParams] = useSearchParams();
  const { otpData, setOtpData } = useOtp();

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
      
      if (exist){
        console.error("Error: Email Exists");
      }
      else {
        setOtpData({ email, password });

        // transfer to OTP
        const newParams = new URLSearchParams(searchParams);
        newParams.set("otp", "1");
        setSearchParams(newParams);
      }

    }
  }

  return (
    <div className={styles.component}>
      {/* Outer shell outside from form */}
      <header className={styles.header}>
        { isMobile ? (
          <>
            <h1 className={styles.title}> 
              Welcome!
            </h1> 
            <p className={styles.description}>
              Create Account
            </p>
          </>
        ): isTablet ? (
          <>
            <h1 className={styles.title}> 
              Welcome to Yummies & Cream!
            </h1> 
            <p className={styles.description}>
              Create your Account
            </p>
          </>
        ): (
          <>
            <h1 className={styles.title}>
              Nice to Meet You!
            </h1>
            <p className={styles.description}>
              Create your account
            </p>
          </>
        )}
      </header>   

      {/* Main form conent */}
      <section className={styles.content}>
        <form className={styles.form}>

          {/* Input contents */}
          {/* Email */}
          <label className={styles.label} htmlFor="email">
            Email
          </label>

          {/* Password */}
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
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <div className={styles["input-group"]}>
            <RiLockPasswordFill className={styles["icon-left"]}/>
            <input 
                name="password" 
                type={showPassword[0] ? "text" : "password"} 
                className={styles.input} 
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
            required/>

            {/* Show password icon based on showPassword state */}
            { showPassword[0] ? (
              <button className={styles["show-icon"]} onClick={(e) => onShowClick(e, 0)}>
                <FaRegEye className={styles["icon-right"]}/>
              </button>
            ):(
              <button className={styles["show-icon"]} onClick={(e) => onShowClick(e, 0)}>
                <FaRegEyeSlash className={styles["icon-right"]}/>
              </button>
            )}
          </div>

          {/* Re-Password */}
          <label className={styles.label} htmlFor="password">
            Re-Password
          </label>
          <div className={styles["input-group"]}>
            <RiLockPasswordFill className={styles["icon-left"]}/>
            <input 
                name="repassword" 
                type={showPassword[1] ? "text" : "password"} 
                className={styles.input} 
                placeholder="Enter Re-Password"
                onChange={(e) => setRepassword(e.target.value)}
            required/>
            { showPassword[1] ? (
              <button className={styles["show-icon"]} onClick={(e) => onShowClick(e, 1)}>
                <FaRegEye className={styles["icon-right"]}/>
              </button>
            ):(
              <button className={styles["show-icon"]} onClick={(e) => onShowClick(e, 1)}>
                <FaRegEyeSlash className={styles["icon-right"]}/>
              </button>
            )}
          </div>
          <div className={styles.terms}>
              <input type="checkbox" name="agree-box" onChange={(e) => setIsAgreeChecked(e.target.checked)}/>
              I agree with Terms & Conditions
          </div>
        </form>
      </section> 
      <footer className={styles.footer}>
        <button className={styles["primary-btn"]} onClick={onSubmit}>Sign Up</button>
        <button className={styles["secondary-btn"]} onClick={(e) => {navigate("?form=in", { replace: true })}}>Proceed to Sign In</button> 
      </footer>
    </div>
  );
}

export default SignUp;

