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

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  //Arrange
  render(<App/>);
  const firstNameInput = screen.getByLabelText(/first Name/i);
  //Act
  userEvent.type(firstNameInput, "a");
  //Assert

  // await waitFor(() =>  {
  //   const errorMessage = screen.getByText(/ must have at least 5 characters/i)});

  const errorMessage = screen.getByText(/ must have at least 5 characters/i);

  // console.log("errormessage:", errorMessage) Question: Where do I console.log this?
  // expect(errorMessage).toBeVisible();
  // expect(errorMessage).toBeDefined();
  // expect(errorMessage).not.toBeDisabled();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  //Arrange
  render(<App/>);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  //Act
  userEvent.type(firstNameInput, "");
  userEvent.type(lastNameInput, "");
  userEvent.type(emailInput, "");
  userEvent.type(messageInput, "");

  // //Assert
  // const errorMessages = screen.getAllByText(/error/i);
  // expect(errorMessages.length = 3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<App/>);
  const submitButton = screen.getByRole("button", { value: /submit/i });
});