import { changePasswordApi, getProfileApi } from "@/apis/auth/auth.api";
import { AuthChangePasswordREQ } from "@/apis/auth/request/change-password.request";
import { useSession } from "@/store/auth/session";
import { toastError } from "@/utils/toast-options/toast-options";
import { ApiGenericError } from "@/utils/types/api-generic-error.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useChangePasswordMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (body: AuthChangePasswordREQ) => {
      return changePasswordApi({ old_password: body.old_password, new_password: body.new_password});
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      toast.success('Change password successfully!!!');
      client.invalidateQueries({queryKey: ['profile']});
    },
  })
}

export const useProfile = () => {
  const { identity, onEmailValid } = useSession();

  const {data, isLoading, error} = useQuery({
    queryKey: ['profile', identity?.id],
    queryFn: async () => {
      return await getProfileApi().then((res) => res.data);
    },
  })

  if (error) {
    toast.error('Error when fetching profile!!!');
  }

  useEffect(() => {
    if (data && JSON.stringify(delete data.last_sign_in_at) !== JSON.stringify(delete identity.last_sign_in_at)) {
      onEmailValid(data?.email, data?.avatar_url, data?.first_name, data?.last_name, data?.password_changed_at);
    }
  }, [data]);

  return {data, isLoading, error};
}