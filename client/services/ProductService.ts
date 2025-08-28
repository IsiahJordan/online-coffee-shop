import api from "./api";

export async function postProduct(entry : { limit: number }){
  const res = await api.post("/products/list", entry, {
    withCredentials: true
  });
  return res.data;
}
