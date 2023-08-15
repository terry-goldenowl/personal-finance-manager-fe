import React from "react";
import LoginRegisterLayout from "./LoginRegisterLayout";
import RegisterForm from "./components/RegisterForm";

function RegisterPage() {
  return (
    <LoginRegisterLayout>
      <RegisterForm />
    </LoginRegisterLayout>
  );
}

export default RegisterPage;
