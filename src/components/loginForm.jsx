import React, { useState } from "react";
/* import { useFormFields } from "../hooks/useFormFields";
 */ import Input from "../common/input";
import Joi from "@hapi/joi";
import _ from "lodash";
import {
  validateFormWithJoi,
  validateFormProperty,
  handlePropertyFormChange,
  renderSubmitButton,
} from "../utils/formUtils";
const LoginForm = () => {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    //Validation
    const formErrors = validate();

    setErrors(formErrors || {});
    if (!_.isEmpty(errors)) return;
    //handle processing
  };
  /*   const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  }); */
  /* useEffect(() => {
    username.current.focus();
  }, []); 
  instead use autoFocus 
  */
  const schemaObject = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };
  const schema = Joi.object(schemaObject);
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

  /*   const username = useRef(null);
  let password = React.createRef(); */

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
          identifiar="username"
          label="Username"
          value={account.username}
          onChange={handleChange}
          type="text"
          error={errors.username}
        ></Input>
      </div>
      <div className="form-group">
        <Input
          identifiar="password"
          label="Password"
          value={account.password}
          onChange={handleChange}
          type="password"
          error={errors.password}
        ></Input>
      </div>
      {renderSubmitButton("Login", validate)}
    </form>
  );
};

export default LoginForm;
