import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { Toaster, toast } from "react-hot-toast";
import InspectPostModal from "./InpectPostModal";
import { addLikeToPost, deleteLikeFromPost } from "../api/fetchPostLikes";
import { useQueryClient } from "react-query";

const CardContainer = styled.div`
  position: relative;
  width: 800px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 15px;
  padding: 15px 10px;
`;

const CardTitle = styled.h3`
  margin: 14px 0;
  color: #222;
`;

const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #555;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const LikeContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const CreatorContainer = styled.div`
  color: #595959;
  position: absolute;
  right: 0;
  top: 0;

  margin: 5px 10px;

  font-style: italic;
`;

const SubforumContainer = styled.div`
  color: #595959;
  position: absolute;
  left: 0;
  top: 0;

  margin: 5px 10px;

  font-style: italic;
`;

interface CardProps {
  content: string;
  title: string;
  creator: string;
  subforum: string;
  postId: number;
  isLikedPost?: boolean;
  likes: number;
  userLikeId?: number;
}

const RedditCard = ({
  content,
  title,
  creator,
  subforum,
  postId,
  isLikedPost,
  likes,
  userLikeId,
}: CardProps) => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("userId");

  const [isOpenModal, setIsCloseModal] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  const commentHandler = () => {
    setIsCloseModal(true);
  };

  const onLikeHandler = async () => {
    setIsLiked(true);
    toast.success("Post liked");
    await addLikeToPost({
      body: {
        voterId: userId ? +userId : 1,
        postId,
      },
    });
  };

  const dislikeHandler = async () => {
    setIsLiked(false);
    toast.success("Post disliked");
    queryClient.refetchQueries(["likes-for-post"]);
    queryClient.refetchQueries(["likes-for-user"]);
    if (userLikeId) {
      await deleteLikeFromPost({
        likeId: userLikeId,
      });
    }
  };

  return (
    <CardContainer>
      <InspectPostModal
        post={{
          title,
          content,
          creator,
          subforum,
          postId,
        }}
        isOpen={isOpenModal}
        onCloseModal={() => setIsCloseModal(false)}
      />
      <CreatorContainer>Created by: {creator}</CreatorContainer>
      <SubforumContainer>{subforum}</SubforumContainer>
      <CardTitle>{title}</CardTitle>
      <Content>{content}</Content>
      <CardStats>
        {!!userId && (
          <LikeContainer>
            {isLiked || isLikedPost ? (
              <>
                <FcLike
                  style={{ cursor: "pointer" }}
                  onClick={dislikeHandler}
                />
                {likes + (isLiked ? 1 : 0)}
              </>
            ) : (
              <>
                <FaRegHeart
                  style={{ cursor: "pointer" }}
                  onClick={onLikeHandler}
                />
                {likes}
              </>
            )}
          </LikeContainer>
        )}
        {!userId && (
          <LikeContainer>
            <FaRegHeart />
            {likes}
          </LikeContainer>
        )}
        <div style={{ marginLeft: "auto" }}>
          <FaRegCommentAlt
            style={{ cursor: "pointer" }}
            onClick={commentHandler}
          />
        </div>
      </CardStats>
    </CardContainer>
  );
};

export default RedditCard;
