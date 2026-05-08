import { loginApi, registerApi } from "../../infrastructure/api/auth.api";

export const login = async (data) => {
  return await loginApi(data);
};

export const register = async (data) => {
  return await registerApi(data);
};