import React from "react";

const Input = ({ identifiar, value, label, onChange, type, error }) => {
  return (
    <>
      <label htmlFor={identifiar}>{label}</label>
      <input
        /*        ref={username}*/
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
        id={identifiar}
        name={identifiar}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
};

export default Input;
