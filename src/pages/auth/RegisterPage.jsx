import React, { useState } from "react";
import LoginRegisterLayout from "./LoginRegisterLayout";
import RegisterForm from "./components/RegisterForm";
import AuthService from "../../services/auth";
import EmailVerification from "./components/EmailVerification";
import SuccessfulVerification from "./components/SuccessfulVerification";
import { useNavigate } from "react-router";

function RegisterPage() {
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (values) => {
    // console.log(values)
    try {
      if (isVerifyingEmail) {
        setShowEmailVerification(true);
        return;
      }

      setIsSubmitting(true);
      const responseData = await AuthService.register(values);
      setIsSubmitting(false);
      if (!responseData.error) {
        setShowEmailVerification(true);
        setIsVerifyingEmail(true);

        setEmail(values.email);
      } else {
        setError(responseData.error);
      }
    } catch (error) {
      setError(error.error);
    }
  };

  const handleSubmitCode = async (code) => {
    try {
      const responseData = await AuthService.verifyEmail({
        email: email,
        verification_code: code,
      });

      if (!responseData.error) {
        setShowEmailVerification(false);
        setIsVerifyingEmail(false);
        setIsVerified(true);
      } else {
        setShowEmailVerification(true);
        setError(responseData.message);
      }
    } catch (error) {
      setError(error.error);
    }
  };

  const handleAccept = () => {
    navigate("/login");
  };

  return (
    <LoginRegisterLayout>
      <RegisterForm
        onSubmit={handleRegister}
        submitting={isSubmitting}
        error={error}
        setError={setError}
      />
      {showEmailVerification && (
        <EmailVerification
          handleSubmit={handleSubmitCode}
          setShow={setShowEmailVerification}
          error={error}
        />
      )}
      {isVerified && (
        <SuccessfulVerification
          handleAccept={handleAccept}
          setShow={setIsVerified}
        />
      )}
    </LoginRegisterLayout>
  );
}

export default RegisterPage;
