import React, { useEffect } from "react";

const Toast = ({ message, show, setShow }) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 3000);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast;
