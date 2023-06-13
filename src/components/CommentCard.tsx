import React from "react";
import styled from "styled-components";

import { FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteComment } from "../api/fetchCommentPost";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";

const Container = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px solid;

  padding: 10px;
`;

const UserLogo = styled.div`
  display: flex;
  gap: 5px;

  font-weight: bold;
  font-style: italic;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  margin: 5px;
  cursor: pointer;
`;

interface CommentCardProps {
  name: string;
  text: string;
  hasPermision?: boolean;
  commentId: number;
}

export default function CommentCard({
  name,
  text,
  hasPermision,
  commentId,
}: CommentCardProps) {
  const queryClient = useQueryClient();

  const onDeleteComment = async () => {
    await deleteComment({ commentId });
    toast.success("Comment deleted successfully");
    queryClient.refetchQueries(["post-comments"]);
  };
  return (
    <Container>
      {!!hasPermision && (
        <DeleteIcon onClick={onDeleteComment}>
          <MdDelete />
        </DeleteIcon>
      )}
      <UserLogo>
        <FaUserCircle style={{ scale: "1.3" }} />
        <div>{name}</div>
      </UserLogo>
      {text}
    </Container>
  );
}
