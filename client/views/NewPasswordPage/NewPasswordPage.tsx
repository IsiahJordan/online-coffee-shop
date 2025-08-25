import styles from "./styles.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { postSearch } from "@/services/UserService";
import { FaRegEye } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { postVerifyPassword, postUpdatePassword } from "@/services/UserService";

function NewPasswordPage(){
  const [showPassword, setShowPassword] = useState([false, false, false]);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isTablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });

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
      console.error("Error: Password Doesn't Match");
    }
    else if (isAgreeChecked === false){
      console.error("Error: Agreement Isn't Accepted");
    }
    else{
      // Pass data to server
      const userOldPassword = {
        email: email,
        password: oldPassword
      };

      const userNewPassword = {
        email: email,
        password: newPassword
      }

      // Verify valid old password
      const valid = await postVerifyPassword(userOldPassword);
      
      if (valid.success){
        postUpdatePassword(userNewPassword);
      }
    }
  }

  return (
    <div className={styles.page}>
      {/* Outer shell outside from form */}
      <header className={styles.header}>
        { isMobile ? (
          <>
            <h1 className={styles.title}> 
              New Password
            </h1> 
            <p className={styles.description}>
              Enter The New Password
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

          {/* Password */}
          <label className={styles.label} htmlFor="password">
            Old Password
          </label>
          <div className={styles["input-group"]}>
            <RiLockPasswordFill className={styles["icon-left"]}/>
            <input 
                name="password" 
                type={showPassword[0] ? "text" : "password"} 
                className={styles.input} 
                placeholder="Enter Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
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

          <label className={styles.label} htmlFor="password">
            New Password
          </label>
          <div className={styles["input-group"]}>
            <RiLockPasswordFill className={styles["icon-left"]}/>
            <input 
                name="repassword" 
                type={showPassword[1] ? "text" : "password"} 
                className={styles.input} 
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
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
          <label className={styles.label} htmlFor="password">
            New Re-Password
          </label>
          <div className={styles["input-group"]}>
            <RiLockPasswordFill className={styles["icon-left"]}/>
            <input 
                name="repassword" 
                type={showPassword[2] ? "text" : "password"} 
                className={styles.input} 
                placeholder="Enter New Re-Password"
                onChange={(e) => setRepassword(e.target.value)}
            required/>
            { showPassword[2] ? (
              <button className={styles["show-icon"]} onClick={(e) => onShowClick(e, 2)}>
                <FaRegEye className={styles["icon-right"]}/>
              </button>
            ):(
              <button className={styles["show-icon"]} onClick={(e) => onShowClick(e, 2)}>
                <FaRegEyeSlash className={styles["icon-right"]}/>
              </button>
            )}
          </div>
        </form>
      </section> 
      <footer className={styles.footer}>
        <button className={styles["primary-btn"]} onClick={onSubmit}>Change Password</button>
      </footer>
    </div>
  );
}

export default NewPasswordPage;
