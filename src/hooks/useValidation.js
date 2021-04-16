import { useState } from "react";


// const initialErrorValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   message: ""
// }


export const useValidation = (initialErrorValues) => {
  const [errors, setErrors] = useState(initialErrorValues);
  const [displayData, setDisplayData] = useState(false);


  // Helper function errorHandling holds the testing logic
  // takes in a name and value of the input
  // returns an error message string
  const errorHandling = (fieldName, fieldValue) => {
    if (fieldName === "firstName" && fieldValue.length < 5)
      return `${fieldName} must have at least 5 characters.`;
    const emailRegex = /(.*)@(.*)\.(.+)/g;
    if (fieldName === "email" && !fieldValue.match(emailRegex))
      return `${fieldName} must be a valid email address.`;
    if (fieldName !== "message" && fieldValue === "")
      return `${fieldName} is a required field.`;
    return "";
  }

    /*
    
    // define an object of error data
    // it iterates over each error key
    // for each one, it runs the validation code ---> errorHandling
    // submitErrors[fieldName] sets the key to collect the error data ("error messages") returned from errorHandling
    const submitErrors = {};
    Object.keys(errors).forEach(fieldName => {
      submitErrors[fieldName] = errorHandling(fieldName, values[fieldName])
    });
    THIS LOGIC GETS MOVED INTO validateForm function below:
    */

    const validateForm = (values) => {
      const newErrors = {}; // this line clears the errors, every time you validate the form

      Object.keys(values).forEach(key => {
        newErrors[key] = errorHandling(key ,values[key]); // returns an error string
      });

      setErrors(newErrors); // set the errors to state ---> errors
      
      /*
      // hasErrors tests for errors and set display data state
      // it sets the display data to true or false, depending on what hasErrors is (truthy / falsy)

      const hasErrors = (newErrors.firstName === "" && newErrors.lastName === "" && newErrors.email === "" && newErrors.message === "");
      setDisplayData(hasErrors);
      
      ALL THIS LOGIC HAS BEEN INTEGRATED BELOW
      */

      let hasErrors = false;
      console.log("newerrors", newErrors)

      Object.values(newErrors).forEach(value => {
      
        if (value !== "") { //aka there is no error
          hasErrors = true;
        }
      });

      setDisplayData(!hasErrors);

      return hasErrors; // will return a boolean if there are errors or not

    };// end of validateForm function
    

  return [errors, displayData, validateForm]; 

}

