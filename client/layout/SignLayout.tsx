import StarReview from "@/components/StarReview";
import { verifyViewport } from "@/utils/media"
import { SignProps } from "@/types/layout";
import "./sign.css";

/* 
 *  This is for overlapping
 *  styles within sign in and 
 *  sign up pages
 *
 * */
function ParentLayout({ children, heroExtras, formType }){
  let is_mobile = false, is_desktop = false;
  verifyViewport({
    onMobile: () => { is_mobile = true; is_desktop = false; },
    onTablet: () => { is_mobile = false; is_desktop = false; },
    onDesktop: () => { is_desktop = true; is_mobile = false; }
  });
  
  return (
    <div data-form={formType ?? "in"} className="page">
      <div className="hero">
        <img className="logo" src="/logo.svg" alt="yummies_cream_logo.svg"/>
        { is_desktop && <h1 className="title">Yummies & Cream</h1> }
        { is_desktop && heroExtras }
        { !is_mobile && <div className="copyright">@Copyright 2025</div> }

        </div>  
      <div data-form={formType ?? "in"} className="feature">
        { children }
      </div>
    </div>
  ); 
}

function SignLayout({ name, type, children } : SignProps) {
  let subtitle: string = "";
  let image: string = "";
  let is_mobile: bool = false;
  
  verifyViewport({
    onMobile: () => { is_mobile = true },
    onTablet: () => { },
    onDesktop: () => { }
  });

  switch (type) {
    case "in":
      subtitle = '"Yummies & Cream is the best delicious cookies in the entire world" - Gordon Ramsey'
      image = "/coffee-signin.png"
      break;
    case "up":
      subtitle = "100,000+ users connected with Yummies & Cream, with a 4 rating reviews."
      image = "/coffee-signup.png"
      break;
    default:
      image = "/coffee-signin.png";
      if (!is_mobile) {
        return (
          <ParentLayout formType = { "up" } heroExtras = {
            image &&
            <img className="picture" src={ image } alt="yummies_hero_pic.png"/>
          }>
            { children }
          </ParentLayout>
        );
      }
      else {

        return (
          <div className = { name }>
            { children }
          </div>
        );
      }
  }

  return (
    <ParentLayout 
      heroExtras={
      <>
        <p className="review">
            { subtitle }
        </p>

        <StarReview count={ 4 }/>
        { image !== "" && 
          <img className="picture" src={ image } alt="yummies_hero_pic.png"/>
        }
      </>}
      formType = { type }
    >
      { children }
    </ParentLayout>
  );
}

export default SignLayout;
