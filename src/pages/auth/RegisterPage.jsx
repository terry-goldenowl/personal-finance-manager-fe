import React from "react";
import LoginRegisterLayout from "./LoginRegisterLayout";
import RegisterForm from "./components/RegisterForm";
import AuthService from "../../services/auth";

function RegisterPage() {
  const handlerRegister = (values) => {
    // console.log(values)
    AuthService.register(values);
  };

  return (
    <LoginRegisterLayout>
      <RegisterForm onSubmit={handlerRegister} />
    </LoginRegisterLayout>
  );
}

export default RegisterPage;
