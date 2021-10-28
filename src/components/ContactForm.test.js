import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
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
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "feli");
    
    await waitFor(()=> {
    const errFirstName = screen.queryByText(/must have at least 5 characters./i);
    expect(errFirstName).toBeInTheDocument();
    });
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByTestId("button");
    userEvent.click(button)

    await waitFor (()=> {
    const errFirstName = screen.queryByText(/must have at least 5 characters./i);
    expect(errFirstName).toBeInTheDocument();

    const errLastName = screen.queryByText(/is a required field./i);
    expect(errLastName).toBeInTheDocument();

    const errEmail = screen.queryByText(/must be a valid email address./i);
    expect(errEmail).toBeInTheDocument();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Felix");
    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Costa");

    const button = screen.getByTestId("button");
    userEvent.click(button)

    await waitFor(()=>{
        const errFirstName = screen.queryByText(/must have at least 5 characters./i);
    expect(errFirstName).not.toBeInTheDocument();

        const errLastName = screen.queryByText(/is a required field./i);
    expect(errLastName).not.toBeInTheDocument();

        const errEmail = screen.queryByText(/must be a valid email address./i);
    expect(errEmail).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, "hah.com");

    await waitFor(()=>{
         const errEmail = screen.queryByText(/must be a valid email address./i);
    expect(errEmail).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Felix");
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, "haha@yahoo.com");

    const button = screen.getByTestId("button");
    userEvent.click(button)

    await waitFor(()=>{
        const errFirstName = screen.queryByText(/must have at least 5 characters./i);
    expect(errFirstName).not.toBeInTheDocument();

        const errLastName = screen.queryByText(/is a required field./i);
    expect(errLastName).toBeInTheDocument();

        const errEmail = screen.queryByText(/must be a valid email address./i);
    expect(errEmail).not.toBeInTheDocument();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Felix");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Costa");

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, "haha@yahoo.com");

    const button = screen.getByTestId("button");
    userEvent.click(button)

    await waitFor(()=>{
        const outputF = screen.queryByText(/Felix/i);
        expect(outputF).toBeInTheDocument();

        const outputL = screen.queryByText(/Costa/i);
        expect(outputL).toBeInTheDocument();

        const outputE = screen.queryByText(/haha@yahoo.com/i);
        expect(outputE).toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Felix");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Costa");

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, "haha@yahoo.com");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "hey");

    const button = screen.getByTestId("button");
    userEvent.click(button)

    await waitFor(()=>{
        const outputF = screen.queryByText(/Felix/i);
        expect(outputF).toBeInTheDocument();

        const outputL = screen.queryByText(/Costa/i);
        expect(outputL).toBeInTheDocument();

        const outputE = screen.queryByText(/haha@yahoo.com/i);
        expect(outputE).toBeInTheDocument();
    })
});