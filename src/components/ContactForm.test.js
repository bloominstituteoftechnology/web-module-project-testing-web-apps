import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'asdf')

    await waitFor(() => {
        expect(firstNameInput).toThrowError
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const button = screen.getByRole('button')
    const firstNameInput = screen.getByLabelText('First Name*')
    const LastNameInput = screen.getByLabelText('Last Name*')
    const emailInput = screen.getByLabelText('Email*')

    userEvent.click(button)

    await waitFor(() => {
        expect(firstNameInput).toThrowError()
        expect(LastNameInput).toThrowError()
        expect(emailInput).toThrowError()
    })

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // render(<ContactForm />)
    // const Pookie = 'Pookie'
    // const Mookie = 'Mookie'
    // const Wookie = 'Wookie'
    // const button = screen.getByRole('button')
    // const firstNameInput = screen.getByLabelText('First Name*')
    // const LastNameInput = screen.getByLabelText('Last Name*')
    // const emailInput = screen.getByLabelText('Email*')

    // userEvent.type(firstNameInput, Pookie)
    // userEvent.type(LastNameInput, Mookie)
    // userEvent.click(button)

    // await waitFor(() => {
    //     expect(firstNameInput).toThrowError()
    // })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});