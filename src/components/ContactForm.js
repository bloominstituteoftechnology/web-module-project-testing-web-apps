import React, { useState } from "react";
import DisplayComponent from './DisplayComponent';
import { useForm } from "../hooks/useForm";
import { useValidation } from "../hooks/useValidation";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
}

const initialErrorValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
}

const ContactForm = () => {
  // const [displayData, setDisplayData] = useState(false); REFACTORED --> moved to useValidation

  // const [form, setForm] = useState(formData); REFACTORED TO:
  const [values, handleChange, clearForm] = useForm(initialValues);

  // const [errors, setErrors] = useState(errorData); REFACTORED TO:
  const [errors, displayData, validateForm] = useValidation(initialErrorValues); 

  /* REFACTORED --> moved to useValidation
  const errorHandling = (fieldName, fieldValue) => {
    if (fieldName === "firstName" && fieldValue.length < 5)
      return `${fieldName} must have at least 5 characters.`;

    const emailRegex = /(.*)@(.*)\.(.+)/g; // g means many matches, wrong?
    if (fieldName === "email" && !fieldValue.match(emailRegex))
      return `${fieldName} must be a valid email address.`;

    if (fieldName !== "message" && fieldValue === "")
      return `${fieldName} is a required field.`;
    
    return "";
  }
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = validateForm(values);
    /*
    REFACTORED --> moved to useValidation
    const submitErrors = {};
    Object.keys(errors).forEach(fieldName => {
      submitErrors[fieldName] = errorHandling(fieldName, values[fieldName])
    });
    
    setErrors(submitErrors);
    */

    // if there are no errors, then call clearFrom();
    // if (!hasErrors) {
    //   clearForm();
    // }



    // const hasErrors = (submitErrors.firstName === "" && submitErrors.lastName === "" && submitErrors.email === "" && submitErrors.message === "");
    // setDisplayData(hasErrors);
  };

  // const handleChange = (e) => {
  //   console.log("e.target.name",e.target.name)
  //   const errorMessage = errorHandling(e.target.name, e.target.value);

  //   if (errorMessage !== "") {
  //     setDisplayData(false);
  //   }

  //   setErrors({
  //     ...errors,
  //     [e.target.name]: errorMessage
  //   });

  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   });
  // // }
  // console.log("Contact Form render: ", displayData);

  return (
    <div className="App">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            onChange={handleChange}
            name="firstName"
            value={values.firstName}
            id="firstName"
            placeholder="Edd"
          />
          {(errors.firstName) && <p data-testid="error">Error: {errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            onChange={handleChange}
            id="lastName"
            name="lastName"
            value={values.lastName}
            placeholder="Burke"
          />
          {(errors.lastName) && <p data-testid="error">Error: {errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email*</label>
          <input 
            onChange={handleChange}
            id="email"
            name="email" 
            value={values.email}
            placeholder="bluebill1049@hotmail.com"
          />
          {(errors.email) && <p data-testid="error">Error: {errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            onChange={handleChange}
            name="message"
            id="message"
            value={values.message}
            />

        {(errors.message) && <p data-testid="error">Error: {errors.message}</p>}

        </div>

        {displayData && <DisplayComponent form={values}/>}

        <input data-testid="submitButton" type="submit" />
 
        <button data-testid="clearFormButton" className="clear-form-button" onClick={clearForm}>Clear Form</button>
  
      </form>
    </div>
  );
};

export default ContactForm;