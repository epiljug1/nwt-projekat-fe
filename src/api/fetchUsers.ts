import api from "../config/api";

export async function fetchUsers() {
  const data = await api.get("/administration/administration/users");
  console.log(data.data);
  return data.data;
}
