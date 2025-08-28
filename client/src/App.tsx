import './styles.css';
import SignPage from '@/views/SignPage'; 
import ErrorPage from '@/views/ErrorPage';
import HomePage from '@/views/HomePage';
import OTP from '@/components/OTP';
import ForgetPage from '@/views/ForgetPage';
import NewPasswordPage from '@/views/NewPasswordPage';
import { Routes, Route } from 'react-router-dom';
import { OtpProvider } from '@/hooks/useOtp';

function App() { 
  return (
    <>
      <Routes>
        <Route path="/sign" element={
          <OtpProvider>
            <SignPage/>
          </OtpProvider>
        } />
        <Route path="/home" element={<HomePage/>} />
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
