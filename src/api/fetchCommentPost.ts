import api from "../config/api";

interface CommentProps {
  postId: number;
}

interface NewCommentProps {
  postId: number;
  creatorId: string;
  text: string;
}

interface DeleteCommentProps {
  commentId: number;
}

export async function fetchPostComments({ postId }: CommentProps) {
  const data = await api.get("/postcom/post-com/comments-for-post/" + postId);

  return data.data;
}

export async function addNewComment(body: NewCommentProps) {
  await api.post("/administration/administration/comments", body);
  await api.post("/postcom/post-com/comments", body);
}

export async function deleteComment({ commentId }: DeleteCommentProps) {
  await api.delete("/postcom/post-com/comments/" + commentId);
}
