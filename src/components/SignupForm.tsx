import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { registerUser } from "../api/registerUser";
import { toast } from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
  margin-top: 4px;
`;

const SignupForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const status = await registerUser({ body: data });
      if (status) {
        toast.success("You successfully created a new account");
      }
      closeModal();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>First Name</Label>
        <Input type="text" {...register("firstName", { required: true })} />
        {errors.firstName && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}

        <Label>Last Name</Label>
        <Input type="text" {...register("lastName", { required: true })} />
        {errors.lastName && <ErrorMessage>This field is required</ErrorMessage>}

        <Label>Email</Label>
        <Input type="email" {...register("email", { required: true })} />
        {errors.email && <ErrorMessage>This field is required</ErrorMessage>}

        <Label>Password</Label>
        <Input type="password" {...register("password", { required: true })} />
        {errors.password && <ErrorMessage>This field is required</ErrorMessage>}

        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default SignupForm;
