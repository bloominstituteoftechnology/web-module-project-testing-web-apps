import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    const { getByText } = render(<ContactForm />);
    const header = getByText(/Contact Form/i);
    
    expect(header).toBeInTheDocument();
    expect(header).not.toBeUndefined();
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "Aidan")
    const errors = screen.queryAllByText(/error/i)
    expect(errors).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const firstName = screen.getByLabelText(/First Name/i)
    const lastName = screen.getByLabelText(/Last Name/i)
    const email = screen.getByLabelText(/Email/i)

    userEvent.type(firstName, "")
    userEvent.type(lastName, "")
    userEvent.type(email, "")

    const error1 = screen.queryAllByText(/error/i)
    expect(error1).toBeTruthy();
    const error2 = screen.queryAllByText(/error/i)
    expect(error2).toBeTruthy();
    const error3 = screen.queryAllByText(/error/i)
    expect(error3).toBeTruthy();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/First Name/i)
    const lastName = screen.getByLabelText(/Last Name/i)
    const email = screen.getByLabelText(/Email/i)

    userEvent.type(firstName,"test")
    userEvent.type(lastName,"test")
    userEvent.type(email,"")

    const erroremail = screen.queryAllByText(/error/i)
    expect(erroremail).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/First Name/i)
    const lastName = screen.getByLabelText(/Last Name/i)
    const email = screen.getByLabelText(/Email/i)

    userEvent.type(firstName,"test")
    userEvent.type(lastName,"test")
    userEvent.type(email,"testemail")

    const emailError = screen.queryByText(/email must be a valid email address/i)
    expect(emailError).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/First Name/i)
    const lastName = screen.getByLabelText(/last Name/i)
    const email = screen.getByLabelText(/Email/i)

    userEvent.type(firstName,"test")
    userEvent.type(lastName,"")
    userEvent.type(email,"example@email.com")

    const theButton = screen.getByRole("button");
    userEvent.click(theButton)

    const error = screen.queryAllByText(/lastName is a required field/i)
    expect(error).toBeTruthy();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name/i);
    const lastName = screen.getByLabelText(/Last Name/i);
    const email = screen.getByLabelText(/Email/i);
    const message = screen.getByLabelText(/Message/i)

    userEvent.type(message,"test")
    userEvent.type(email, "example@email.com");
    userEvent.type(lastName,"test")
    userEvent.type(firstName, "test");

    const button = screen.getByRole("button")
    userEvent.click(button)

    const firstSubmitted = screen.queryByTestId('firstnameDisplay')
    const lastSubmitted = screen.queryByTestId('lastnameDisplay')
    const emailSubmitted = screen.queryByTestId('emailDisplay')

    expect(firstSubmitted).toBeTruthy();
    expect(lastSubmitted).toBeTruthy();
    expect(emailSubmitted).toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

        const firstName = screen.getByLabelText(/First Name/i);
        const lastName = screen.getByLabelText(/Last Name/i);
        const email = screen.getByLabelText(/Email/i);
        const message = screen.getByLabelText(/Message/i)

        userEvent.type(message,"test")
        userEvent.type(email, "example@email.com");
        userEvent.type(lastName,"test")
        userEvent.type(firstName, "test");

        const button = screen.getByRole("button")
            userEvent.click(button)

            await waitFor(()=> {
                const firstSubmitted = screen.queryByTestId('firstnameDisplay')
                expect(firstSubmitted).toBeTruthy();
            })
            await waitFor(()=> {
                const lastSubmitted = screen.queryByTestId('lastnameDisplay')
                expect(lastSubmitted).toBeTruthy();
            })
            await waitFor(()=> {
                const emailSubmitted = screen.queryByTestId('emailDisplay')
                expect(emailSubmitted).toBeTruthy();
            })
            await waitFor(()=> {
                const messageSubmitted = screen.queryByTestId('messageDisplay')
                expect(messageSubmitted).toBeTruthy();
            })
});