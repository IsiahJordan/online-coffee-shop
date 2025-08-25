import api from './api';

export const postRegister = async (user: { email: string; password: string; }) => {
  const res = await api.post("/users/register", user);
  return res.data;
}; 

export const postLogin = async (user: { email: string; password: string; }) => {
  const res = await api.post("/users/login", user, { withCredentials: true });
  return res.data;
};

export const postSearch = async (user: { email: string }) => {
  const res = await api.post("/users/search", user);
  return res.data;
}

export const postLogout = async () => {
  const res = await api.post("/users/logout", {}, { withCredentials: true });
  return res.data;
}

export const postVerifyPassword = async (user: { email: string, password: string }) => {
  const res = await api.post("/users/password/verify", user);
  return res.data;
}

export const postUpdatePassword = async (user: { email: string, password: string }) => {
  const res = await api.post("/users/password/change", user);
  return res.data;
}
