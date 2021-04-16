import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../App";
import ContactForm from './ContactForm';

// the first test is going to be queryByText not getByText on the project
test('renders App Component without errors', ()=>{
  render(<App/>);
}); // passes

test('renders the contact form header', ()=> {
  // Arrange
  const virtualDOM = render(<App/>);
  const header = virtualDOM.getByText(/Contact Form/i);
  // Act

  // Assert
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).not.toBeFalsy();
  expect(header).toBeVisible();
  expect(header).toHaveTextContent("Contact Form");// to test casing

}); // passes

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  //Arrange
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText(/first Name/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "a");
  userEvent.click(submitButton);
  //Assert
  const errorMessage = screen.getByText(/ must have at least 5 characters/i);

  expect(errorMessage).toBeVisible();
  expect(errorMessage).toBeDefined();
  expect(errorMessage).not.toBeDisabled();

  userEvent.type(firstNameInput, "");
}); // passes

test('renders THREE error messages if user enters no values into any fields.', async () => {
  //Arrange
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "");
  userEvent.type(lastNameInput, "");
  userEvent.type(emailInput, "");
  userEvent.type(messageInput, "");
  userEvent.click(submitButton);
  //Assert
  const errorMessages = screen.getAllByText(/error/i);
  expect(errorMessages.length = 3);
}); // passes

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  //Arrange
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "Rhiannon");
  userEvent.type(lastNameInput, "Stanford");
  userEvent.type(emailInput, "");
  userEvent.type(messageInput, "test");
  userEvent.click(submitButton);
  //Assert
  const errorMessage = screen.getByText(/must be a valid email/i);
  expect(errorMessage).toBeInTheDocument();
    
}); // passes

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  //Arrange
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "Rhiannon");
  userEvent.type(lastNameInput, "Stanford");
  userEvent.type(emailInput, "invalidEmail");
  userEvent.type(messageInput, "test");
  userEvent.click(submitButton);
  //Assert
  const errorMessage = screen.getAllByText(/email must be a valid email address/i);
  expect(errorMessage).toBeInTheDocument;
}); // passes

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  //Arrange
  render(<ContactForm/>);
  // const firstNameInput = screen.getByLabelText(/first name/i);
  // const lastNameInput = screen.getByLabelText(/last name/i);
  // const emailInput = screen.getByLabelText(/email/i);
  // const messageInput = screen.getByLabelText(/message/i);
  // const submitButton = screen.getByRole("button", { value: /submit/i });
  // //Act
  // userEvent.type(firstNameInput, "Rhiannon");
  // // userEvent.type(lastNameInput, "");
  // userEvent.type(emailInput, "test@gmail.com");
  // userEvent.type(messageInput, "test");
  screen.debug();
  // userEvent.click(submitButton);

  //Assert
  // const errorMessage = screen.getByTestId(/Error: lastName is a required field/i);
  // expect(errorMessage).toBeInTheDocument();

});



// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
//   //Arrange
//   render(<ContactForm />)
//   const firstNameInput = screen.getByLabelText(/first name/i)
//   const emailInput = screen.getByLabelText(/email/i)
//   const messageInput = screen.getByLabelText(/message/i)
//   const buttonInput = screen.getByRole('button', {value: /submit/i})
//   //Act
//   userEvent.type(firstNameInput, 'Tony')
//   userEvent.type(messageInput, "fixed the validation issues")
//   userEvent.type(emailInput, 'tony.miller@blackthought.tech')
//   userEvent.click(buttonInput)
//   //Assertion sanity checker
//   expect(firstNameInput).toBeVisible()
//   const errorMessage = screen.getByText(/Error: lastName is a required field/i);
//   expect(errorMessage).toBeInTheDocument()
// });





test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
   //Arrange
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "Rhiannon");
  userEvent.type(lastNameInput, "Stanford");
  userEvent.type(emailInput, "test@gmail.com");
  userEvent.type(messageInput, "test message");
  // userEvent.click(submitButton);
  //Assert
  // const firstNameText = screen.getByText(/Rhiannon/i);
  // const lastNameText = screen.getByText(/Stanford/i);
  // const emailText = screen.getByText(/test@gmail.com/i);
  // const messageText = screen.getByText(/test message/i);

  // const errorMessage = screen.getByText(/error/i);

  // expect(firstNameText.toBeInTheDocument);
  // expect(errorMessage)not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
   //Arrange
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "Rhiannon");
  userEvent.type(lastNameInput, "Stanford");
  userEvent.type(emailInput, "test@gmail.com");
  userEvent.type(messageInput, "test message");
  userEvent.click(submitButton);
  //Assert
  // const firstNameData = screen.getByText(/Rhiannon/i);
  // expect(errorMessage).toBeInTheDocument;
});