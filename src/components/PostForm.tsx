import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import SubforumDropdown from "./SubforumDropdown";
import { useQuery, useQueryClient } from "react-query";
import { fetchSubforums } from "../api/fetchSubforums";
import { createPost } from "../api/createPost";
import { toast } from "react-hot-toast";

interface FormData {
  title: string;
  content: string;
  subforum: string;
}

interface Body {
  title: string;
  content: string;
  subforum: number;
  creator: number;
}

const Container = styled.div`
  /* max-width: 400px; */
  width: 100%;
  margin: 0 auto;

  font-size: 18px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;

  max-height: 150px;
  min-height: 50px;
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
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 4px;
`;

interface Option {
  label: string[];
  value: number;
}

const PostForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const subforum = listOfSubforums.find(
      (item: any) => item.name === data.subforum
    );
    const userId = localStorage.getItem("userId");

    await createPost({
      body: {
        title: data.title,
        content: data.content,
        creatorId: userId ? +userId : 1,
        subforumId: subforum.id,
      },
    });
    toast.success("Post created successful");
    queryClient.refetchQueries(["posts"]);
    closeModal();
  };

  const { data: listOfSubforums } = useQuery({
    queryKey: ["subforums"],
    queryFn: () => {
      return fetchSubforums();
    },
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Title</Label>
        <Input type="text" {...register("title", { required: true })} />
        {errors.title && <ErrorMessage>This field is required</ErrorMessage>}

        <Label>Content</Label>
        <TextArea {...register("content", { required: true })} />
        {errors.content && <ErrorMessage>This field is required</ErrorMessage>}

        <Label>Subforum</Label>
        <Controller
          control={control}
          name="subforum"
          render={({ field }) => (
            <SubforumDropdown
              options={listOfSubforums?.map((item: any) => item.name) ?? []}
              selectedOption={field.value}
              handleOptionSelect={(value) => field.onChange(value)}
            />
          )}
        />
        {errors.subforum && <ErrorMessage>This field is required</ErrorMessage>}

        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

export default PostForm;
