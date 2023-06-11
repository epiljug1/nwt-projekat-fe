import api from "../config/api";

export async function fetchSubforums() {
  const data = await api.get("/administration/administration/subforums");
  console.log(data.data);
  return data.data;
}
