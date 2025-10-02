import { useLogger } from "@/hooks/useLogger";
import { UserProps } from "@/types/signin";
import { postLogin } from "@/services/UserService";

export async function useSignIn({ email, password, onSuccess }: UserProps) {
  const log = useLogger("useSignIn");
  log.info(`user email: ${ email } and password: ${ password }`);

  try {
    log.debug("call postLogin");

    const res = await postLogin({ email: email, password: password });
    
    if (res.success) {
      onSuccess();
    }
  } catch (err) {
    log.error("failed to post login");
    
  }
  
  log.debug("end of post");
}

export function useSignOut() {

}
