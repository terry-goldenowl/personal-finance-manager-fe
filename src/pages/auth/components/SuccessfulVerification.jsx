import React from "react";
import Modal from "../../../components/modal/Modal";

function SuccessfulVerification({ handleAccept, setShow }) {
  return (
    <Modal
      title={"Email verification successfully"}
      onAccept={handleAccept}
      setIsShown={setShow}
    >
      <p>Your email is verified! Please login to continue.</p>
    </Modal>
  );
}

export default SuccessfulVerification;
