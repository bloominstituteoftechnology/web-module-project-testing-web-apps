import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)  
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.getByText(/Contact Form/i)
    expect(header).toBeVisible()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name/i)
    userEvent.type(firstNameInput, 'Jose')
    expect(firstNameInput).toBeVisible()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const err = await screen.findAllByTestId(/error/i);
    expect(err).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
        const firstNameInput = screen.getByLabelText(/first name/i)
        const lastNameInput = screen.getByLabelText(/last name/i)
        userEvent.type(firstNameInput, 'Jose')
        userEvent.type(lastNameInput, 'Mercado')
        expect(firstNameInput).toBeVisible()
        const errorMessage = screen.getByText(/error/i);
        expect(errorMessage).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, 'jmercatgmail.com')
    expect(emailInput).toBeVisible()
    const errorMessage = screen.getByText(/Error: email must be a valid email address./i);
    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name/i)
    const buttonInput = screen.getByRole('button', {value: /submit/i})
    userEvent.type(firstNameInput, 'Jose')
    userEvent.click(buttonInput)
    expect(firstNameInput).toBeVisible()
    const errorMessage = screen.getByText(/Error: lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument()

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)         
    const messageValue = screen.queryByLabelText(/Message/i)
    const buttonInput = screen.getByRole('button', {value: /submit/i})

    userEvent.type(firstNameInput, 'jose')
    userEvent.type(lastNameInput, 'Merc')
    userEvent.type(messageValue, '')
    userEvent.type(emailInput, 'jmerc.email.com')
    userEvent.click(buttonInput)

    expect(firstNameInput).toBeVisible();
    expect(messageValue).toBeEmpty()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const buttonInput = screen.getByRole('button', {value: /submit/i})

    userEvent.type(firstNameInput, 'Jose')
    userEvent.type(lastNameInput, 'Mercado')
    userEvent.type(messageInput, "")
    userEvent.type(emailInput, 'jmerc.com')
    userEvent.click(buttonInput)

    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeInTheDocument()
    expect(messageInput).toBeVisible()
    expect(emailInput).toBeVisible()
});