import { createPortal } from "react-dom";

export default function ModalWithNothing({ onClose, children}) {
  return createPortal(
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
      <div className={"relative w-auto my-6 mx-auto max-w-2xl z-50"}>
        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*content*/}
          {children}
        </div>
      </div>
      <div
        className={"opacity-25 fixed inset-0 bg-black z-40"}
        onClick={onClose}
      ></div>
    </div>,
    document.getElementById("modal")
  );
}
