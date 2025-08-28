/* 
 *  This is for overlapping
 *  styles within sign in and 
 *  sign up pages
 *
 * */
import "./auth.css";
import { useMediaQuery } from "react-responsive";

function AuthLayout({ children, heroExtras, formType }){
  const isNotMobile = useMediaQuery({ minWidth: 701, minHeight: 760 });
  const isDesktop = useMediaQuery({ minWidth: 1101 });
  
  return (
    <div data-form={formType ?? "in"} className="page">
      <div className="hero">
        <img className="logo" src="/logo.svg" alt="yummies_cream_logo.svg"/>
        { isDesktop && <h1 className="title">Yummies & Cream</h1> }
        { isDesktop && heroExtras }
        { isNotMobile && <div className="copyright">@Copyright 2025</div> }

        </div>  
      <div data-form={formType ?? "in"} className="feature">
        { children }
      </div>
    </div>
  ); 
}

export default AuthLayout;
