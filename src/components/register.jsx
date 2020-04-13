import React from "react";
import { useState } from "react";
import _ from "lodash";
import Joi from "@hapi/joi";

import Input from "../common/input";
import {
  handlePropertyFormChange,
  validateFormWithJoi,
  validateFormProperty,
  renderSubmitButton,
} from "../utils/formUtils";
import { register } from "./../services/userService";
import { loginWithJwt } from "../services/authService";

const Register = ({ history }) => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const schemaObject = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().allow(""),
  };
  const schema = Joi.object(schemaObject);
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Validation
    const formErrors = validate();

    setErrors(formErrors || {});
    if (!_.isEmpty(errors)) return;
    try {
      const response = await register(account);
      loginWithJwt(response.headers["x-auth-token"]);
      /* history.push("/"); */
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const newErrors = { ...errors };
        newErrors.email = error.response.data;
        setErrors(newErrors);
      }
    }
  };
  const validate = () => {
    const errors = validateFormWithJoi(schema, account);
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
        identifiar="email"
        label="Email"
        value={account.email}
        onChange={handleChange}
        type="text"
        error={errors.email}
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
