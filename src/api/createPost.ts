import api from "../config/api";

interface PostBody {
  title: string;
  content: string;
  subforumId: number;
  creatorId: number;
}

export async function createPost({ body }: { body: PostBody }) {
  await api.post("/administration/administration/posts", body);
  await api.post("/search/search/posts", body);
  await api.post("/postcom/post-com/posts", body);
}
