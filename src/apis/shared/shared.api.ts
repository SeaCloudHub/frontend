import { api } from '../../helpers/http/config.http';
import { HTTP_HEADER } from '../../utils/constants/http.constant';
import { objectToFormData } from '../../utils/parser/http.parser';
import { BaseResponse } from '../../utils/types/api-base-response.type';
import { UploadImageREQ } from './request/upload-image.request';
import { UploadImageRESP } from './response/upload-image.response';

export const uploadImage = async (data: UploadImageREQ) => {
  const res = await api.post<BaseResponse<UploadImageRESP>>('assets/images', objectToFormData(data), {
    headers: { ...HTTP_HEADER.FORM_DATA },
  });
  return res.data;
};
