import api from "./api";
import { useLogger } from "@/hooks/useLogger";

export const postRegister = async (user: { email: string; password: string; }) => {
  const log = useLogger("postRegister");
  log.debug(`post email: ${ user.email } and ${ user.password }`);

  const res = await api.post("/users/register", user);

  return res.data;
}; 

export const postLogin = async (user: { email: string; password: string; }) => {
  const log = useLogger("postLogin");
  log.debug(`post email: ${ user.email } and ${ user.password }`);

  const res = await api.post("/users/login", user, { withCredentials: true });

  return res.data;
};

export const postSearch = async (user: { email: string }) => {
  const log = useLogger("postSearch");
  log.debug(`post email: ${ user.email }`);

  const res = await api.post("/users/search", user);
  
  log.info("finish");
  return res.data;
}

export const postLogout = async () => {
  const log = useLogger("postLogout");
  log.debug(`logout user`);

  const res = await api.post("/users/logout", {}, { withCredentials: true });

  return res.data;
}

export const postVerifyPassword = async (user: { email: string, password: string }) => {
  const log = useLogger("postVerifyPassword");
  log.debug(`post email: ${ user.email } and password: ${ user.password }`);

  const res = await api.post("/users/password/verify", user);

  return res.data;
}

export const postUpdatePassword = async (user: { email: string, password: string }) => {
  const log = useLogger("postUpdatePassword");
  log.debug(`post email: ${ user.email } and password: ${ user.password }`);

  const res = await api.post("/users/password/change", user);

  return res.data;
}
