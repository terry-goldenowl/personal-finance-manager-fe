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

      if (responseData.status === "success") {
        setIsSubmitting(true);
        const responseData1 = await AuthService.sendVerificationCode({
          email: values.email,
        });
        setIsSubmitting(false);

        if (responseData1.status === "success") {
          // console.log(responseData1);

          setShowEmailVerification(true);
          setIsVerifyingEmail(true);

          setEmail(values.email);
        } else {
          setError(responseData.error);
        }
      } else {
        setError(responseData.error);
      }
    } catch (error) {
      setError(error.error);
    }
  };

  const handleVerifySuccess = () => {
    setShowEmailVerification(false);
    setIsVerifyingEmail(false);
    setIsVerified(true);
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
          onSuccess={handleVerifySuccess}
          onClose={() => setShowEmailVerification(false)}
          email={email}
        />
      )}
      {isVerified && (
        <SuccessfulVerification onClose={() => setIsVerified(false)} />
      )}
    </LoginRegisterLayout>
  );
}

export default RegisterPage;
