import AuthLayout from "./AuthLayout";
import StarReview from "@/components/StarReview";
import { SignProps } from "@/types/layout";

function SignLayout({ type, children } : SignProps) {
  let subtitle: string = "";
  let image: string = "";

  switch (type) {
    case "in":
      subtitle = '"Yummies & Cream is the best delicious cookies in the entire world" - Gordon Ramsey'
      image = "/coffee-signin.png"
      break;
    case "up":
      subtitle = "100,000+ users connected with Yummies & Cream, with a 4 rating reviews."
      image = "/coffee-signup.png"
      break;
  }

  return (
    <AuthLayout 
      heroExtras={
      <>
        <p className="review">
            { subtitle }
        </p>

        <StarReview count = { 4 }/>
        { image !== "" && 
          <img className="picture" src = { image } alt="yummies_hero_pic.png"/>
        }
      </>}
      formType = { type }
    >
      { children }
    </AuthLayout>
  );
}

export default SignLayout;
