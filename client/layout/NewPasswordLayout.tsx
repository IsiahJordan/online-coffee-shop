import SignUpLayout from "./SignUpLayout";
import { useMediaQuery } from "react-responsive";
import "./auth.css";

function NewPasswordLayout({ children }){
  const isMobile = useMediaQuery({ maxWidth: 700 });

  if (isMobile){
    return <div className="forget">{children}</div>;
  }

  return (
    <SignUpLayout>
      { children }
    </SignUpLayout>
  );
}

export default NewPasswordLayout;


