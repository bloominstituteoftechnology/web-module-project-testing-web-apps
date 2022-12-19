import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const header = screen.findByText(/contact form/i)
    expect(header).toBeVisible;
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const header = screen.findByLabelText('firstname')
    userEvent.type(firstName, 'edd')
    expect(screen.findByText('Error: first Name must have atleast have 5 characters')).toBeVisible
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstName = screen.findByLabelText('firstname')
    const lastName = screen.findByLabelText('lastname')
    const email = screen.findByLabelText('email')
    userEvent.type(firstName, ' {backspace} ')
    userEvent.type(lastName,'{backspace}')
    userEvent.type(email, '{backspace}')
    expect(screen.findByText('Error: First name must have atleast 5 characters')).toBeVisible
    expect(screen.findByText('Error: Last Name is a required Field')).toBeVisible
    expect(screen.findByText('Error: email must be a valid email address.')).toBeVisible
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const firstName = screen.findByLabelText('firstname')
    const lastname = screen.findByLabelText('lastname')
    const submit = screen.findByRole('button')
    userEvent.type(firstName, 'steven')
    userEvent.type(lastname, 'Grant')
    userEvent.type(await submit)
    expect(screen.findByAllText('Error: email must be a valid email address.')).toBeVisible
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
