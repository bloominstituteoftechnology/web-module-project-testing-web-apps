import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const formHeader = screen.queryByText(/contact form/i);
    console.log(formHeader);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const nameError = screen.getByLabelText("First Name*");
    userEvent.type(nameError, "San");

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, 'Zachary');

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "Cooremans");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "T");

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, 'Zachary');

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "Z@z.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, 'Zachary');

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "Cooremans");

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "Z@z.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const displayFirst = await screen.getByTestId("firstnameDisplay");
    const displaySecond = await screen.getByTestId("lastnameDisplay");
    const displayThird = await screen.getByTestId("emailDisplay");
    const displayFourth = await screen.queryByTestId("messageDisplay");
    
    expect(displayFirst).toBeInTheDocument();
    expect(displaySecond).toBeInTheDocument();
    expect(displayThird).toBeInTheDocument();
    expect(displayFourth).not.toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, 'Zachary');

    const lastName = screen.getByLabelText("Last Name*");
    userEvent.type(lastName, "Cooremans");

    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "Z@z.com");

    const message = screen.getByLabelText("Message");
    userEvent.type(message, 'THIS IS MESSAGE')

    const button = screen.getByRole("button");
    userEvent.click(button);

    const displayFirst = await screen.getByTestId("firstnameDisplay");
    const displaySecond = await screen.getByTestId("lastnameDisplay");
    const displayThird = await screen.getByTestId("emailDisplay");
    const displayFourth = await screen.getByTestId("messageDisplay");
    
    expect(displayFirst).toBeInTheDocument();
    expect(displaySecond).toBeInTheDocument();
    expect(displayThird).toBeInTheDocument();
    expect(displayFourth).toBeInTheDocument();
});