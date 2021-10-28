import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const headerOne = screen.getByText(/contact form/i)
    expect(headerOne).toBeInTheDocument();
    expect(headerOne).toBeTruthy();
    expect(headerOne).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    // firstName
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "one");

    // errorMessage
    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "");

    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "");

    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, "");

    const errorOne = screen.queryAllByText(/error/i);
    expect(errorOne).toBeTruthy();

    const errorTwo = screen.queryAllByText(/error/i);
    expect(errorTwo).toBeTruthy();

    const errorThree = screen.queryAllByText(/error/i);
    expect(errorThree).toBeTruthy();

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