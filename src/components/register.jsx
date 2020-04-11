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
import { register } from "./../services/userService";
import Joi from "@hapi/joi";

const Register = () => {
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
      await register(account);
      //aymen@as.as
    } catch (error) {
      console.log("erreur", error.response.data);
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
