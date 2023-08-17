import React from "react";
import Modal from "../../../components/modal/Modal";

function NotifyLinkSent({ onAccept, onClose }) {
  return (
    <Modal
      title={"Email verification successfully"}
      onAccept={onAccept}
      onClose={onClose}
    >
      <p>A reset password link was sent to your email!</p>
    </Modal>
  );
}

export default NotifyLinkSent;
