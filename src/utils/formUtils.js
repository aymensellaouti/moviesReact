import Joi from "@hapi/joi";
import React from "react";
export const validateFormWithJoi = (schema, data) => {
  /* 
  validateForm(account, schema); */
  const result = schema.validate(data, { abortEarly: false });
  if (!result.error) return null;
  const errorItems = result.error.details;
  const errors = {};
  for (let element of errorItems) {
    errors[element.path[0]] = element.message;
  }
  return errors;
};
export const validateFormProperty = (schemaObject, name, value) => {
  const obj = { [name]: value };
  const partialSchemaObject = { [name]: schemaObject[name] };
  const partialSchema = Joi.object(partialSchemaObject);
  const { error } = partialSchema.validate(obj);
  if (!error) return null;
  return error.details[0].message;
};

export const handlePropertyFormChange = (
  setData,
  data,
  input,
  validateProperty,
  errors,
  setErrors
) => {
  setData({
    ...data,
    [input.name]: input.value,
  });
  const formErrors = { ...errors };
  const errorMessage = validateProperty(input);
  if (errorMessage) formErrors[input.name] = errorMessage;
  else delete formErrors[input.name];
  setErrors(formErrors);
};
export const renderSubmitButton = (label, validate, handleSubmit) => {
  return (
    <button
      onClick={handleSubmit}
      disabled={validate()}
      type="submit"
      className="btn btn-primary"
    >
      {label}
    </button>
  );
};
/* export function renderInput(data, name, label) {
  return (
    <Input
      identifiar={name}
      label={label}
      value={account.username}
      onChange={handleChange}
      type="text"
      error={errors.username}
    ></Input>
  );
} */
