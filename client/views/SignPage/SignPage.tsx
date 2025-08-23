import styles from "./styles.module.css";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import StarReview from "@/components/StarReview";
import OTP from "@/components/OTP";
import { SignUpProvider } from "@/hooks/useSignUp";
import { postRegister } from "@/services/UserService";

function SignPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const isNotMobile = useMediaQuery({ minWidth: 701, minHeight: 760 });
  const isDesktop = useMediaQuery({ minWidth: 1101 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.has("form")){
      navigate("?form=in", { replace: true })
    }
  }, [searchParams, navigate]);

  let isSignIn = false;
  let isOTP = false;
  let formType = searchParams.get("form");
  if (formType === "in"){
    console.log("Login Set")
    isSignIn = true;
  }
  else if (formType !== "out"){
    console.error(`Not valid URI: ${formType}`)
    navigate("/error");
  }

  if (searchParams.has("otp")){
    isOTP = true;
  }

  return (
  <div data-form={formType ?? "in"} className={styles.page}>
    { isOTP ? (
      <></>
    ):(
      <div className={styles.hero}>
        <img className={styles.logo} src="/logo.svg" alt="yummies_cream_logo.svg"/>
        { isDesktop ? (
          <h1 className={styles.title}>Yummies & Cream</h1>
        ):(<></>)}
        <p className={styles.review}>"Yummies & Cream is the best delicious cookies in the entire world" - Gordon Ramsey</p>
        { isDesktop && isSignIn ? (
          <>
            <StarReview count={4}/>
            <img className={styles.picture} src="/coffee-signin.png" alt="yummies_hero_pic.png"/>
          </>
        ):(<></>)}
        { isNotMobile ? (
          <div className={styles.copyright}>
              @Copyright 2025 </div>
        ):(<></>)}
      </div>
    )}
    { isOTP ? (
      <div className={styles.otp}>
        <SignUpProvider>
          <OTP 
            onSuccess={async (data) => {
              await postRegister(data);
              navigate("/sign?form=in");
            }}
          />
        </SignUpProvider>
      </div>
    ) : (
      <div data-form={formType ?? "in"} className={styles.feature}>
        { isSignIn ? (
          <SignIn/>
        ):(
          <SignUpProvider>
            <SignUp/>
          </SignUpProvider>
        )}
      </div>
    )}
  </div>
  );
}

export default SignPage;
