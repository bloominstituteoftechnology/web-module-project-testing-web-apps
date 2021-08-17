import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App'
import DisplayComponent from './DisplayComponent';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<App />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, 'Juan');
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton)
    const err = await screen.findAllByTestId(/error/i);
    expect(err).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(firstNameInput, 'Juan Ordonez');
    userEvent.type(lastNameInput, 'J.ordonez419@gmail.com');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton)
    const err = screen.getByText(/error/i);
    expect(err).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, 'j.ordonez')
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton)
    const errorMessage = screen.getByText(/Error: email must be a valid email address./i);
    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const submitButton = screen.getByRole('button');
    const emailInput = screen.getByLabelText(/email*/i);

    userEvent.type(emailInput, 'j.ordonez419@gmail.com')
    userEvent.type(firstNameInput, 'Juan Ordonez');
    userEvent.click(submitButton)

    const errorMessage = screen.getByText(/Error: lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const message = screen.getByLabelText(/message*/i);
    const submitButton = screen.getByRole('button');
    const emailInput = screen.getByLabelText(/email*/i);
    const messageValue = screen.queryByLabelText(/Message/i)

    userEvent.type(emailInput, 'j.ordonez419@gmail.com')
    userEvent.type(firstNameInput, 'Juan Ramon');
    userEvent.type(lastNameInput, 'Ordonez');
    userEvent.click(submitButton)

    expect(messageValue).toBeEmpty()

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const submitButton = screen.getByRole('button');
    const emailInput = screen.getByLabelText(/email*/i);

    userEvent.type(emailInput, 'j.ordonez419@gmail.com')
    userEvent.type(firstNameInput, 'Juan Ramon');
    userEvent.type(lastNameInput, 'Ordonez');
    userEvent.click(submitButton)
}); 