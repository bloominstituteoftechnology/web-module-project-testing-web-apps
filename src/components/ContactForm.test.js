import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    const header = screen.queryByText('Contact Form');

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);


});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameField, "abc");

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstNameError = screen.queryByText(/error: firstname must have at least 5 characters./i)
        expect(firstNameError).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstNameError = screen.queryByText(/error: firstname must have at least 5 characters./i)
        expect(firstNameError).toBeInTheDocument();

        const lastNameError = screen.queryByText(/error: lastName is a required field./i)
        expect(lastNameError).toBeInTheDocument();

        const emailError = screen.queryByText(/error: email must be a valid email address./i)
        expect(emailError).toBeInTheDocument();
        
        
    })


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const firstNameField = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameField, 'Maruchan');

    const lastNameField = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameField, 'Noodles');

    await waitFor(() => {
        const emailError = screen.queryByText(/error: email must be a valid email address./i)
        expect(emailError).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailField = screen.getByLabelText(/email/i);
    userEvent.type(emailField, 'Goober');

    await waitFor(() => {
        const emailError = screen.queryByText(/error: email must be a valid email address./i)
        expect(emailError).toBeInTheDocument();
    });
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    
    const firstNameField = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameField, 'Maruchan');
    
    const emailField = screen.getByLabelText(/email/i);
    userEvent.type(emailField, 'goober@goobs.com');
    
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const lastNameError = screen.queryByText(/error: lastName is a required field./i)
        expect(lastNameError).toBeInTheDocument();
    });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstName = 'Maruchan';
    const lastName = 'Noodles';
    const email = 'goober@goobs.com'

    const firstNameField = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameField, 'Maruchan');

    const lastNameField = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameField, 'Noodles');
    
    const emailField = screen.getByLabelText(/email/i);
    userEvent.type(emailField, 'goober@goobs.com');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        // const firstNameError = screen.queryByText(/error: firstname must have at least 5 characters./i)
        // expect(firstNameError).not.toBeInTheDocument();

        // const lastNameError = screen.queryByText(/error: lastName is a required field./i)
        // expect(lastNameError).not.toBeInTheDocument();

        // const emailError = screen.queryByText(/error: email must be a valid email address./i)
        // expect(emailError).not.toBeInTheDocument();

        const resultName = screen.queryByText(firstName);
        expect(resultName).toBeInTheDocument();

        const resultLastName = screen.queryByText(lastName);
        expect(resultLastName).toBeInTheDocument();

        const resultEmail = screen.queryByText(email);
        expect(resultEmail).toBeInTheDocument();
        
        
    })

    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = 'Maruchan';
    const lastName = 'Noodles';
    const email = 'goober@goobs.com'
    const message = 'This is a message.'

    const firstNameField = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameField, 'Maruchan');

    const lastNameField = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameField, 'Noodles');
    
    const emailField = screen.getByLabelText(/email/i);
    userEvent.type(emailField, 'goober@goobs.com');

    const messageField = screen.getByLabelText(/message/i);
    userEvent.type(messageField, 'This is a message.');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    

    await waitFor(() => {

        const resultName = screen.getByTestId('firstnameDisplay');
        expect(resultName).toBeInTheDocument();

        const resultLastName = screen.getByTestId('lastnameDisplay');
        expect(resultLastName).toBeInTheDocument();

        const resultEmail = screen.getByTestId('emailDisplay');
        expect(resultEmail).toBeInTheDocument();
        
        const resultMessage = screen.getByTestId('messageDisplay');
        expect(resultMessage).toBeInTheDocument();
    })

    
});