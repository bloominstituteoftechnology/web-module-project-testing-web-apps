import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<App/>);
});

test('renders the contact form header', ()=> {
    render(<App/>);
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Contact Form");
    expect(header).not.toBeFalsy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<App/>);
    const  firstLabel =   screen.getByLabelText(/First Name*/i)
    expect(firstLabel).toBeInTheDocument();
    userEvent.type(firstLabel,'1234');
    const firstError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(firstError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<App/>)
    const button = screen.queryByText('Submit');
    expect(button).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});