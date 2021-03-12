import React from 'react';
import {fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    const input = 'asdf'
    userEvent.type(firstNameInput, input)

    const error = screen.queryByText(/Error: firstName must have at least 5 characters/i)
    expect(error).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const button = screen.getByTitle('submit')

    const firstNameInput = screen.getByLabelText('First Name*')
    // const lastNameInput = screen.getByLabelText('Last Name*')
    // const emailInput = screen.getByLabelText('Email*')
    userEvent.click(button)
    const firstError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    const lastError = screen.queryByText(/Error: lastName is a required field./i)
    const emailError = screen.queryByText(/Error: email must be a valid email address./i)
    expect(firstError).toBeInTheDocument()
    expect(lastError).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const Pookie = 'Pookie'
    const Mookie = 'Mookie'
    const Wookie = 'Wookie'
    const button = screen.getByTitle('submit')
    const firstNameInput = screen.getByLabelText('First Name*')
    const lastNameInput = screen.getByLabelText('Last Name*')
    const emailInput = screen.getByLabelText('Email*')

    userEvent.type(firstNameInput, Pookie)
    userEvent.type(lastNameInput, Mookie)
    userEvent.click(button)
    const emailError = screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeInTheDocument()

    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const Pookie = 'Pookie'
    const Mookie = 'Mookie'
    const Wookie = 'Wookie'
    const button = screen.getByTitle('submit')
    const firstNameInput = screen.getByLabelText('First Name*')
    const lastNameInput = screen.getByLabelText('Last Name*')
    const emailInput = screen.getByLabelText('Email*')

    userEvent.type(firstNameInput, Pookie)
    userEvent.type(lastNameInput, Mookie)
    userEvent.type(emailInput, Wookie)
    userEvent.click(button)
    const emailError = screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const Pookie = 'Pookie'
    const Mookie = 'Mookie'
    const Wookie = 'Wookie'
    const button = screen.getByTitle('submit')
    const firstNameInput = screen.getByLabelText('First Name*')
    const lastNameInput = screen.getByLabelText('Last Name*')
    const emailInput = screen.getByLabelText('Email*')

    userEvent.type(firstNameInput, Pookie)
    userEvent.type(emailInput, Wookie)
    userEvent.click(button)
    const lastError = screen.queryByText(/Error: lastName is a required field./i)
    expect(lastError).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const Pookie = 'Pookie'
    const Mookie = 'Mookie'
    const Wookie = 'Wookie@gmail.com'
    const button = screen.getByTitle('submit')
    const firstNameInput = screen.getByLabelText('First Name*')
    const lastNameInput = screen.getByLabelText('Last Name*')
    const emailInput = screen.getByLabelText('Email*')

    userEvent.type(firstNameInput, Pookie)
    userEvent.type(lastNameInput,Mookie)
    userEvent.type(emailInput, Wookie)
    userEvent.click(button)
    const message = screen.queryByText(/Message: /i)
    const firstNameRender = screen.getByTestId("firstnameDisplay")
    const lastNameRender = screen.getByTestId("lastnameDisplay")
    const EmailRender = screen.getByTestId("emailDisplay")
    const messageRender = screen.queryByTestId("messageDisplay")
    expect(messageRender).not.toBeInTheDocument()
    expect(firstNameRender).toBeInTheDocument()
    expect(lastNameRender).toBeInTheDocument()
    expect(EmailRender).toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const Pookie = 'Pookie'
    const Mookie = 'Mookie'
    const Wookie = 'Wookie@gmail.com'
    const Choopie = 'Choopie ipsum'
    const button = screen.getByTitle('submit')
    const firstNameInput = screen.getByLabelText('First Name*')
    const lastNameInput = screen.getByLabelText('Last Name*')
    const emailInput = screen.getByLabelText('Email*')
    const messageInput = screen.getByLabelText('Message')

    userEvent.type(firstNameInput, Pookie)
    userEvent.type(lastNameInput,Mookie)
    userEvent.type(emailInput, Wookie)
    userEvent.type(messageInput, Choopie)
    userEvent.click(button)
    // const firstNameRender = screen.getByTestId("firstnameDisplay")
    // const lastNameRender = screen.getByTestId("lastnameDisplay")
    // const EmailRender = screen.getByTestId("emailDisplay")
    // const messageRender = screen.queryByTestId("messageDisplay")

    const firstNameRender = screen.getByTestId("firstnameDisplay")
    const lastNameRender = screen.getByTestId("lastnameDisplay")
    const EmailRender = screen.getByTestId("emailDisplay")
    const messageRender = screen.queryByTestId("messageDisplay")
    expect(messageRender).toBeInTheDocument()
    expect(firstNameRender).toBeInTheDocument()
    expect(lastNameRender).toBeInTheDocument()
    expect(EmailRender).toBeInTheDocument()
});