import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { sendContactMessage } from "../services/messages";
import { CONTACT_VALIDATORS, validateContact } from "../utils/validators";

const EMPTY_VALUES = { name: "", email: "", message: "", website: "" };

const useContactForm = () => {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  // O estado do React só muda no próximo desenho; a ref barra o clique duplo.
  const isSubmitting = useRef(false);

  const mutation = useMutation({
    // Sem conexão, tenta e mostra o erro, em vez de ficar parado em "Enviando…".
    networkMode: "always",
    // Campo oculto preenchido é robô: finge que enviou e não grava nada.
    mutationFn: (data) => (data.website ? null : sendContactMessage(data)),
    onSuccess: () => setValues(EMPTY_VALUES),
    onSettled: () => {
      isSubmitting.current = false;
    },
  });

  const validateField = (field, value) =>
    setErrors((current) => ({
      ...current,
      [field]: CONTACT_VALIDATORS[field]?.(value) ?? "",
    }));

  const handleChange = ({ target: { name, value } }) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
    if (!mutation.isIdle && !mutation.isPending) {
      mutation.reset();
    }
  };

  const handleBlur = ({ target: { name, value } }) =>
    validateField(name, value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting.current) {
      return;
    }

    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    const [firstInvalid] = Object.keys(nextErrors);
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus();
      return;
    }

    isSubmitting.current = true;
    mutation.mutate(values);
  };

  return {
    values,
    errors,
    isSending: mutation.isPending,
    wasSent: mutation.isSuccess,
    hasFailed: mutation.isError,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useContactForm;
