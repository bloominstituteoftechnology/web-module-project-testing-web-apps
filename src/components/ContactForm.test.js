import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>;
});

test('renders the contact form header', ()=> {
    const header = screen.queryByText(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const firstNameInput = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstNameInput, "Cynthia");
    throw new Error("firstName must have at least 5 characters.");
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const firstNameInput= screen.getByLabelText(/first Name*/i);
    throw new Error("firstName must have at least 5 characters.");

    const lastNameInput = screen.getByLabelText(/last Name*/i);
    throw new Error("lastName is a required field.");

    const emailInput = screen.getByLabelText(/email*/i);
    throw new Error("email must be a valid email address");
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const firstNameInput= screen.getByLabelText(/first Name*/i);
    throw new Error("valid firstName.");

    const lastNameInput = screen.getByLabelText(/last Name*/i);
    throw new Error("valid lastName.");
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const emailInput = screen.getByLabelText(/email*/i);
    throw new Error("email must be a valid email address");
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const lastNameInput = screen.getByLabelText(/last Name*/i);
    throw new Error("lastName is a required field.");
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const firstNameInput= screen.getByLabelText(/first Name*/i);
  

    const lastNameInput = screen.getByLabelText(/last Name*/i);
    

    const emailInput = screen.getByLabelText(/email*/i);
    
});

test('renders all fields text when all fields are submitted.', async () => {
    const firstNameInput= screen.getByLabelText(/first Name*/i);
  

    const lastNameInput = screen.getByLabelText(/last Name*/i);
    

    const emailInput = screen.getByLabelText(/email*/i);
});