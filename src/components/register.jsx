import React from "react";
import { useState } from "react";
import Input from "../common/input";
import _ from "lodash";
import {
  handlePropertyFormChange,
  validateFormWithJoi,
  validateFormProperty,
  renderSubmitButton,
} from "../utils/formUtils";
import Joi from "@hapi/joi";

const Register = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const schemaObject = {
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().allow(""),
  };
  const schema = Joi.object(schemaObject);
  const handleSubmit = (event) => {
    event.preventDefault();
    //Validation
    const formErrors = validate();

    setErrors(formErrors || {});
    if (!_.isEmpty(errors)) return;
    //handle processing
  };
  const validate = () => {
    const errors = validateFormWithJoi(schema, account);
    console.log(errors);
    return errors;
  };
  const validateProperty = ({ name, value }) => {
    return validateFormProperty(schemaObject, name, value);
  };
  const handleChange = ({ target: input }) => {
    handlePropertyFormChange(
      setAccount,
      account,
      input,
      validateProperty,
      errors,
      setErrors
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        identifiar="username"
        label="Username"
        value={account.username}
        onChange={handleChange}
        type="text"
        error={errors.username}
      ></Input>
      <Input
        identifiar="password"
        label="Password"
        value={account.password}
        onChange={handleChange}
        type="password"
        error={errors.password}
      ></Input>
      <Input
        identifiar="name"
        label="Name"
        value={account.name}
        onChange={handleChange}
        type="text"
        error={errors.name}
      ></Input>
      {renderSubmitButton("register", validate)}
    </form>
  );
};

export default Register;
