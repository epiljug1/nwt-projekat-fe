import api from "../config/api";

interface LoginUserData {
  email: string;
  password: string;
}

export async function loginUser({ body }: { body: LoginUserData }) {
  const data = await api.post("/user/auth/login", body);
  console.log("DAATA LOGIN", data);
  return data.data;
}
