import { getListEntriesMyDrive } from "@/apis/drive/list-entries.api";
import { useSession } from "@/store/auth/session";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"

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