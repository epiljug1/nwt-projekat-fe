import api from "../config/api";

export async function fetchUserLikes({ userId }: { userId: string }) {
  const data = await api.get("/postcom/post-com/likes-for-user/" + userId);
  return data.data;
}
