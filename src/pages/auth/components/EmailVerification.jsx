import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";
import AuthService from "../../../services/auth";
import AuthInput from "./AuthInput";

function EmailVerification({ onSuccess, onClose, email }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleAccept = async () => {
    try {
      const responseData = await AuthService.verifyEmail({
        email: email,
        verification_code: code,
      });

      if (responseData.status === "success") {
        onSuccess();
      } else {
        setError(responseData.error);
      }
    } catch (error) {
      setError(error.error);
    }
  };

  return (
    <Modal
      title={"Email verification"}
      onAccept={handleAccept}
      onClose={onClose}
    >
      <AuthInput
        type={"text"}
        name={"verification_code"}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onBlur={(e) => setCode(e.target.value)}
        error={error}
        label={
          "Your account haven't been verified yet! Please enter the code that we have sent to your email in mailtrap."
        }
        style="text-center"
      />
    </Modal>
  );
}

export default EmailVerification;
