import {axiosInstance} from "./axiosInstance";
import {ApiRoutes} from "../types/apiRoutes";

export const getUser = async () => {
  // const data = await axiosInstance.put(ApiRoutes.GET_USER);
  //удалить, когда на бэке появится getUser
  const user = localStorage.getItem('user')
  return user
}