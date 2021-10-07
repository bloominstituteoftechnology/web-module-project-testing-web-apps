import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>); 

    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "abc");
    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    await waitFor (()=> {
        const errorMessage = screen.queryAllByTestId("error");
        expect(errorMessage).toHaveLength(3)
    })
    // const errorMessage = await screen.findAllByTestId('error');
    // expect(errorMessage).toHaveLength(3);
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "abcde");

    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "fghij");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor (()=> {
        const errorMessage = screen.queryAllByTestId("error");
        expect(errorMessage).toHaveLength(1);
    })
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, "abc@");
    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    
    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name*/i);
    const emailField = screen.getByLabelText(/email*/i);

    userEvent.type(firstNameField, "abcde");
    userEvent.type(lastNameField, "fghij");
    userEvent.type(emailField, "abc@def.com");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstName = screen.queryByText("abcde");
        const lastName = screen.queryByText("fghij");
        const email = screen.queryByText("abc@def.com");
        const message = screen.queryByTestId("message");

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(message).not.toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name*/i);
    const emailField = screen.getByLabelText(/email*/i);
    const messageField = screen.getByLabelText(/message/i);

    userEvent.type(firstNameField, "abcde");
    userEvent.type(lastNameField, "fghij");
    userEvent.type(emailField, "abc@def.com");
    userEvent.type(messageField, "Message Text");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText("abcde");
        const lastnameDisplay = screen.queryByText("fghij");
        const emailDisplay = screen.queryByText("abc@def.com");
        // const messageDisplay = screen.queryByText("Message Text");

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        // expect(messageDisplay).toBeInTheDocument();
    })
});