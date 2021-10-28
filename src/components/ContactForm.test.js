import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent'

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header =screen.getByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, "Alex");
    const errorMessage = screen.getByText(/must have at least 5 characters/i);
    expect(errorMessage).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submit = screen.getByRole('button');
    userEvent.click(submit);
    const errorMessage1 = screen.getByText(/must have at least 5 characters/i);
    const errorMessage2 = screen.getByText(/must be a valid email address./i);
    const errorMessage3 = screen.getByText(/is a required field/i);
    expect(errorMessage1).toBeTruthy();
    expect(errorMessage2).toBeTruthy();
    expect(errorMessage3).toBeTruthy();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstname = screen.getByLabelText(/First Name*/i);
    const lastname = screen.getByLabelText(/Last Name*/i);
    userEvent.type(firstname, "Alexander");
    userEvent.type(lastname, "Hoskins");
    const submit = screen.getByRole('button');
    userEvent.click(submit);
    const errorMessage2 = screen.getByText(/must be a valid email address./i);
    expect(errorMessage2).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "Alex");
    const errorMessage = screen.getByText(/must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/Email*/i);
    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, "Alexander");
    userEvent.type(email, "a@a.com");
    const submit = screen.getByRole('button');
    userEvent.click(submit);
    const errorMessage = screen.getByText(/lastName is a required field/i);
    expect(errorMessage).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/Email*/i);
    const firstname = screen.getByLabelText(/First Name*/i);
    const lastname = screen.getByLabelText(/Last Name*/i);
    const submit = screen.getByRole('button');
    userEvent.type(firstname, "Alexander");
    userEvent.type(lastname, "Hoskins");
    userEvent.type(email, "a@a.com");
    userEvent.click(submit);
    const firstNameRendered = await screen.findByTestId(/firstnameDisplay/i);
    const lastNameRendered = screen.getByTestId(/lastnameDisplay/i);
    const emailRendered = screen.getByTestId(/emailDisplay/i);
    const messageRendered = screen.queryByTestId(/messageDisplay/i);
    expect(firstNameRendered).toBeTruthy();
    expect(lastNameRendered).toBeTruthy();
    expect(emailRendered).toBeTruthy();
    expect(messageRendered).not.toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/Email*/i);
    const firstname = screen.getByLabelText(/First Name*/i);
    const lastname = screen.getByLabelText(/Last Name*/i);
    const message = screen.getByLabelText(/Message*/i);
    const submit = screen.getByRole('button');
    userEvent.type(firstname, "Alexander");
    userEvent.type(lastname, "Hoskins");
    userEvent.type(email, "a@a.com");
    userEvent.type(message, "Hello World");
    userEvent.click(submit);
    const firstNameRendered = await screen.findByTestId(/firstnameDisplay/i);
    const lastNameRendered = screen.getByTestId(/lastnameDisplay/i);
    const emailRendered = screen.getByTestId(/emailDisplay/i);
    const messageRendered = screen.getByTestId(/messageDisplay/i);
    expect(firstNameRendered).toBeTruthy();
    expect(lastNameRendered).toBeTruthy();
    expect(emailRendered).toBeTruthy();
    expect(messageRendered).toBeTruthy();
});