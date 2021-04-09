import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.getByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByPlaceholderText('Edd')
    userEvent.type(firstNameInput, 'Edd')
    const error = screen.getByText(/firstName must have at least 5 characters./i)
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button')
    userEvent.click(button)
    const firstError = await screen.findByText(/firstName must have at least 5 characters./i)
    const secondError = await screen.findByText(/lastName is a required field/i)
    const thirdError = await screen.findByText(/email must be a valid email address/i)
    expect(firstError).toBeInTheDocument();
    expect(secondError).toBeInTheDocument();
    expect(thirdError).toBeInTheDocument();
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByPlaceholderText('Edd');
    userEvent.type(firstNameInput, 'Daniel');
    const secondNameINput = screen.getByPlaceholderText('Burke');
    userEvent.type(secondNameINput, 'Brannon');
    const button = screen.getByRole("button")
    userEvent.click(button)
    const error = await screen.findByText(/email must be a valid email address/i);
    expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailInput, 'notARealEmail');
    const error = await screen.findByText(/email must be a valid email address/i);
    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole("button")
    userEvent.click(button)
    const error = await screen.findByText(/lastName is a required field/i);
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByPlaceholderText('Edd');
    userEvent.type(firstNameInput, 'Daniel');
    const secondNameInput = screen.getByPlaceholderText('Burke');
    userEvent.type(secondNameInput, 'Brannon');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailInput, 'daniel-brannon@hotmail.com');

    const button = screen.getByRole("button")
    userEvent.click(button);

    const firstNameOutput = await screen.findByText(/first name:/i, /daniel/i)
    const secondNameOutput = await screen.findByText(/last name:/i, /brannon/i)
    const emailOutput = await screen.findByText(/email:/i, /daniel-brannon@hotmail.com/i)

    expect(firstNameOutput).toBeInTheDocument();
    expect(secondNameOutput).toBeInTheDocument();
    expect(emailOutput).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByPlaceholderText('Edd');
    userEvent.type(firstNameInput, 'Daniel');
    const secondNameInput = screen.getByPlaceholderText('Burke');
    userEvent.type(secondNameInput, 'Brannon');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailInput, 'daniel-brannon@hotmail.com');
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, 'a');
    const button = screen.getByRole("button")
    userEvent.click(button);

    const firstNameOutput = await screen.findByText(/first name:/i, /daniel/i)
    const secondNameOutput = await screen.findByText(/last name:/i, /brannon/i)
    const emailOutput = await screen.findByText(/email:/i, /daniel-brannon@hotmail.com/i)
    const messageOutPut = await screen.findByText(/message:/i)

    expect(firstNameOutput).toBeInTheDocument();
    expect(secondNameOutput).toBeInTheDocument();
    expect(emailOutput).toBeInTheDocument();
    expect(messageOutPut).toBeInTheDocument();
});