import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const shortName = 'Ben'
    const fNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(fNameInput, shortName)
    const fNameError = screen.queryByText(/error: firstname must have at least 5 characters/i)
    expect(fNameError).toBeInTheDocument()
    expect(fNameError).toBeTruthy()
    expect(fNameError).toHaveTextContent(/Error: firstName must have at least 5 characters/i)

    const lNameError = screen.queryByText(/Error: lastName is a required field./i)
    const emailError = screen.queryByText(/error: email must be a valid email address./i)
    expect(lNameError).toBeFalsy()
    expect(emailError).toBeFalsy()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const fNameInput = screen.getByLabelText(/first name*/i)
    expect(fNameInput).toBeInTheDocument()
    expect(fNameInput).toBeTruthy()
    expect(fNameInput).toHaveTextContent('')
    const lNameInput = screen.getByLabelText(/last name*/i)
    expect(lNameInput).toBeInTheDocument()
    expect(lNameInput).toBeTruthy()
    expect(lNameInput).toHaveTextContent('')
    const emailInput = screen.getByLabelText(/email*/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toBeTruthy()
    expect(emailInput).toHaveTextContent('')

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const fNameError = screen.queryByText(/error: firstname must have at least 5 characters/i)
    expect(fNameError).toBeInTheDocument()
    expect(fNameError).toBeTruthy()
    expect(fNameError).toHaveTextContent(/Error: firstName must have at least 5 characters/i)

    const lNameError = screen.queryByText(/Error: lastName is a required field./i)
    expect(lNameError).toBeInTheDocument()
    expect(lNameError).toBeTruthy()
    expect(lNameError).toHaveTextContent(/Error: lastName is a required field./i)
    const emailError = screen.queryByText(/error: email must be a valid email address./i)
    expect(emailError).toBeInTheDocument()
    expect(emailError).toBeTruthy()
    expect(emailError).toHaveTextContent(/error: email must be a valid email address./i)


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const name = 'Bennie'
    const fNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(fNameInput, name)

    expect(fNameInput).toBeInTheDocument()
    expect(fNameInput).toBeTruthy()
    expect(fNameInput).toHaveTextContent(/bennie/i)
        console.log(name)
        console.log(fNameInput)

    // const lastName = 'Bridges'
    // const lNameInput = screen.getByLabelText(/last name*/i)
    // userEvent.type(lNameInput, lastName)

    // expect(lNameInput).toBeInTheDocument()
    // expect(lNameInput).toBeTruthy()
    // expect(lNameInput).toHaveTextContent('Bridges')

    // const emailInput = screen.getByLabelText(/email*/i)
    // expect(emailInput).toBeInTheDocument()
    // expect(emailInput).toBeTruthy()
    // expect(emailInput).toHaveTextContent('')

    // const submitButton = screen.getByRole("button");
    // userEvent.click(submitButton);

    // const fNameError = screen.queryByText(/error: firstname must have at least 5 characters/i)
    // expect(fNameError).toBeFalsy()

    // const lNameError = screen.queryByText(/Error: lastName is a required field./i)
    // expect(lNameError).toBeFalsy()
    
    // const emailError = screen.queryByText(/error: email must be a valid email address./i)
    // expect(emailError).toBeInTheDocument()
    // expect(emailError).toBeTruthy()
    // expect(emailError).toHaveTextContent(/error: email must be a valid email address./i)


    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});