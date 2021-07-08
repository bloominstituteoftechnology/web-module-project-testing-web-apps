import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render( <ContactForm />)
});

test('renders the contact form header', ()=> {
    render( <ContactForm />)
    const header = screen.getByRole('h1')
    expect(header).toHaveValue('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render( <ContactForm />)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render( <ContactForm />)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render( <ContactForm />)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render( <ContactForm />)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render( <ContactForm />)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render( <ContactForm />)
});

test('renders all fields text when all fields are submitted.', async () => {
    render( <ContactForm />)
});