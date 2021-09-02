import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
  //Arrange:
  render(<ContactForm/>);
  //Act:
  const header = screen.queryByText(/contact form/i);
  //Assert:
  expect(header).toBeInTheDocument();
  expect(header).toBeVisible();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  //Arrange:
  render(<ContactForm/>);
  //Act:
  const firstName = "Kal";
  const firstNameInput = screen.queryByLabelText(/first Name/i);
  userEvent.type(firstNameInput, firstName);
  //Assert:
  const nameTooShortError = screen.queryAllByText(/error/i);
  expect(nameTooShortError).toHaveLength(1);
  expect(nameTooShortError).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  //Arrange:
  render(<ContactForm/>);
  //Act:
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  //Assert:
  const allThreeErrors = screen.queryAllByTestId(/error/i);
  expect(allThreeErrors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  //Arrange:
  render(<ContactForm/>);
  //Act:
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const button = screen.getByRole('button');

  userEvent.type(firstNameInput, "Klove");
  userEvent.type(lastNameInput, "Farlen");
  userEvent.click(button);
  //Assert:
  const emailError = screen.queryAllByText(/error/i);
  expect(emailError).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  //Arrange:
  
  //Act:
  //Assert:
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});