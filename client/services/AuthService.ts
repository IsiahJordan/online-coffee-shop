import api from "./api";
import { useLogger } from "@/hooks/useLogger";

// Thid is to generate temporary access
export async function postTempUser(user: { email: string }){
  const log = useLogger("postTempUser");
  log.debug(`user email: ${ user.email }`);

  const res = api.post("/users/temporary", user);

  return res.data;
}
