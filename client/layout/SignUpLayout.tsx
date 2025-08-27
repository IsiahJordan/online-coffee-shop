import AuthLayout from "./AuthLayout.tsx";

function SignUpLayout({ children }){
  return (
    <AuthLayout 
      heroExtras={
        <>
          <p className="review">
            100,000+ users connected with
            Yummies & Cream, with a 4 rating reviews.
          </p>
          <img className="picture" src="/coffee-signup.png" alt="coffee-shop.png" />
        </>
      } 
      formType="out"
    >
      { children }
    </AuthLayout>
  );
}

export default SignUpLayout;
