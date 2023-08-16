import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";

function EmailVerification({ handleSubmit, setShow, error }) {
  const [code, setCode] = useState("");

  const handleAccept = () => {
    handleSubmit(code);
  };

  return (
    <Modal
      title={"Email verification"}
      onAccept={handleAccept}
      setIsShown={setShow}
    >
      <p>Please enter the code that we have sent to your email in mailtrap</p>
      <input
        type="text"
        name="verification_code"
        className="block border-2 border-purple-400 rounded-xl w-full py-2 px-4 text-xl outline-none mt-2 text-center tracking-wider"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <p className="text-red-500 text-end italic text-sm">{error}</p>
    </Modal>
  );
}

export default EmailVerification;
