import "./SignInStyles.css";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import StarReview from "@/components/StarReview";

function SignInLayout({ children }){
  let [searchParams, setSearchParams] = useSearchParams();
  const isNotMobile = useMediaQuery({ minWidth: 701, minHeight: 760 });
  const isDesktop = useMediaQuery({ minWidth: 1101 });

  useEffect(() => {
    let formType = searchParams.get("form");
    if (formType === "in"){
      console.log("Login Set")
      isSignIn = true;
    }
    else if (formType !== "out"){
      console.error(`Not valid URI: ${formType}`)
      navigate("/error");
    }
  })

  return (
  <div data-form={formType ?? "in"} className={styles.page}>
    <div className={styles.hero}>
      <img className={styles.logo} src="/logo.svg" alt="yummies_cream_logo.svg"/>
      { isDesktop ? (
        <h1 className={styles.title}>Yummies & Cream</h1>
      ):(
        <></>
      )}
      <p className={styles.review}>"Yummies & Cream is the best delicious cookies in the entire world" - Gordon Ramsey</p>
      { isDesktop && isSignIn ? (
        <>
          <StarReview count={4}/>
          <img className={styles.picture} src="/coffee-signin.png" alt="yummies_hero_pic.png"/>
        </>
      ):(
        <></>
      )}
      { isNotMobile ? (
        <div className={styles.copyright}>
          @Copyright 2025 
        </div>
        ):
        (
          <></>
        )
      }
    </div>
    { children }
  </div>
  );
}

export default SignInLayout;
