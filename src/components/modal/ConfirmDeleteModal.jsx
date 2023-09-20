import React from "react";
import Modal from "./Modal";

function ConfirmDeleteModal({ onAccept, onClose, message }) {
  return (
    <Modal title={"Confirm deletion"} onAccept={onAccept} onClose={onClose} width={"md:w-fit w-11/12"}>
      <p>{message}</p>
    </Modal>
  );
}

export default ConfirmDeleteModal;
