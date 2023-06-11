import api from "../config/api";

export async function createSubforum({ body }: { body: { name: string } }) {
  await api.post("/administration/administration/subforums", body);
  await api.post("/search/search/subforums", body);
  await api.post("/postcom/post-com/subforums", body);
}
