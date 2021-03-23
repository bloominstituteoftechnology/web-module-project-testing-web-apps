import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
   render(<ContactForm/>)
   const header = screen.getByText("Contact Form")
    expect(header).toBeDefined()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const fNameInput = screen.getByLabelText("First Name*")
    userEvent.type(fNameInput , "")
    const fnameError = screen.findByText(" must have at least 5 characters.")
    expect(fnameError).toBeDefined();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const fNameInput = screen.getByLabelText("First Name*")
    const lNameInput = screen.getByLabelText("Last Name*")
    const emailInput = screen.getByLabelText("Email*")
    userEvent.type(fNameInput , "")
    userEvent.type(lNameInput , "")
    userEvent.type(emailInput , "")
    const fnameError = screen.findByText(" must have at least 5 characters.")
    const lnameError = screen.findByText(" must have at least 5 characters.")
    const emailError = screen.findByText(" must be a valid email address.")
    expect(fnameError).toBeDefined();
    expect(lnameError).toBeDefined();
    expect(emailError).toBeDefined();

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
    
});