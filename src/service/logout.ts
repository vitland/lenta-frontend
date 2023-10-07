import {axiosInstance} from "./axiosInstance";
import {ApiRoutes} from "../types/apiRoutes";

export const logout = async () => {
  // test
  localStorage.removeItem('user')

  // const data = await axiosInstance.put(ApiRoutes.LOGOUT, {});

}