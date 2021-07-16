import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { ErrorMessage } from 'react-hook-form';

test('renders without errors', ()=>{
    render(<ContactForm />)
    //he component renders the contact form component without errors.
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.getByRole('heading')

    expect(header).toBeInTheDocument
    expect(header).toBeTruthy
    expect(header).toHaveTextContent('Contact Form')
    //the header h1 element exists. Include three asserts, if the header 
    //is in the document, if the heads is truthy, if the header has the 
    //correct test content.
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const fNameInput = screen.getByLabelText('First Name*');

    userEvent.type(fNameInput, 'ghi');

    const errorMessages = screen.getAllByText(/error/i);
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submit = document.querySelector("input[type='submit']")

    userEvent.click(submit);

    const errorMessages = screen.getAllByText(/error/i);
    expect(errorMessages).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const fNameInput = screen.getByLabelText('First Name*');
    const lNameInput = screen.getByLabelText('Last Name*');
    const submit = document.querySelector("input[type='submit']")

    userEvent.type(fNameInput, 'Gogol');
    userEvent.type(lNameInput, 'Bordello');
    userEvent.click(submit);

    const errorMessages = screen.getAllByText(/error/i);
    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = screen.getByLabelText('Email*');

    userEvent.type(emailInput, 'nope');

    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toHaveTextContent('email must be a valid email address');

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const fNameInput = screen.getByLabelText('First Name*');
    const emailInput = screen.getByLabelText('Email*');
    const submit = document.querySelector("input[type='submit']")
    
    userEvent.type(fNameInput, 'Gogol');
    userEvent.type(emailInput, 'GypsyPunx@gogolBordello.com');
    userEvent.click(submit);

    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toHaveTextContent('lastName is a required field');

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const fNameInput = screen.getByLabelText('First Name*');
    const lNameInput = screen.getByLabelText('Last Name*');
    const emailInput = screen.getByLabelText('Email*');
    const submit = document.querySelector("input[type='submit']")

    userEvent.type(fNameInput, 'Gogol');
    userEvent.type(lNameInput, 'Bordello');
    userEvent.type(emailInput, 'GypsyPunx@gogolBordello.com');
    userEvent.click(submit);

    const errorMessage = document.querySelector("p[data-testid='error']");
    const firstName = document.querySelector("p[data-testid='firstnameDisplay']");
    const lastName = document.querySelector("p[data-testid='lastnameDisplay']");
    const email = document.querySelector("p[data-testid='emailDisplay']");
    const message = document.querySelector("p[data-testid='messageDisplay']");
    expect(errorMessage).not.toBeInTheDocument();
    expect(firstName).toHaveTextContent('Gogol');
    expect(lastName).toHaveTextContent('Bordello');
    expect(email).toHaveTextContent('GypsyPunx@gogolBordello.com')
    expect(message).toBe(null);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const fNameInput = screen.getByLabelText('First Name*');
    const lNameInput = screen.getByLabelText('Last Name*');
    const emailInput = screen.getByLabelText('Email*');
    const messageInput = screen.getByLabelText('Message');
    const submit = document.querySelector("input[type='submit']")

    userEvent.type(fNameInput, 'Gogol');
    userEvent.type(lNameInput, 'Bordello');
    userEvent.type(emailInput, 'GypsyPunx@gogolBordello.com');
    userEvent.type(messageInput, '<3 GYPSY PUNK ROCK');
    userEvent.click(submit);

    const errorMessage = document.querySelector("p[data-testid='error']");
    const firstName = document.querySelector("p[data-testid='firstnameDisplay']");
    const lastName = document.querySelector("p[data-testid='lastnameDisplay']");
    const email = document.querySelector("p[data-testid='emailDisplay']");
    const message = document.querySelector("p[data-testid='messageDisplay']");
    expect(errorMessage).not.toBeInTheDocument();
    expect(firstName).toHaveTextContent('Gogol');
    expect(lastName).toHaveTextContent('Bordello');
    expect(email).toHaveTextContent('GypsyPunx@gogolBordello.com')
    expect(message).toHaveTextContent('<3 GYPSY PUNK ROCK');
});