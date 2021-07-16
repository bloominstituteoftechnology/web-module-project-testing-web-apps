import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render( <ContactForm />)
});

test('renders the contact form header', ()=> {
    render( <ContactForm />)

    const header = screen.queryByText('Contact Form')
    expect(header).toBeTruthy()
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, "abc")

    const errorMessage = await screen.findAllByTestId("error")
    expect(errorMessage).toHaveLength(1) 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const submit = screen.getByRole('button')
    userEvent.click(submit)
    
    await waitFor(() => {
        const errorMessage = screen.queryAllByTestId('error')
        expect(errorMessage).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'abcde')

    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'abcde')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        const errorMessage = screen.queryAllByTestId('error')
        expect(errorMessage).toHaveLength(1)
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const email = screen.getByLabelText('Email*');
    userEvent.type(email, 'abc@')

    const errorMessage = await screen.findByText(/email must be a valid email address./i);
    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const submit = screen.getByRole('button')
    userEvent.click(submit)

    const errorMessage = await screen.findByText(/lastName is a required field./i)
    expect(errorMessage).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'abcde')

    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'fghijk')

    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'abc@def.com')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor (() => {
        const showFirst = screen.queryByText('abcde')
        expect(showFirst).toBeInTheDocument()

        const showLast = screen.queryByText('fghijk')
        expect(showLast).toBeInTheDocument()

        const showEmail = screen.queryByText('abc@def.com')
        expect(showEmail).toBeInTheDocument()

        const showMessage = screen.queryByTestId('Live Laugh Code')
        expect(showMessage).not.toBeInTheDocument()
    })


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'abcde')

    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'fghijk')

    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'abc@def.com')

    const message = screen.getByLabelText('Message')
    userEvent.type(message, 'message')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        const showFirst = screen.queryByText('abcde')
        expect(showFirst).toBeInTheDocument()

        const showLast = screen.queryByText('fghijk')
        expect(showLast).toBeInTheDocument()

        const showEmail = screen.queryByText('abc@def.com')
        expect(showEmail).toBeInTheDocument()

        const showMessage = screen.queryByTestId(/message/i)
        expect(showMessage).toBeInTheDocument()
    })
});