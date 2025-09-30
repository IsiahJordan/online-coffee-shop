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
            <SignLayout 
              name = "otp"
              type = "none" 
            >
              <OtpPage/>
            </SignLayout>
          </OtpProvider>
        } />
        <Route path="/forget" element={
          <OtpProvider>
            <SignLayout 
              name = "forget"
              type = "none" 
            >
              <ForgetPage/>
            </SignLayout>
          </OtpProvider>
        } />
        <Route path="/password/change" element={
          <OtpProvider>
            <SignLayout 
              name = "forget"
              type = "none" 
            >
              <NewPasswordPage/>
            </SignLayout>
          </OtpProvider>
        } />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default App;
