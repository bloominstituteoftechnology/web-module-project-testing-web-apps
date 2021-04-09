import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

var first = "Francis"
var last = "Nguyen"
var email = "aaa@aa.com"
var note = "uber cool notes"

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)

    const header = screen.getByText("Contact Form")

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstInput, "Fran");

    const errorText = await screen.getByText(/Error: firstName must have at least 5 characters./i)
    expect(errorText).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton);
    
    const firstNameError = await screen.getByText(/Error: firstName must have at least 5 characters./i)
    expect(firstNameError).toBeInTheDocument();
    const lastNameError = await screen.getByText(/Error: lastName is a required field./i)
    expect(lastNameError).toBeInTheDocument();
    const emailError = await screen.getByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstInput, first);

    const lastInput = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastInput, last);

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton);
    
    const firstNameError = await screen.queryByText(/Error: firstName must have at least 5 characters./i)
    expect(firstNameError).toBeFalsy();
    const lastNameError = await screen.queryByText(/Error: lastName is a required field./i)
    expect(lastNameError).toBeFalsy();
    const emailError = await screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeTruthy();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "bademail");

    const emailError = await screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeTruthy();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstInput, first);

    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, email);

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton);
    
    const firstNameError = await screen.queryByText(/Error: firstName must have at least 5 characters./i)
    expect(firstNameError).toBeFalsy();
    const lastNameError = await screen.queryByText(/Error: lastName is a required field./i)
    expect(lastNameError).toBeTruthy();
    const emailError = await screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeFalsy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstInput, first);
    const lastInput = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastInput, last);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, email);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const firstResult = await screen.queryByTestId(/firstnamedisplay/i);
    expect(firstResult).toContainHTML(first);
    const lastResult = await screen.queryByTestId(/lastnamedisplay/i);
    expect(lastResult).toContainHTML(last);
    const emailResult = await screen.queryByTestId(/emaildisplay/i);
    expect(emailResult).toContainHTML(email);
    const messageResult = await screen.queryByTestId(/messagedisplay/i);
    expect(messageResult).not.toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstInput, first);
    const lastInput = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastInput, last);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, email);
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, note)
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const firstResult = await screen.queryByTestId(/firstnamedisplay/i);
    expect(firstResult).toBeInTheDocument();
    const lastResult = await screen.queryByTestId(/lastnamedisplay/i);
    expect(lastResult).toBeInTheDocument();
    const emailResult = await screen.queryByTestId(/emaildisplay/i);
    expect(emailResult).toBeInTheDocument();
    const messageResult = await screen.queryByTestId(/messagedisplay/i);
    expect(messageResult).toBeInTheDocument();
});