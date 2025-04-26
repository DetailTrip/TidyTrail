import { useState } from 'react';

export const useContactForm = (initialValues: { [key: string]: any }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formValues.email) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formValues, errors, handleChange, validateForm };
};