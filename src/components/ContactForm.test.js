  
import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', async ()=> {
    render(<ContactForm/>)

    const header = await screen.findByText(/Contact Form/i)

    expect(header).toBeVisible
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")

    userEvent.type(firstName, "Edd")
    userEvent.type(lastName, "Burke")
    userEvent.type(email, "bluebill1049@hotmail.com")

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")

    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "Harleen")
    userEvent.type(lastName, "Quinzel")
    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "Harleen")
    userEvent.type(lastName, "Quinzel")
    userEvent.type(email, "Hello, Mistah Jay <3")
    userEvent.click(button)

    const emailError = await screen.findByText(/email must be a valid email address/i)

    expect(emailError).toBeInTheDocument
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "Harleen")
    userEvent.type(email, "doctorharley@arkhamasylum.com")
    userEvent.click(button)

    const lastNameError = await screen.findByText(/lastName is a required field/i)

    expect(lastNameError).toBeInTheDocument
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "Harleen")
    userEvent.type(lastName, "Quinzel")
    userEvent.type(email, "doctorharley@arkhamasylum.com")
    userEvent.click(button)

    const submittedFirst = await screen.findByText(/Harleen/i)
    const submittedLast = await screen.findByText(/Quinzel/i)
    const submittedEmail = await screen.findByText(/doctorharley@arkhamasylum.com/i)
    
    expect(submittedFirst).toBeVisible
    expect(submittedLast).toBeVisible
    expect(submittedEmail).toBeVisible
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")
    const message = screen.getByLabelText("Message")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "Harleen")
    userEvent.type(lastName, "Quinzel")
    userEvent.type(email, "doctorharley@arkhamasylum.com")
    userEvent.type(message, "Hello, Mistah Jay")
    userEvent.click(button)

    const submittedFirst = await screen.findByText(/Harleen/i)
    const submittedLast = await screen.findByText(/Quinzel/i)
    const submittedEmail = await screen.findByText(/doctorharley@arkhamasylum.com/i)
    const submittedMessage = await screen.findByDisplayValue("Hello, Mistah Jay")
    
    expect(submittedFirst).toBeVisible
    expect(submittedLast).toBeVisible
    expect(submittedEmail).toBeVisible
    expect(submittedMessage).toBeVisible
});