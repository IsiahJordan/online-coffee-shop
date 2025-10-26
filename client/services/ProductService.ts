import api from "./api";
import { useLogger } from "@/hooks/useLogger";

export async function postProduct(entry : { limit: number }){
  const log = useLogger("postProduct");
  log.debug(`entry limit: ${ entry.limit }`);

  const res = await api.post("/products/list", entry, {
    withCredentials: true
  });

  return res.data;
}
