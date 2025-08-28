import api from "./api";

// Thid is to generate temporary access
export async function postTempUser(users: { email: string }){
  const res = api.post("/users/temporary", users);
  return res.data;
}
