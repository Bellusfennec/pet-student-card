import React from "react";

const TextField = (props) => {
  const { value, name, onChange, label, error } = props;
  const type = props?.type ? props?.type : "text";

  const inputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mt-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={inputClasses()}
        id={name}
        name={name}
        value={value}
        autoComplete="off"
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextField;
