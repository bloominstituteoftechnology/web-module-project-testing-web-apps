import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, "Ty")

    const firstNameError = screen.queryByTestId('error')
    expect(firstNameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitBttn = screen.getByRole('button')
    userEvent.click(submitBttn);

    
    const allInputErrors = screen.queryAllByTestId('error');
    expect(allInputErrors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, "Tyler")

    const lastName = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastName, "Harris")

    const submitBttn = screen.getByRole("button");
    userEvent.click(submitBttn);


    const emailError = screen.queryAllByTestId('error')
    expect(emailError).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, "Tyler")

    const lastName = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastName, "Harris")

    const email = screen.getByLabelText(/Email*/i)
    userEvent.type(email, "NotValidEmail")

    const submitBttn = screen.getByRole("button");
    userEvent.click(submitBttn);

    const newEmailError = screen.queryByTestId('error')
    expect(newEmailError).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, "Tyler")

    const email = screen.getByLabelText(/Email*/i)
    userEvent.type(email, "bobby@bobby.com")

    const submitBttn = screen.getByRole("button");
    userEvent.click(submitBttn);

    const lastNameError = screen.queryByTestId('error')
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const result = render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, "Tyler")

    const lastName = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastName, "Harris")

    const email = screen.getByLabelText(/Email*/i)
    userEvent.type(email, "bobby@bobby.com")

    const message = screen.queryByText(/Submitted/i)
    expect(message).toBeFalsy();

    const submitBttn = screen.getByRole("button");
    userEvent.click(submitBttn);

    const firstNameShows = result.container.querySelector("#firstName")
    const lastNameShows = result.container.querySelector("#lastName")
    const emailShows = result.container.querySelector("#email")

    expect(firstNameShows).toBeVisible();
    expect(lastNameShows).toBeVisible();
    expect(emailShows).toBeVisible();
});
test('renders all fields text when all fields are submitted.', async () => {
    const result = render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName, "Tyler")

    const lastName = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastName, "Harris")

    const email = screen.getByLabelText(/Email*/i)
    userEvent.type(email, "bobby@bobby.com")

    const message = screen.getByLabelText(/Message/i)
    userEvent.type(message, "Message Exists Here")

    const submitBttn = screen.getByRole("button");
    userEvent.click(submitBttn);

    const firstNameShows = result.container.querySelector("#firstName")
    const lastNameShows = result.container.querySelector("#lastName")
    const emailShows = result.container.querySelector("#email")
    const messageShows = result.container.querySelector('#message')

    expect(firstNameShows).toBeVisible();
    expect(lastNameShows).toBeVisible();
    expect(emailShows).toBeVisible();
    expect(messageShows).toBeVisible();
});