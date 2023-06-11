import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { createSubforum } from "../api/createSubforum";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";

interface FormData {
  name: string;
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
  margin-top: -10px;
`;

const SubforumForm: React.FC<{ onSubmitForm: () => void }> = ({
  onSubmitForm,
}) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const daaata = await createSubforum({ body: data });
      queryClient.refetchQueries(["subforums"]);
      toast.success("subforum successfully added");
      onSubmitForm();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Name</Label>
        <Input type="text" {...register("name", { required: true })} />
        {errors.name && <ErrorMessage>This field is required</ErrorMessage>}

        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

export default SubforumForm;
