import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { Toaster, toast } from "react-hot-toast";

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

const RedditCard = ({
  content,
  title,
  likes,
  comments,
  creator,
  subforum,
}: {
  content: string;
  title: string;
  likes: number;
  comments: number;
  creator: string;
  subforum: string;
}) => {
  const userId = localStorage.getItem("userId");

  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (isLiked) {
      toast.success("Post liked");
    }
  }, [isLiked]);
  return (
    <CardContainer>
      <CreatorContainer>Created by: {creator}</CreatorContainer>
      <SubforumContainer>{subforum}</SubforumContainer>
      <CardTitle>{title}</CardTitle>
      <Content>{content}</Content>
      <CardStats>
        {!!userId && (
          <LikeContainer>
            {isLiked ? (
              <FcLike
                style={{ cursor: "pointer" }}
                onClick={() => setIsLiked(false)}
              />
            ) : (
              <FaRegHeart
                style={{ cursor: "pointer" }}
                onClick={() => setIsLiked(true)}
              />
            )}
            {isLiked ? likes + 1 : likes}
          </LikeContainer>
        )}
        <div style={{ marginLeft: "auto" }}>
          <FaRegCommentAlt /> {comments}
        </div>
      </CardStats>
    </CardContainer>
  );
};

export default RedditCard;
