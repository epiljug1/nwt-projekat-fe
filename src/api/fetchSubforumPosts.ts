import api from "../config/api";

export async function fetchSubforumPosts({
  subforumId,
}: {
  subforumId: string;
}) {
  const data = await api.get(
    "/administration/administration/posts-of-subforum/" + subforumId
  );
  return data.data;
}
