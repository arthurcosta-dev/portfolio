import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { isInvalidCredentials, signIn } from "../services/auth";
import { validateEmail, validatePassword } from "../utils/validators";

const VALIDATORS = { email: validateEmail, password: validatePassword };

const useLoginForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const mutation = useMutation({ networkMode: "always", mutationFn: signIn });

  const validateField = (field, value) =>
    setErrors((current) => ({ ...current, [field]: VALIDATORS[field](value) }));

  const handleChange = ({ target: { name, value } }) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = ({ target: { name, value } }) =>
    validateField(name, value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mutation.isPending) {
      return;
    }

    const nextErrors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors).find((key) => nextErrors[key]);
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus();
      return;
    }

    mutation.mutate({ email: values.email.trim(), password: values.password });
  };

  return {
    values,
    errors,
    isSending: mutation.isPending,
    hasFailed: mutation.isError,
    hasWrongCredentials: isInvalidCredentials(mutation.error),
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useLoginForm;
