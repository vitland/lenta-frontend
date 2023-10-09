import {axiosInstance} from "./axiosInstance";
import {ApiRoutes} from "../types/apiRoutes";

export const login = async (email: string, password: string) => {
  const data = await axiosInstance.put(ApiRoutes.LOGIN, {email, password});

  //заменить user на токены
  localStorage.setItem("user", JSON.stringify({ name: "Кириллов Н." }))

}