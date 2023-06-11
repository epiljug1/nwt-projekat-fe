import api from "../config/api";

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function registerUser({ body }: { body: RegisterUserData }) {
  const data = await api.post("/user/auth/register", {
    name: `${body.firstName} ${body.lastName}`,
    address: "address",
    phoneNumber: "+12345679",
    email: body.email,
    password: body.password,
  });

  const administratorUser = await api.post(
    "/administration/administration/users",
    body
  );

  await api.post("/search/search/users", body);
  await api.post("/postcom/post-com/users", body);

  console.log("REGISTROVANJE USERA: ", data);
  console.log("REGISTROVANJE USERA opet: ", administratorUser);
  return data.data.status === 200 && administratorUser.status === 200;
}
