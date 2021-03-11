import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Edd");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Joe')
    userEvent.click(submit);
    const fErrInput = screen.queryByTestId('firsterror');
    expect(fErrInput).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submit = screen.queryByTestId("submit");
    userEvent.click(submit);
    const fErrInput = screen.queryByTestId('firsterror');
    const lErrInput = screen.queryByTestId('lasterror');
    const eErrInput = screen.queryByTestId('emailerror');
    expect(fErrInput).toBeInTheDocument();
    expect(lErrInput).toBeInTheDocument();
    expect(eErrInput).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Edd");
    const lastNInput = screen.getByPlaceholderText("Burke");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Jason');
    userEvent.type(lastNInput, 'Corchado');
    userEvent.click(submit);
    const eErrInput = screen.queryByTestId('emailerror'); 
    expect(eErrInput).toBeInTheDocument();   
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Edd");
    const lastNInput = screen.getByPlaceholderText("Burke");
    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Jason');
    userEvent.type(lastNInput, 'Corchado');
    userEvent.type(emailInput, 'joe')
    userEvent.click(submit);
    const eErrInput = screen.queryByTestId('emailerror'); 
    expect(eErrInput).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Edd");
    const lastNInput = screen.getByPlaceholderText("Burke");
    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Jason');
    userEvent.type(lastNInput, '');
    userEvent.type(emailInput, 'joe')
    userEvent.click(submit);
    const lErrInput = screen.queryByTestId('lasterror');
    expect(lErrInput).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Edd");
    const lastNInput = screen.getByPlaceholderText("Burke");
    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Jason');
    userEvent.type(lastNInput, 'Corchado');
    userEvent.type(emailInput, 'Jason@jason.com')
    userEvent.click(submit);
    const firstN = screen.queryByTestId('firstnameDisplay');
    const lastN = screen.queryByTestId('lastnameDisplay');
    const email = screen.queryByTestId('emailDisplay');
    expect(firstN).toBeInTheDocument();
    expect(lastN).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Edd");
    const lastNInput = screen.getByPlaceholderText("Burke");
    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    const messageInput = screen.getByPlaceholderText("message");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Jason');
    userEvent.type(lastNInput, 'Corchado');
    userEvent.type(emailInput, 'Jason@jason.com')
    userEvent.type(messageInput, 'test')
    userEvent.click(submit);
    const firstN = screen.queryByTestId('firstnameDisplay');
    const lastN = screen.queryByTestId('lastnameDisplay');
    const email = screen.queryByTestId('emailDisplay');
    const message = screen.queryByTestId('messageDisplay');
    expect(firstN).toBeInTheDocument();
    expect(lastN).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
});