import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { fetchUsers } from "../api/fetchUsers";
import { loginUser } from "../api/login";

interface FormData {
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

const LoginForm: React.FC<{ onSubmitForm: () => void }> = ({
  onSubmitForm,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await fetchUsers();
    const loginData = await loginUser({ body: data });
    const users = await fetchUsers();
    if (users) {
      const item = users.find((item: any) => item.email === data.email);
      localStorage.setItem("userId", item?.id);
    }

    onSubmitForm();

    localStorage.setItem("username", data.email.split("@")[0]);
    localStorage.setItem("token", loginData?.token);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Email</Label>
        <Input type="email" {...register("email", { required: true })} />
        {errors.email && <ErrorMessage>This field is required</ErrorMessage>}

        <Label>Password</Label>
        <Input type="password" {...register("password", { required: true })} />
        {errors.password && <ErrorMessage>This field is required</ErrorMessage>}

        <Button type="submit">Log in</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
