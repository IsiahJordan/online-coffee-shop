import api from "./api";
import { useLogger } from "@/hooks/useLogger";

// This is to generate temporary access
export async function postTempUser(user: { email: string }) {
  const log = useLogger("postTempUser");
  log.info(`user email: ${ user.email }`);

  const res = api.post("/users/temporary", user);

  return res.data;
}

export async function postAuthUser(role: string ) {
  const log = useLogger("getAuthUser");
  log.info("called");

  const res = await api.post("/users/authorize", { role }, { 
    withCredentials: true
  });

  return res.data;
}
