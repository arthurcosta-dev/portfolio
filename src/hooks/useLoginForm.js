import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  isInvalidCredentials,
  isTooManyAttempts,
  signIn,
} from "../services/auth";
import { validateEmail, validatePassword } from "../utils/validators";

const VALIDATORS = { email: validateEmail, password: validatePassword };

const describeFailure = (error) => {
  if (!error) return "";
  if (isInvalidCredentials(error)) return "E-mail ou senha incorretos.";
  if (isTooManyAttempts(error)) {
    return "Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.";
  }
  return "Não foi possível entrar. Confira sua conexão e tente de novo.";
};

const useLoginForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // gcTime 0: a senha não fica guardada no cache depois do envio.
  const mutation = useMutation({ mutationFn: signIn, gcTime: 0 });

  const validateField = (field, value) =>
    setErrors((current) => ({ ...current, [field]: VALIDATORS[field](value) }));

  const handleChange = ({ target: { name, value } }) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
    if (mutation.isError) {
      mutation.reset();
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
    failure: describeFailure(mutation.error),
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useLoginForm;
