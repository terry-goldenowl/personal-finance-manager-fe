import React, { useState } from "react";
import LoginRegisterLayout from "./LoginRegisterLayout";
import LoginForm from "./components/LoginForm";
import ForgetPassword from "./components/ForgetPassword";
import AuthService from "../../services/auth";

function LoginPage() {
  const [isForgetting, setIsForgetting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleForget = () => {
    try {
      setIsForgetting(true);
    } catch (error) {}
  };

  const handleAccept = () => {};

  const handleLogin = async (values) => {
    // console.log(values);
    try {
      setIsSubmitting(true);
      const responseData = await AuthService.login(values);
      setIsSubmitting(false);

      if (!responseData.error) {
        console.log(responseData);
      } else {
        console.log(error);
        setError(responseData.error);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError(error.response.data.message);
    }
  };

  return (
    <LoginRegisterLayout>
      <LoginForm
        onForgetting={handleForget}
        onLogin={handleLogin}
        submitting={isSubmitting}
        error={error}
      />
      {isForgetting && (
        <ForgetPassword
          handleAccept={handleAccept}
          setShow={setIsForgetting}
          error={error}
          setError={setError}
        />
      )}
    </LoginRegisterLayout>
  );
}

export default LoginPage;
