import { useLocalStorage } from "./useLocalStorage";

export const useForm = (initialValues) => {
  const [values, setValues] = useLocalStorage('formValues', initialValues);
  // console.log("useForm fires")
  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    // e.preventDefault();
    setValues(initialValues);
    // localStorage.clear();
    // history.push("/");
  };

  return [values, handleChange, clearForm];
}

// We can define any return format we like. Using an array and dereferencing each attribute on the component side is a stylistic choice, which many developers like because it reminds us of the built-in hooks. Do it however you like, but just make sure that your returns here match the dereferencing in your component! It's easy to get out of sync while working on custom hooks :D

// Remember: order matters when dereferencing from an array! (not from an object)

// Naive approach is O(n) complexity: n change handlers for n form fields
// What we want is O(1) complexity: 1 change handler for n form fields