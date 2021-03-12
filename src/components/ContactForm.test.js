import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

// Dom Elements
// Inputs
const firstnameInput = () => screen.getByLabelText(/first name/i)
const lastnameInput = () => screen.getByLabelText(/last name/i)
const emailInput = () => screen.getByLabelText(/email/i)
const messageInput = () => screen.getByLabelText(/message/i)
const submit = () => screen.getByRole('button')

// Displays
const firstnameDisplay = () => screen.queryByTestId('firstnameDisplay')
const lastnameDisplay = () => screen.queryByTestId('lastnameDisplay')
const emailDisplay = () => screen.queryByTestId('emailDisplay')
const messageDisplay = () => screen.queryByTestId('messageDisplay')

// errors
const errors = () => screen.queryAllByTestId('error')

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const header = screen.getByRole('heading')
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    userEvent.type(firstnameInput(), 'name')

    await waitFor(() => {
        expect(errors()).toHaveLength(1)
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    userEvent.click(submit())

    await waitFor(() => {
        expect(errors()).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    userEvent.type(firstnameInput(), 'Lindell')

    userEvent.type(lastnameInput(), 'Carter')

    userEvent.click(submit())

    await waitFor(() => {
        expect(errors()).toHaveLength(1)
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    
    userEvent.type(emailInput(), 'email')

    await waitFor(() => {
        expect(errors()[0])
            .toHaveTextContent(/email must be a valid email address/i)
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    userEvent.type(firstnameInput(), 'lindell')

    userEvent.type(emailInput(), 'email@email.com')
    
    userEvent.click(submit())

    await waitFor(() => {
        const error = errors()[0]
        expect(error).toHaveTextContent(/lastname is a required field/i)
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstname = 'firstname'
    const lastname = 'lastname'
    const email = 'email@email.com'

    userEvent.type(firstnameInput(), firstname)

    userEvent.type(lastnameInput(), lastname)
    
    userEvent.type(emailInput(), email)
    
    userEvent.click(submit())

    await waitFor(() => {
        expect(firstnameDisplay()).toHaveTextContent(firstname)
        expect(lastnameDisplay()).toHaveTextContent(lastname)
        expect(emailDisplay()).toHaveTextContent(email)
        expect(messageDisplay()).not.toBeInTheDocument()
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstname = 'firstname'
    const lastname = 'lastname'
    const email = 'email@email.com'
    const message = 'message'
    
    userEvent.type(firstnameInput(), firstname)

    userEvent.type(lastnameInput(), lastname)
    
    userEvent.type(emailInput(), email)
    
    userEvent.type(messageInput(), message)
    
    userEvent.click(submit())

    await waitFor(() => {
        expect(firstnameDisplay()).toHaveTextContent(firstname)
        expect(lastnameDisplay()).toHaveTextContent(lastname)
        expect(emailDisplay()).toHaveTextContent(email)
        expect(messageDisplay()).toHaveTextContent(message)
    })
});