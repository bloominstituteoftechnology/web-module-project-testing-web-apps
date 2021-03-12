import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
    const errors = screen.queryAllByText(/^(.*?(error)[^$]*)$/i)
    expect(errors.length).toEqual(0)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent("Contact Form")
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const username = screen.getByLabelText("First Name*")
    userEvent.type(username, "abc")
    const errors = screen.queryAllByText(/^(.*?(error)[^$]*)$/i)
    expect(errors.length).toEqual(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submit = screen.queryByTestId("submit")
    userEvent.click(submit)
    const errors = screen.queryAllByText(/^(.*?(error)[^$]*)$/i)
    expect(errors.length).toEqual(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const username = screen.getByLabelText("First Name*")
    userEvent.type(username, "abcdef")
    const lastname = screen.getByLabelText("Last Name*")
    userEvent.type(lastname, "abcdef")
    const submit = screen.queryByTestId("submit")
    userEvent.click(submit)
    const errors = screen.queryAllByText(/^(.*?(error)[^$]*)$/i)
    expect(errors.length).toEqual(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText("Email*")
    userEvent.type(email, "abcdef")
    const errors = screen.queryAllByText(/^(.*?(email must be a valid email address)[^$]*)$/i)
    expect(errors.length).toEqual(1)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const submit = screen.queryByTestId("submit")
    userEvent.click(submit)
    const errors = screen.queryAllByText(/^(.*?(lastName is a required field)[^$]*)$/i)
    expect(errors.length).toEqual(1)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const username = screen.getByLabelText("First Name*")
    userEvent.type(username, "abcdef")
    const lastname = screen.getByLabelText("Last Name*")
    userEvent.type(lastname, "abcdef")
    const email = screen.getByLabelText("Email*")
    userEvent.type(email, "abcdef@gmail.com")
    const submit = screen.queryByTestId("submit")
    userEvent.click(submit)
    
    const fNameSubmit = screen.queryByText(/First Name:/i)
    expect(fNameSubmit).toBeInTheDocument()
    const lNameSubmit = screen.queryByText(/Last Name:/i)
    expect(lNameSubmit).toBeInTheDocument()
    const emailSubmit = screen.queryByText(/Email:/i)
    expect(emailSubmit).toBeInTheDocument()
    const messageSubmit = screen.queryByText(/Message:/i)
    expect(messageSubmit).not.toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const username = screen.getByLabelText("First Name*")
    userEvent.type(username, "abcdef")
    const lastname = screen.getByLabelText("Last Name*")
    userEvent.type(lastname, "abcdef")
    const email = screen.getByLabelText("Email*")
    userEvent.type(email, "abcdef@gmail.com")
    const message = screen.getByLabelText("Message")
    userEvent.type(message, "I am a test message")
    const submit = screen.queryByTestId("submit")
    userEvent.click(submit)

    const fNameSubmit = screen.queryByText(/First Name:/i)
    expect(fNameSubmit).toBeInTheDocument()
    const lNameSubmit = screen.queryByText(/Last Name:/i)
    expect(lNameSubmit).toBeInTheDocument()
    const emailSubmit = screen.queryByText(/Email:/i)
    expect(emailSubmit).toBeInTheDocument()
    const messageSubmit = screen.queryByText(/Message:/i)
    expect(messageSubmit).toBeInTheDocument()
});