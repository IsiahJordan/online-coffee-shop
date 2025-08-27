import styles from "./styles.module.css";
import { IoArrowBack } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { postTempUser } from "@/services/AuthService";
import { postSearch } from "@/services/UserService";
import OTP  from "@/components/OTP";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useOtp } from "@/hooks/useOtp";

function ForgetPage() {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const isTablet = useMediaQuery({ minWidth: 701, maxWidth: 1100 });
  const [email, setEmail] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { otpData, setOtpData } = useOtp();
  let isOtp = false;

  const returnBack = () => {
    navigate("/form?sign=in");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const account = await postSearch({ email: email });

    if (account.success){
      setOtpData({ email: email });
      const newParams = new URLSearchParams(searchParams);
      newParams.set("otp", "1");
      setSearchParams(newParams);
    }
    else {
      console.error("Account Doesn't Exist");
    }
  }

  if (searchParams.has("otp")){
    isOtp = true;
  }

  return (
    <div className={styles.page}>       
      { !isOtp ? (
      <>
        <button type="button" className={styles["back-btn"]} onClick={returnBack}>
          <IoArrowBack className={styles.arrow}/>
        </button>

        {/* Outer shell outside from form */}
        <header className={styles.header}>
          { isMobile ? (
            <>
              <h1 className={styles.title}> 
                Send Email
              </h1> 
              <p className={styles.description}>
                Input your email address and we will email the code
                to you.
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
            <div className={styles.code}>
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
            </div>

          </form>
        </section> 
        <footer className={styles.footer}>
          <button className={styles["primary-btn"]} onClick={onSubmit}>Confirm email</button>
        </footer>
      </>
      ) : (
      <>
        <OTP 
          onSuccess={async (data) => {
            postTempUser({ email: email });
            navigate("/password/change");
          }}
        />
      </>
      )}
    </div>
  );
}

export default ForgetPage;
