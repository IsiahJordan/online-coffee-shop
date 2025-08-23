import './styles.css';
import SignPage from '@/views/SignPage'; 
import ErrorPage from '@/views/ErrorPage';
import HomePage from '@/views/HomePage';
import OTP from '@/components/OTP';
import { Routes, Route } from 'react-router-dom';

function App() { 
  return (
    <>
      <Routes>
        <Route path="/sign" element={<SignPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default App;
