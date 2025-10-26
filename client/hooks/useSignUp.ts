import { SignUpProps } from "@/types/signup";
import { useLogger } from "@/hooks/useLogger";
import { postSearch } from "@/services/UserService";

export async function useSignUp ({ email, password, repassword, callback }: SignUpProps) { 
  const log = useLogger("useSignUp");
  log.debug(`email: ${ email }, password: ${ password }`);

  // Validated password
  if (password !== repassword){
    log.error("password doesn't match");
  }
  else{
    log.debug("verify account");

    // verify email
    const valid = await postSearch({ email: email });
    log.debug(`valid: ${ valid }`);
    
    if (valid.success){
      log.error("email exists");
    }
    else {
      log.debug("success");
      callback();
    }
  }
}
