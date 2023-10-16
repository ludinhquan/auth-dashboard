import { validateEmail, validatePassword } from "@lib/core";
import { useState } from "react";

export const useValidateForm = (props: { isLoginMode: boolean }) => {
  const { isLoginMode } = props;
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    const formData = { email, password };

    if (isLoginMode) return formData;

    const validateEmailResult = validateEmail(email);
    if (validateEmailResult) newErrors.email = validateEmailResult[0];

    const validatePasswordResult = validatePassword(password);
    if (validatePasswordResult) newErrors.password = validatePasswordResult[0];

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    return formData;
  };

  return {
    errors,
    validate,

    setErrors,
  };
};
