import { useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ setIsShown, title, onAccept, children }) {
  const handleAccept = () => {
    onAccept();
    setIsShown(false);
  };

  return createPortal(
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl z-50">
        {/*content*/}
        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setIsShown(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                x
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">{children}</div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setIsShown(false)}
            >
              Cancle
            </button>
            <button
              className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleAccept}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        onClick={() => setIsShown(false)}
      ></div>
    </div>,
    document.getElementById("modal")
  );
}
