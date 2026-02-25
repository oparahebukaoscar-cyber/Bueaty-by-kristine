import React from "react";

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button
      className="btn-primary"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
