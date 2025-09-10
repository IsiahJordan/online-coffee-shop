import { useLogger } from "@/hooks/useLogger";
import { UserProps } from "@/types/signin";
import { postLogin } from "@/services/UserService";

export async function useSignIn(user: UserProps) {
  const log = useLogger("useSignIn");
  log.debug(`user email: ${ user.email } and password: ${ user.password }`);

  try {
    log.debug("call postLogin");

    const res = await postLogin(newUser);
    
  } catch (err) {
    log.danger("failed to post login");
  }
  
  log.debug("end of post");
}

export function useSignOut() {

}
