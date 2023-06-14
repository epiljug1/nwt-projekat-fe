import React, { useState } from "react";
import Modal from "react-modal";
import SignupForm from "./SignupForm";
import styled from "styled-components";

Modal.setAppElement("#root");

interface SignupModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
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
    paddingBottom: "100px",
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
  align-items: center;

  margin: 0 auto;
`;

const SignUpModal: React.FC<SignupModalProps> = ({ isOpen, onCloseModal }) => {
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onCloseModal}>
      <ModalContent>
        <Title>Sign Up</Title>
        <SignupForm closeModal={onCloseModal}/>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
