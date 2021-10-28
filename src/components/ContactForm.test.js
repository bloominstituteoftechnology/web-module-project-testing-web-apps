import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)

    
});

test('renders the contact form header', ()=> {
   render(<ContactForm/>)
    const header = screen.queryByText(/Contact Form/i)
    expect(header).toBeInTheDocument();   
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, 'name')
    const errorMessage = await screen.findAllByTestId('error')
    expect(errorMessage).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)
    await waitFor (() => {
        const errorMessage = screen.queryAllByTestId('error')
        expect(errorMessage).toHaveLength(3)
    })
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, 'homer');

    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName, 'simpson');

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

    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i)
    expect(errorMessage).toBeInTheDocument();

    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name*/i);
    const emailField = screen.getByLabelText(/email*/i);

    userEvent.type(firstNameField, "homer");
    userEvent.type(lastNameField, "simpson");
    userEvent.type(emailField, "homer@aol.com");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstName = screen.queryByText("homer");
        const lastName = screen.queryByText("simpson");
        const email = screen.queryByText("homer@aol.com");
        const message = screen.queryByTestId("message");

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(message).not.toBeInTheDocument();
    })
});
    

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name/i)
    const lastNameField = screen.getByLabelText(/last name*/i);
    const emailField = screen.getByLabelText(/email*/i);
    const messageField = screen.getByLabelText(/message/i);

    userEvent.type(firstNameField, 'homer');
    userEvent.type(lastNameField, "simpson");
    userEvent.type(emailField, "homer@aol.com");
    userEvent.type(messageField, "Message Text");

    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('homer')
        const lastNameDisplay = screen.queryByText('simpson')
        const emailDisplay = screen.queryByText('homer@aol.com')

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
    })

    
});