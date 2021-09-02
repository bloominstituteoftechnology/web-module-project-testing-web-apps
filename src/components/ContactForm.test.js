import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});
test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "leo");
    const firstNameError = screen.queryByTestId('error')
    expect(firstNameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(()=> {
        const Error = screen.getAllByTestId(/error/i);
        expect(Error).toBeTruthy();
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "starry");
    const lastNameInupt = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInupt, 'hornet');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'lol');
    const emailError = screen.queryByTestId('error')
    expect(emailError).toBeInTheDocument();
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'lol');
    const emailError = screen.queryByTestId('error')
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "starry");


    
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'starryhornet863@gmail.com');
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=> {
      const lastNameError = screen.queryByText('Error: lastName is a required field.');
      expect(lastNameError).toBeInTheDocument();
    });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "starry");

    const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "hornet");
    
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'starryhornet863@gmail.com');

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "starry");

    const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "hornet");
    
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'starryhornet863@gmail.com');
    const Message = screen.getByLabelText('Message')
    userEvent.type(Message, 'helllo how you doing')
    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(Message).toBeInTheDocument();
});