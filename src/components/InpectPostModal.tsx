import React, { useState } from "react";
import Modal from "react-modal";
import SignupForm from "./SignupForm";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import InspectPost from "./InspectPost";

Modal.setAppElement("#root");

interface Post {
  content: string;
  title: string;
  creator: string;
  subforum: string;
  postId: number;
}

interface InspectPostModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  post: Post;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
    width: "450px",
    paddingTop: "50px",
    paddingBottom: "30px",
    border: "none",
    borderRadius: "15px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Title = styled.h2`
  /* font-family:"" */
  font-size: 24px;
  margin-bottom: 16px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  margin: 0 auto;
`;

const InspectPostModal: React.FC<InspectPostModalProps> = ({
  isOpen,
  onCloseModal,
  post,
}) => {
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => {
        onCloseModal();
      }}
    >
      <ModalContent>
        {/* <Title>Log in</Title> */}
        <InspectPost {...post} />
      </ModalContent>
    </Modal>
  );
};

export default InspectPostModal;
