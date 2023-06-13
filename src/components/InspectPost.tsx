import React, { useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { fetchPostLikes } from "../api/fetchPostLikes";
import { FcLike } from "react-icons/fc";
import { addNewComment, fetchPostComments } from "../api/fetchCommentPost";
import CommentCard from "./CommentCard";
import { toast } from "react-hot-toast";

const Title = styled.h2`
  /* font-family:"" */
  font-size: 24px;
  margin-bottom: 16px;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    background-color: #a42f04;
  }
`;

const ContentContainer = styled.div`
  background-color: #f2f2f2;
  padding: 5px 10px;

  border-radius: 10px;
`;

interface InspectPostProps {
  content: string;
  title: string;
  creator: string;
  subforum: string;
  postId: number;
}

const SubforumCreatorContainer = styled.div`
  color: #595959;
  position: absolute;
  left: 0;
  top: 0;

  margin-top: -30px;

  font-style: italic;
`;

const LikeContainer = styled.div`
  color: #595959;
  position: absolute;
  right: 0;
  top: 0;

  margin-top: -30px;

  font-style: italic;
  font-weight: bold;
  font-size: 18px;

  display: flex;
  align-items: center;
  gap: 5px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-height: 400px;
  overflow-y: auto;
`;

const Input = styled.textarea`
  border: 1px solid #848383;
  border-radius: 10px;
  width: 450px;
  max-height: 45px;

  padding: 10px;

  font-size: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;

  margin-top: 15px;
`;

export default function InspectPost({
  content,
  creator,
  subforum,
  title,
  postId,
}: InspectPostProps) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("email");

  const { data: likesForPost } = useQuery({
    queryKey: ["post-likes", postId],
    queryFn: () => {
      return fetchPostLikes({ postId });
    },
  });

  const { data: postCommetns } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => {
      return fetchPostComments({ postId });
    },
  });

  if (postCommetns) {
    console.log("postCommetns: ", postCommetns);
  }

  const onAddComment = async () => {
    if (userId && inputRef.current?.value && inputRef.current?.value.trim()) {
      await addNewComment({
        postId,
        creatorId: userId,
        text: inputRef.current?.value,
      });
      inputRef.current.value = "";
      toast.success("Added a new comment");
      queryClient.refetchQueries(["post-comments"]);
    }
  };
  return (
    <Container>
      <Title>{title}</Title>
      <ContentContainer>{content}</ContentContainer>
      <SubforumCreatorContainer>
        <div>Created by: {creator}</div>
        <div>Subfoum: {subforum}</div>
      </SubforumCreatorContainer>
      <LikeContainer>
        <FcLike style={{ scale: "1.5" }} />
        {likesForPost?.length ?? 0}
      </LikeContainer>
      <Subtitle>Comments</Subtitle>
      <CommentContainer>
        {!!postCommetns &&
          postCommetns.map((comment: any, index: number) => {
            return (
              <CommentCard
                key={index}
                commentId={comment.id}
                text={comment.text}
                name={`${comment.creator.firstName} ${comment.creator.lastName}`}
                hasPermision={comment?.creator?.email === userEmail}
              />
            );
          })}
        {!!postCommetns && !postCommetns.length && (
          <i style={{ margin: "0 auto" }}>No comments</i>
        )}
      </CommentContainer>
      {!!userId && (
        <InputContainer>
          <Input ref={inputRef} />
          <Button onClick={onAddComment}>Add Comment</Button>
        </InputContainer>
      )}
    </Container>
  );
}
