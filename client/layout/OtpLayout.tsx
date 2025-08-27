import AuthLayout from "./AuthLayout";
import { useMediaQuery } from "react-responsive";

function OtpLayout({ children }){
  const isMobile = useMediaQuery({ maxWidth: 700 });
  
  if (isMobile){
    return (
      <div className="otp">
        { children }
      </div>
    );
  }

  return (
    <AuthLayout formType="out" heroExtras={null}>
      { children }
    </AuthLayout>
  );
}

export default OtpLayout;
