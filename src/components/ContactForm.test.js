import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm/>);
    
});

test('renders the contact form header', ()=> {
  render(<ContactForm/>);
  const header = screen.queryByText(/contact form/i);
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/contact form/i);
  expect(header).toBeTruthy();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>);
  const firstNameInput = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstNameInput, "eddy");

  await waitFor(()=>{
    const errorMsg = screen.queryByTestId("error");
    expect(errorMsg).toBeInTheDocument();
  })

    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>);
  const firstNameInput = screen.getByPlaceholderText(/edd/i);
  const lastNameInput = screen.getByPlaceholderText(/burke/i);
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  const submitBtn = screen.getByRole('button');

  userEvent.type(firstNameInput, '');
  userEvent.type(lastNameInput, '');
  userEvent.type(emailInput, '');
  userEvent.click(submitBtn);

  await waitFor(()=>{
    const errorMsgFirstName = screen.queryByText('Error: firstName must have at least 5 characters.');
    expect(errorMsgFirstName).toBeInTheDocument();

    const errorMsgLastName = screen.queryByText('Error: lastName is a required field.');
    expect(errorMsgLastName).toBeInTheDocument();

    const errorMsgEmail = screen.queryByText('Error: email must be a valid email address.');
    expect(errorMsgEmail).toBeInTheDocument();
  });
    

    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>);
  const firstNameInput = screen.getByPlaceholderText(/edd/i);
  const lastNameInput = screen.getByPlaceholderText(/burke/i);
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  const submitBtn = screen.getByRole('button');

  userEvent.type(firstNameInput, 'Priscila');
  userEvent.type(lastNameInput, 'Monteiro');
  userEvent.type(emailInput, '');
  userEvent.click(submitBtn);

  await waitFor(()=>{
    const errorMsgEmail = screen.queryByText('Error: email must be a valid email address.');
    expect(errorMsgEmail).toBeInTheDocument();
  });
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});