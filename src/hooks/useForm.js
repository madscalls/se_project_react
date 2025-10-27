import { useState } from "react";

export default function useForm(defaultValues, validators = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value, validity, validationMessage } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    // run custom validator if provided, otherwise fall back to browser validity
    const customValidator = validators[name];
    const error = customValidator
      ? customValidator(value)
      : validity && !validity.valid
      ? validationMessage
      : "";

    setErrors((prev) => {
      const newErrors = { ...prev, [name]: error };
      setIsValid(Object.values(newErrors).every((e) => !e));
      return newErrors;
    });
  }

  function resetForm(newValues = defaultValues) {
    setValues(newValues);
    setErrors({});
    setIsValid(false);
  }

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
