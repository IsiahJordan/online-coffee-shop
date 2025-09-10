import styles from "./styles.module.css";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Otp from "@/components/Otp";
import { OtpProvider } from "@/hooks/useOtp";
import { postRegister } from "@/services/UserService";
import SignInLayout from "@/layout/SignInLayout";
import SignUpLayout from "@/layout/SignUpLayout";
import OtpLayout from "@/layout/OtpLayout";

function SignPage() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.has("form")){
      navigate("?form=in", { replace: true })
    }
  }, [searchParams, navigate]);

  let formType = searchParams.get("form");
  let isSignIn = formType === "in";
  let isOtp = searchParams.has("otp");

  if (formType !== "out" && formType !== "in"){
    navigate("/error");
    return null;
  }

  return (
    <OtpProvider>   
      {isOtp ? (
        <OtpLayout>
          <Otp
            onSuccess={async (data) => {
              await postRegister(data);
              navigate("/sign?form=in");
            }}
          />
        </OtpLayout>
      ) : isSignIn ? (
        <SignInLayout>
          <SignIn />
        </SignInLayout>
      ) : (
        <SignUpLayout>
          <SignUp />
        </SignUpLayout>
      )}
    </OtpProvider>
  );
}

export default SignPage;
