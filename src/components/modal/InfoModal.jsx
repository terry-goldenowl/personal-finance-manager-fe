import { Dialog } from "@headlessui/react";
import React from "react";
import Modal from "./Modal";

function InfoModal({ title = "Notification", message, onClose }) {
  return (
    <Modal action="yes" onAccept={onClose} onClose={onClose} title={title}>
      <p>{message}</p>
    </Modal>
  );
}

export default InfoModal;
