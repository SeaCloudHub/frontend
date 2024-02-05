import { api } from "../../helpers/http/config.http";
import { UsernamePasswordRQ } from "./requests/username-password-type";

export const logigByUsernamePassword=async (data:UsernamePasswordRQ)=>{
    const res =await api.post('/',data);
    return res.data;
}