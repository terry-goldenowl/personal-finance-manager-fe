import React, { useState } from "react";
import LoginRegisterLayout from "./LoginRegisterLayout";
import LoginForm from "./components/LoginForm";
import ForgetPassword from "./components/ForgetPassword";
import AuthService from "../../services/auth";
import NotifyLinkSent from "./components/NotifyLinkSent";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import EmailVerification from "./components/EmailVerification";
import SuccessfulVerification from "./components/SuccessfulVerification";

function LoginPage() {
  const [isForgetting, setIsForgetting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [isNotifyingSent, setIsNotifyingSent] = useState(false);
  const [error, setError] = useState(null);
  const [forgetError, setForgetError] = useState(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleForget = () => {
    setIsForgetting(true);
  };

  const handleAccept = async (email) => {
    try {
      setIsSendingLink(true);
      const responseData = await AuthService.forgetPassword({
        email: email,
      });
      setIsSendingLink(false);

      if (responseData.status === "success") {
        setIsForgetting(false);
        setIsNotifyingSent(true);

        localStorage.setItem("email", email);
      } else {
        setIsForgetting(true);
        setForgetError(responseData.error);
      }
    } catch (error) {
      setIsSendingLink(false);
      setForgetError(error.error);
    }
  };

  const handleLogin = async (values) => {
    // console.log(values);
    try {
      setError(null);
      setEmail(values.email);

      setIsSubmitting(true);
      const responseData = await AuthService.login(values);
      setIsSubmitting(false);

      if (responseData.status === "success") {
        // console.log(responseData);

        Cookies.set("token", responseData.data.token);
        Cookies.set("user", JSON.stringify(responseData.data.user));

        navigate("/transactions");
      } else {
        console.log(responseData.error);
        setError(responseData.error);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError(error.response.data.message);
    }
  };

  const handleCloseSentLink = () => {
    setIsNotifyingSent(false);
  };

  const handleVerifySuccess = () => {
    setShowEmailVerification(false);
    setShowVerified(true);
  };

  const handleVerify = async () => {
    const responseData1 = await AuthService.sendVerificationCode({ email });

    if (responseData1.status === "success") {
      setShowEmailVerification(true);
    } else {
      setError(responseData1.error);
    }
  };

  const handleCloseVerifySucess = () => {
    setShowVerified(false);
    setError(null);
    window.location.reload();
  };

  return (
    <LoginRegisterLayout>
      <LoginForm
        onForgetting={handleForget}
        onLogin={handleLogin}
        submitting={isSubmitting}
        error={error}
        onVerify={handleVerify}
      />
      {isForgetting && (
        <ForgetPassword
          onAccept={handleAccept}
          onClose={() => setIsForgetting(false)}
          isSendingLink={isSendingLink}
          error={forgetError}
          setError={setForgetError}
        />
      )}
      {isNotifyingSent && (
        <NotifyLinkSent
          onAccept={handleCloseSentLink}
          onClose={() => setIsNotifyingSent(false)}
        />
      )}
      {showEmailVerification && (
        <EmailVerification
          onSuccess={handleVerifySuccess}
          onClose={() => setShowEmailVerification(false)}
          email={email}
        />
      )}
      {showVerified && (
        <SuccessfulVerification
          onAccept={handleCloseVerifySucess}
          onClose={() => setShowVerified(false)}
        />
      )}
    </LoginRegisterLayout>
  );
}

export default LoginPage;
