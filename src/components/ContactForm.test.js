import React from 'react';
import {getByText, render, screen, waitFor, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
  const header = screen.getByText(/Contact Form/i)
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const fName = screen.getByLabelText('First Name*')
    const lName = screen.getByLabelText('Last Name*')
    const email = screen.getByLabelText('Email*');

    userEvent.type(fName, 'S')
    userEvent.type(lName, 'Khan')
    userEvent.type(email, 'saeed@skdevelopment.org')

    const error = screen.getByText(/firstName must have at least 5 characters/i)

    expect(error).toBeVisible();
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const fName = screen.getByLabelText('First Name*')
    const lName = screen.getByLabelText('Last Name*')
    const email = screen.getByLabelText('Email*')
    const submitButton = screen.getByTestId("submitButton");

    userEvent.type(fName, '')
    userEvent.type(lName, '')
    userEvent.type(email, '')
    userEvent.click(submitButton)

    const error = screen.getAllByText(/error/i)
    expect(error)

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const fName = screen.getByLabelText('First Name*')
    const lName = screen.getByLabelText('Last Name*')
    const email = screen.getByLabelText('Email*')
    const submitButton = screen.getByTestId("submitButton");

    userEvent.type(fName, 'saeed')
    userEvent.type(lName, 'khan')
    userEvent.type(email, 'testing')
    userEvent.click(submitButton)

    const error = screen.getAllByText(/email must be a valid email address/i)

    expect(error).toBeVisible();


});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText(/email/i)

    userEvent.type(email, 'test')

    const error = screen.getAllByText(/email must be a valid email address/i)

    expect(error).toBeVisible()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const lName = screen.getByLabelText(/last name/i)
    const submitButton = screen.getByTestId('submitButton')

    userEvent.type(lName, '')
    userEvent.click(submitButton)

    const error = screen.getAllByText(/lastName is a required field/i)
    expect(error).toBeVisible()

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const fName = screen.getByLabelText(/first name/i)
    const lName = screen.getByLabelText(/last name/i)
    const email = screen.getByLabelText(/email/i)

    userEvent.type(fName, 'saeed')
    userEvent.type(lName, 'khan')
    userEvent.type(email, 'saeed@testing.com')
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const fName = screen.getByLabelText(/first name/i)
    const lName = screen.getByLabelText(/last name/i)
    const email = screen.getByLabelText(/email/i)

    userEvent.type(fName, 'saeed')
    userEvent.type(lName, 'khan')
    userEvent.type(email, 'saeed@testing.com')
});