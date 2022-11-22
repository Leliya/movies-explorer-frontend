import React from "react";

function useFormWithValidate() {
  const validator = require("email-validator");
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isButtonDisable, setIsButtonDisable] = React.useState(false);
  const regex = new RegExp(/[^a-zA-Z\d\sа-яА-Я-]/);
  const messageErrorName = "Имя может содержать буквы русского или английского алфавита, пробел или дефис"
  const messageErrorEmail = "Введен некорректный email, проверьте введенные данные"

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = {}, newIsFormValid = false, newIsButtonDisable = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsFormValid(newIsFormValid);
      setIsButtonDisable(newIsButtonDisable);
    },
    [setValues, setErrors, setIsValid, setIsFormValid]
  );

  React.useEffect(()=>resetForm(),[resetForm])

  React.useEffect(()=>setIsFormValid(!(Object.values(isValid).length===0||Object.values(isValid).includes(false))),[isValid])

 React.useEffect(()=>setIsButtonDisable(isFormValid),[isFormValid])

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
      if (name === "email") {
        setIsValid({ ...isValid, [name]: checkEmail(value) });
        setErrors({ ...errors, [name]: target.validationMessage || messageErrorEmail });
      } else if (name === "name") {
        setIsValid({ ...isValid, [name]: target.validity.valid ? !checkName(value) : false });
        setErrors({ ...errors, [name]: target.validationMessage || messageErrorName });
      } else {
        setIsValid({ ...isValid, [name]: target.validity.valid });
        setErrors({ ...errors, [name]: target.validationMessage });
      }
      setValues({ ...values, [name]: value });
  };

  const checkEmail = (value) => validator.validate(value);
  const checkName = (value) => regex.test(value);

  return { 
    values, 
    handleChange, 
    errors, 
    isFormValid, 
    isButtonDisable, 
    isValid, 
    resetForm 
  }
}

export default useFormWithValidate;