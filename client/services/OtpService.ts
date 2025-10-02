import api from "./api";
import { useLogger } from "@/hooks/useLogger";

export const generateOtp = async (entry : { email: string; }) => {
  const log = useLogger("generateOtp");
  log.info(`entry email: ${ entry.email }`);

  const res = await api.post("otp/create", entry);

  return res.data;
};

export const verifyOtp = async (entry: { email: string; code: string }) => {
  const log = useLogger("verifyOtp");
  log.debug(`entry email: ${ entry.email } and code: ${ entry.code }`);

  const res = await api.post("otp/verify", entry);

  return res.data;
}

// Change used otp to true after success
export const notifyOtp = async (entry: { email: string; }) => {
  const log = useLogger("notifyOtp");
  log.debug(`entry email: ${ entry.email }`);

  const res = await api.post("otp/success", entry);

  return res.data;
}

export const emailUser = async (entry: { email: string, code: string }) => {
  const log = useLogger("emailUser");
  log.debug(`entry email: ${ entry.email } and code ${ entry.code }`);

  const message = {
    email: entry.email,
    msg: `This your otp code ${entry.code}`
  }
  
  log.debug(`message content email: ${ message.email } and msg: ${ message.msg }`);
  const res = await api.post("otp/email", message);

  return res.data;
}
