import React from "react";

const Input = ({ placeholder, type = "text", onChange }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
