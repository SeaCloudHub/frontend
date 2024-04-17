import { copyFiles } from "@/apis/drive/copy-files.api";
import { getListEntriesMyDrive } from "@/apis/drive/list-entries.api";
import { CopyFileREQ } from "@/apis/drive/request/copy.request";
import { useSession } from "@/store/auth/session";
import { toastError } from "@/utils/toast-options/toast-options";
import { ApiGenericError } from "@/utils/types/api-generic-error.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";

export const useListEntries = () => {
  const {dirId} = useParams();
  const {root_id} = useSession();
  const id = dirId || root_id;

  const {data, error, refetch } = useQuery({
    queryKey: ['mydrive-entries', id],
    queryFn: async () => {
      return (
        await getListEntriesMyDrive({ id, limit: 100 }).then((res) => res?.data?.entries || [])
      ).filter((e) => !e.name.includes('.trash'))
    },
    staleTime: 10 * 1000,
  })
  
  return {data: data||[], error, refetch}
}

export const useCopyMutation = ()=> {
  const queryClient = useQueryClient();

  return  useMutation({
    mutationFn: (body: CopyFileREQ) => {
      return copyFiles(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success('Created ' + (data.data.length > 1 ? `${data.data.length} files` : `${data.data[0].name}`));
      queryClient.invalidateQueries({queryKey: ['mydrive-entries']});
    },
  });
}