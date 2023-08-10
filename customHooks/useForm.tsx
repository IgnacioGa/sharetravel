import { useState } from "react";

interface Props {
  target: any;
}

export const useForm = (initialState: any) => {
  const [Values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }: Props) => {
    setValues({
      ...Values,
      [target.name]: target.value,
    });
  };

  return [Values, handleInputChange, reset];
};
