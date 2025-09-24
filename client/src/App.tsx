import "./styles.css";
import SignInPage from "@/views/SignInPage"; 
import SignUpPage from "@/views/SignUpPage"; 
import ErrorPage from "@/views/ErrorPage";
import HomePage from "@/views/HomePage";
import ForgetPage from "@/views/ForgetPage";
import NewPasswordPage from "@/views/NewPasswordPage";
import { Routes, Route } from "react-router-dom";
import { OtpProvider } from "@/context/OtpContext";
import SignInLayout from "@/layout/SignInLayout";
import SignUpLayout from "@/layout/SignUpLayout";
import OtpPage from "@/views/OtpPage";

function App() { 
  return (
    <>
      <Routes>
        <Route path="/sign/in" element={
          <OtpProvider>
            <SignInLayout>
              <SignInPage/>
            </SignInLayout>
          </OtpProvider>
        } />
        <Route path="/sign/up" element={
          <OtpProvider>
            <SignUpLayout>
              <SignUpPage/>
            </SignUpLayout>
          </OtpProvider>
        } />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/otp" element={
          <OtpProvider>
            <OtpPage/>
          </OtpProvider>
        } />
        <Route path="/forget" element={
          <OtpProvider>
            <ForgetPage/>
          </OtpProvider>
        } />
        <Route path="/password/change" element={
          <OtpProvider>
            <NewPasswordPage/>
          </OtpProvider>
        } />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default App;
