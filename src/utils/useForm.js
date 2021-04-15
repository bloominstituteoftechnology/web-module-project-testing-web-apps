import useLocalStorage  from './useLocalStorage'

export const useForm = initialValue => {
    const [values, setValues] = useLocalStorage('formValues', initialValue);
    const [errors, setErrors] = useLocalStorage('errorValues', initialValue)
    const handleChanges = e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
      setErrors({
        ...errors,
        [e.target.name]: e.target.value
      });
      
    };

    return [values, setValues, errors, setErrors, handleChanges];
  };