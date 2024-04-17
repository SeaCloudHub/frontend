import { api } from "@/helpers/http/config.http";
import { CopyFileREQ } from "./request/copy.request";
import { BaseResponse } from "@/utils/types/api-base-response.type";
import { EntryRESP } from "./response/entry.response";

export const copyFiles = async (body: CopyFileREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/copy`, body);
  return res.data;
}
