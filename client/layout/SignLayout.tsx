import AuthLayout from "./AuthLayout";
import StarReview from "@/components/StarReview";
import { verifyViewport } from "@/utils/media"
import { SignProps } from "@/types/layout";

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
          <AuthLayout formType = { "out" } heroExtras = {
            image &&
            <img className="picture" src={ image } alt="yummies_hero_pic.png"/>
          }>
            { children }
          </AuthLayout>
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
    <AuthLayout 
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
    </AuthLayout>
  );
}

export default SignLayout;
