import React, { useState } from "react";
import LoginRegisterLayout from "./LoginRegisterLayout";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { useNavigate, useParams } from "react-router";
import AuthService from "../../services/auth";
import SuccessfulResetPassword from "./components/SuccessfulResetPassword";
import { toast } from "react-toastify";

function ResetPasswordPage() {
  const params = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessful, setShowSuccessful] = useState(false);
  const [error, setError] = useState(null);

  const token = params.token;
  const email = localStorage.getItem("email");

  const submitHandler = async (values) => {
    try {
      setIsSubmitting(true);
      const data = { ...values, email, token };
      console.log(data);
      const responseData = await AuthService.resetPassword(data);
      setIsSubmitting(false);

      if (responseData.status === "success") {
        setShowSuccessful(true);
      } else {
        setError(responseData.error);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <LoginRegisterLayout>
      <ResetPasswordForm
        onSubmit={submitHandler}
        submiting={isSubmitting}
        error={error}
      />
      {showSuccessful && (
        <SuccessfulResetPassword onClose={() => setShowSuccessful(false)} />
      )}
    </LoginRegisterLayout>
  );
}

export default ResetPasswordPage;
