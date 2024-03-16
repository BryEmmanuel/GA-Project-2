import React from "react";

const Modal = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay fixed inset-0 bg-black opacity-50"
        onClick={props.onClose}
      ></div>
      <div
        className="modal-content bg-white rounded-lg shadow-lg overflow-y-auto max-w-lg mx-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <button
          className="bg-purple-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
