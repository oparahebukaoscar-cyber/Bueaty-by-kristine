import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">

      <div className="modal-box">
        {children}

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
