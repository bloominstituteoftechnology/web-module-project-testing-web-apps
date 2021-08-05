import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
            userEvent.type(firstNameInput, "Jack");
        const errorMessage = screen.queryAllByText(/error/i);
        expect(errorMessage).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
            userEvent.type(firstNameInput, "");
        const errorMessage1 = screen.queryAllByText(/error/i);
        expect(errorMessage1).toBeTruthy();
        
        const lastNameInput = screen.getByLabelText(/Last Name/i);
            userEvent.type(lastNameInput, "");
        const errorMessage2 = screen.queryAllByText(/error/i);
        expect(errorMessage2).toBeTruthy();
        
        const emailInput = screen.getByLabelText(/Email/i);
            userEvent.type(emailInput, "");
        const errorMessage3 = screen.queryAllByText(/error/i);
        expect(errorMessage3).toBeTruthy();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
            userEvent.type(firstNameInput, "Jackson");
        const lastNameInput = screen.getByLabelText(/Last Name/i);
            userEvent.type(lastNameInput, "Orth")
        const emailInput = screen.getByLabelText(/Email/i);
            userEvent.type(emailInput, "");
        const errorMessage = screen.queryAllByText(/error/i);
        expect(errorMessage).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
        userEvent.type(firstNameInput, "Jackson");
    const lastNameInput = screen.getByLabelText(/Last Name/i);
        userEvent.type(lastNameInput, "Orth")
    const emailInput = screen.getByLabelText(/Email/i);
        userEvent.type(emailInput, "fakeemail");
    const button = screen.getByRole("button")
        userEvent.click(button)
    const emailError = screen.queryByText(/email must be a valid email address/i)
    expect(emailError).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
            userEvent.type(firstNameInput, "Jackson");
        const lastNameInput = screen.getByLabelText(/Last Name/i);
            userEvent.type(lastNameInput,"")
        const emailInput = screen.getByLabelText(/Email/i);
            userEvent.type(emailInput, "fakeemail@email.com");
        const button = screen.getByRole("button")
            userEvent.click(button)
        const lastNameError = screen.queryByText(/lastName is a required field/i)
        expect(lastNameError).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
            userEvent.type(firstNameInput, "Jackson");
        const lastNameInput = screen.getByLabelText(/Last Name/i);
            userEvent.type(lastNameInput,"Orth")
        const emailInput = screen.getByLabelText(/Email/i);
            userEvent.type(emailInput, "fakeemail@email.com");
        const button = screen.getByRole("button")
            userEvent.click(button)
        const firstNameSubmitted = screen.queryByTestId('firstnameDisplay')
        const lastNameSubmitted = screen.queryByTestId('lastnameDisplay')
        const emailSubmitted = screen.queryByTestId('emailDisplay')
        
        expect(firstNameSubmitted).toBeTruthy();
        expect(lastNameSubmitted).toBeTruthy();
        expect(emailSubmitted).toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
        const firstNameInput = screen.getByLabelText(/First Name/i);
            userEvent.type(firstNameInput, "Jackson");
        const lastNameInput = screen.getByLabelText(/Last Name/i);
            userEvent.type(lastNameInput,"Orth")
        const emailInput = screen.getByLabelText(/Email/i);
            userEvent.type(emailInput, "fakeemail@email.com");
        const messageInput = screen.getByLabelText(/Message/i)
            userEvent.type(messageInput, "Here is a message")
        const button = screen.getByRole("button")
            userEvent.click(button)
        
        await waitFor(()=> {
            const firstNameSubmitted = screen.queryByTestId('firstnameDisplay')
            expect(firstNameSubmitted).toBeTruthy();
        })
        await waitFor(()=> {
            const lastNameSubmitted = screen.queryByTestId('lastnameDisplay')
            expect(lastNameSubmitted).toBeTruthy();
        })
        await waitFor(()=> {
            const emailSubmitted = screen.queryByTestId('emailDisplay')
            expect(emailSubmitted).toBeTruthy();
        })
        await waitFor(()=> {
            const messageSubmitted = screen.queryByTestId('messageDisplay')
            expect(messageSubmitted).toBeTruthy();
        })
});
