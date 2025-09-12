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
    const exist = Object.keys(valid.data).length;
    log.debug(`valid: ${ valid }, exist: ${ exist }`);
    
    if (valid.success && exist > 0){
      log.error("email exists");
    }
    else {
      log.debug("success");
      callback();
    }
  }
}
