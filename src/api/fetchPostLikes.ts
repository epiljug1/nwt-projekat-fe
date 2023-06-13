import api from "../config/api";

export async function fetchPostLikes({ postId }: { postId: number }) {
  const data = await api.get("/postcom/post-com/likes-for-post/" + postId);

  return data.data;
}

export async function fetchPostsLikes({ postsId }: { postsId: number[] }) {
  const results = [];

  for (let i = 0; i < postsId.length; i++) {
    const data = await api.get(
      "/postcom/post-com/likes-for-post/" + postsId[i]
    );
    if (data.data && data.data.length) {
      results.push({
        postId: postsId[i],
        likes: data.data,
      });
    }
  }
  return results;
}

interface Like {
  voterId: number;
  postId: number;
}

interface AddLikeProps {
  body: Like;
}

interface DeleteLikeProps {
  likeId: number;
}

export async function addLikeToPost({ body }: AddLikeProps) {
  await api.post("/postcom/post-com/likes", body);
}

export async function deleteLikeFromPost({ likeId }: DeleteLikeProps) {
  await api.delete("/postcom/post-com/likes/" + likeId);
}
