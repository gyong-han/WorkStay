import { useState } from "react";

const useFormData = (initState, callback) => {
  const [formData, setFormData] = useState(initState);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e, onSubmit) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData); // onSubmit 함수 실행
    }
    callback(formData); // 기존 API 요청 실행
  };

  return { formData, handleInputChange, handleSubmit };
};

export { useFormData };
