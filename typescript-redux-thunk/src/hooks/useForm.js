import { useState } from "react";

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = validate(values);

    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
