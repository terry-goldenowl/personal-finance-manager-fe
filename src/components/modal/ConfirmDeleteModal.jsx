import React from "react";
import Modal from "./Modal";

function ConfirmDeleteModal({ onAccept, onClose, name }) {
  return (
    <Modal title={"Confirm deletion"} onAccept={onAccept} onClose={onClose}>
      <p>Are your sure to delete this {name}? This action can not be undone.</p>
    </Modal>
  );
}

export default ConfirmDeleteModal;
