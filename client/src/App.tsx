import SignInPage from "@/views/SignInPage"; 
import SignUpPage from "@/views/SignUpPage"; 
import ErrorPage from "@/views/ErrorPage";
import HomePage from "@/views/HomePage";
import OtpPage from "@/views/OtpPage";
import ForgetPage from "@/views/ForgetPage";
import NewPasswordPage from "@/views/NewPasswordPage";

import { Routes, Route } from "react-router-dom";
import { OtpProvider } from "@/context/OtpContext";
import "./styles.css";

import SignInLayout from "@/layout/SignInLayout";
import SignUpLayout from "@/layout/SignUpLayout";
import OtpLayout from "@/layout/OtpLayout";
import NewPasswordLayout from "@/layout/NewPasswordLayout";
import ForgetLayout from "@/layout/ForgetLayout";
import SignLayout from "@/layout/SignLayout";

function App() { 
  return (
    <>
      <Routes>
        <Route path="/sign/in" element={
          <OtpProvider>
            <SignLayout 
              type = "in" 
            >
              <SignInPage/>
            </SignLayout>
          </OtpProvider>
        } />
        <Route path="/sign/up" element={
          <OtpProvider>
            <SignLayout 
              type = "up" 
            >
              <SignUpPage/>
            </SignLayout>
          </OtpProvider>
        } />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/otp" element={
          <OtpProvider>
            <OtpLayout>
              <OtpPage/>
            </OtpLayout>
          </OtpProvider>
        } />
        <Route path="/forget" element={
          <OtpProvider>
            <ForgetLayout>
              <ForgetPage/>
            </ForgetLayout>
          </OtpProvider>
        } />
        <Route path="/password/change" element={
          <OtpProvider>
            <NewPasswordLayout>
              <NewPasswordPage/>
            </NewPasswordLayout>
          </OtpProvider>
        } />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default App;
