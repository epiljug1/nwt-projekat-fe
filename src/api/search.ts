import api from "../config/api";

export async function fetchUsers() {
  const data = await api.get("/search");
  return data.data;
}
