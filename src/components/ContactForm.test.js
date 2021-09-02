import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';


test('ContactForm renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);

    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i);
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText('Edd');

    userEvent.type(firstNameInput, 'cat');

    await waitFor(() => {
        const errorMessage = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(errorMessage).toBeInTheDocument();
    });
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, '');
    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(lastNameInput, '');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, '');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(firstNameError).toBeInTheDocument();

        const lastNameError = screen.queryByText('Error: lastName is a required field.');
        expect(lastNameError).toBeInTheDocument();

        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Richard');
    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(lastNameInput, 'Oh');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, '');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'aaa');

    await waitFor(() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    });
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Richard');
    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(lastNameInput, '');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'ojin86@gmail.com');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const lastNameError = screen.queryByText('Error: lastName is a required field.');
        expect(lastNameError).toBeInTheDocument();
    });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Richard');
    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(lastNameInput, 'Oh');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'ojin86@gmail.com');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const firstName = screen.queryByTestId('firstnameDisplay')
        expect(firstName).toBeInTheDocument();

        const lastName = screen.queryByTestId('lastnameDisplay');
        expect(lastName).toBeInTheDocument();

        const email = screen.queryByTestId('emailDisplay');
        expect(email).toBeInTheDocument();

        const message = screen.queryByTestId('messageDisplay');
        expect(message).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    
});