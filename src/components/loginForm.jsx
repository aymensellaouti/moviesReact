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
import { login } from "../services/authService";
import { toast } from "react-toastify";
const LoginForm = ({ location }) => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Validation
    const formErrors = validate();

    setErrors(formErrors || {});
    if (!_.isEmpty(errors)) return;
    try {
      await login(account);
      /* return history.push("/movies"); */
      const path = location.state ? location.state.from.pathname : "/";
      window.location = path;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const newErrors = { email: error.response.data };
        setErrors(newErrors);
        toast.error(error.response.data);
      }
    }
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
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  const schema = Joi.object(schemaObject);
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

  /*   const username = useRef(null);
  let password = React.createRef(); */

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
          identifiar="email"
          label="Email"
          value={account.email}
          onChange={handleChange}
          type="text"
          error={errors.email}
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
