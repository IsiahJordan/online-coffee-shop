import Logger from "@/utils/log";

export function useLogger(context: string): Logger {
  return Logger.getInstance().withContext(context);
}
