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
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstNameInput, "greg");

    const firstNameError = screen.getByTestId(/error/i);
    expect(firstNameError).toBeInTheDocument();
    expect(firstNameError).toBeTruthy();
    expect(firstNameError).toHaveTextContent(/Error: firstName must have at least 5 characters/i)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    userEvent.type(firstNameInput, "g");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput, "");

    const errors = screen.getByTestId(/error/i);
    expect(errors).toBeInTheDocument();
    expect (errors).toBeTruthy();
    expect(errors).toHaveTextContent(/error/i)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    userEvent.type(firstNameInput, "Klove");
    userEvent.type(lastNameInput, "Farlen");
    userEvent.type(emailInput, "g");

    const emailError = screen.getByTestId(/error/i);
    expect(emailError).toBeInTheDocument();
    expect (emailError).toBeTruthy();
    expect(emailError).toHaveTextContent(/Error: email must be a valid email address/i)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "greg");

    const emailError = screen.getByTestId(/error/i);
    expect(emailError).toBeInTheDocument();
    expect (emailError).toBeTruthy();
    expect(emailError).toHaveTextContent(/Error: email must be a valid email address/i)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    userEvent.type(firstNameInput, "Klove");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput, "greg@greg.com");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const lastNameError = screen.getByTestId(/error/i);
    expect(lastNameError).toBeInTheDocument();
    expect(lastNameError).toBeTruthy();
    expect(lastNameError).toHaveTextContent(/Error: lastName is a required field/i)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    userEvent.type(firstNameInput, "Klove");
    userEvent.type(lastNameInput, "Farlen");
    userEvent.type(emailInput, "greg@greg.com");

    const message = screen.queryByText(/you submitted/i)
    expect(message).toBeFalsy();

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const firstNameDisplay = screen.queryByTestId("firstnameDisplay");
    const lastNameDisplay = screen.queryByTestId("lastnameDisplay");
    const emailDisplay = screen.queryByTestId("emailDisplay");

    expect(firstNameDisplay).toBeVisible();
    expect(lastNameDisplay).toBeVisible();
    expect(emailDisplay).toBeVisible();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    const messageInput = screen.getByLabelText(/message/i)

    userEvent.type(firstNameInput, "Klove");
    userEvent.type(lastNameInput, "Farlen");
    userEvent.type(emailInput, "greg@greg.com");
    userEvent.type(messageInput, "This is the message");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    expect(firstNameInput).toHaveValue("Klove");
    expect(lastNameInput).toHaveValue("Farlen");
    expect(emailInput).toHaveValue("greg@greg.com");
    expect(messageInput).toHaveValue("This is the message")
});