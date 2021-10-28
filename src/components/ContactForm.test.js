import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);

    const header = screen.queryByText(/Contact Form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'name');

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor (() => {
        const errorMessage = screen.queryAllByTestId('error');
        expect(errorMessage).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'cain');

    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, 'palmer');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor (() => {
        const errorMessage = screen.queryAllByTestId('error');
        expect(errorMessage).toHaveLength(2);
    });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailField = screen.getByLabelText(/email/i);
    userEvent.type(emailField, 'cainpalmer@');

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);

    userEvent.type(firstNameField, 'Cain');
    userEvent.type(lastNameField, 'Palmer');
    userEvent.type(emailField, 'cainpalmer@gmail.com');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const messageField = screen.getByLabelText(/message/i)


    userEvent.type(firstNameField, 'Cain');
    userEvent.type(lastNameField, 'Palmer');
    userEvent.type(emailField, 'cainpalmer@gmail.com');
    userEvent.type(messageField, 'Hello');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(messageField).toBeInTheDocument();
});
