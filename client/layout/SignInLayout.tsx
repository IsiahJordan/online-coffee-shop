import AuthLayout from "./AuthLayout";
import StarReview from "@/components/StarReview";

function SignInLayout({ children }){
  return (
    <AuthLayout 
      heroExtras={
      <>
        <p className="review">
          "Yummies & Cream is the best delicious cookies in the entire world" - Gordon Ramsey
        </p>

        <StarReview count={4}/>
        <img className="picture" src="/coffee-signin.png" alt="yummies_hero_pic.png"/>
      </>}
      formType="in"
    >
      { children }
    </AuthLayout>
  );
}

export default SignInLayout;
