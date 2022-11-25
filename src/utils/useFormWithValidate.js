import React from "react";
import { MESSAGE_ERROR_EMAIL, MESSAGE_ERROR_NAME} from '../utils/const'
import { regExpName } from '../utils/regExp';

function useFormWithValidate() {
  const validator = require("email-validator");
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  
  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setErrors, setIsValid, setIsFormValid]
  );

  React.useEffect(()=>resetForm(),[resetForm])

  React.useEffect(()=>setIsFormValid(!(Object.values(isValid).length===0||Object.values(isValid).includes(false))),[isValid])

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
      if (name === "email") {
        setIsValid({ ...isValid, [name]: checkEmail(value) });
        setErrors({ ...errors, [name]: target.validationMessage || MESSAGE_ERROR_EMAIL });
      } else if (name === "name") {
        setIsValid({ ...isValid, [name]: target.validity.valid ? !checkName(value) : false });
        setErrors({ ...errors, [name]: target.validationMessage || MESSAGE_ERROR_NAME });
      } else {
        setIsValid({ ...isValid, [name]: target.validity.valid });
        setErrors({ ...errors, [name]: target.validationMessage });
      }
      setValues({ ...values, [name]: value });
  };

  const checkEmail = (value) => validator.validate(value);
  const checkName = (value) => regExpName.test(value);

  return { 
    values, 
    handleChange, 
    errors, 
    isFormValid, 
    isValid, 
    resetForm 
  }
}

export default useFormWithValidate;