import api from "./api";

export const generateOtp = async (entry : { email: string; }) => {
  const res = await api.post("otp/create", entry);
  return res.data;
};

export const verifyOtp = async (entries: { email: string; code: string }) => {
  const res = await api.post("otp/verify", entries);
  return res.data;
}

// Change used otp to true after success
export const notifyOtp = async (entry: { email: string; }) => {
  const res = await api.post("otp/success", entry);
  return res.data;
}
