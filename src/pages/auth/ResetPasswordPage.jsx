import React, { useState } from "react";
import LoginRegisterLayout from "./LoginRegisterLayout";
import ResetPasswordForm from "./components/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <LoginRegisterLayout>
      <ResetPasswordForm />
    </LoginRegisterLayout>
  );
}

export default ResetPasswordPage;
