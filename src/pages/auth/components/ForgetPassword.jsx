import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";
import AuthInput from "./AuthInput";

function ForgetPassword({ handleAccept, setShow, error, setError }) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (
      value.length > 0 &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ) {
      setError("Email is not valid!");
    } else setError(null);
  };

  return (
    <Modal
      title={"Password reset"}
      onAccept={handleAccept}
      setIsShown={setShow}
    >
      <AuthInput
        type={"email"}
        name={"email"}
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailChange}
        error={error}
        label={"Enter your email to get the reset password link"}
      />
    </Modal>
  );
}

export default ForgetPassword;
