import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const headerEl = screen.queryByText(/contact form/i);
    expect(headerEl).toHaveTextContent(/contact form/i);
    expect(headerEl).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
        const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, 'joe')
    await waitFor(()=>{
        const noFirst = screen.queryByText(/must have at least 5 characters./i);
        expect(noFirst).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole('button')
    userEvent.click(button);

    await waitFor(()=>{
        const noFirst = screen.queryByText(/must have at least 5 characters./i);
        const noLast = screen.queryByText(/is a required field./i);
        const noEmail = screen.queryByText(/must be a valid email address./i);
        expect(noFirst).toBeInTheDocument();
        expect(noLast).toBeInTheDocument();
        expect(noEmail).toBeInTheDocument();
    })


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)

    userEvent.type(firstName, 'jacoby')
    userEvent.type(lastName, 'jacoby')

    const button = screen.getByRole('button')
    userEvent.click(button);

    await waitFor(()=>{
        const noEmail = screen.queryByText(/must be a valid email address./i);
        const noFirst = screen.queryByText(/must have at least 5 characters./i);
        const noLast = screen.queryByText(/is a required field./i);
        expect(noEmail).toBeInTheDocument();
        expect(noFirst).not.toBeInTheDocument();
        expect(noLast).not.toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'noemail')
    await waitFor(()=>{
        const noEmail = screen.queryByText(/must be a valid email address./i);
        expect(noEmail).toBeInTheDocument();
    })

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole('button')
    userEvent.click(button);

    await waitFor(()=>{
       
        const noLast = screen.queryByText(/is a required field./i);
        expect(noLast).toBeInTheDocument();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)
    const email = screen.getByLabelText(/email/i)

    userEvent.type(email, 'noemail@noemail.com')
    userEvent.type(firstName, 'nathan')
    userEvent.type(lastName, 'cheney')

    const button = screen.getByRole('button')
    userEvent.click(button);

    await waitFor(()=>{
        const noEmail = screen.queryByText(/must be a valid email address./i);
        const noFirst = screen.queryByText(/must have at least 5 characters./i);
        const noLast = screen.queryByText(/is a required field./i);
        expect(noEmail).not.toBeInTheDocument();
        expect(noFirst).not.toBeInTheDocument();
        expect(noLast).not.toBeInTheDocument();
    })
    const renderEmail = screen.getByTestId(/email/i)
    const renderFirst = screen.queryByTestId(/firstname/i)
    const renderLast = screen.queryByTestId(/lastname/i)
    const renderMessage = screen.queryByTestId(/message/i)
    expect(renderEmail).toBeInTheDocument();
    expect(renderFirst).toBeInTheDocument();
    expect(renderLast).toBeInTheDocument();
    expect(renderMessage).not.toBeInTheDocument();
        
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)
    const email = screen.getByLabelText(/email/i)
    const message = screen.getByLabelText(/message/i)

    userEvent.type(email, 'noemail@noemail.com')
    userEvent.type(firstName, 'nathan')
    userEvent.type(lastName, 'cheney')
    userEvent.type(message, `I'm from Missouri`)

    const button = screen.getByRole('button')
    userEvent.click(button);

    await waitFor(()=>{
        const noEmail = screen.queryByText(/must be a valid email address./i);
        const noFirst = screen.queryByText(/must have at least 5 characters./i);
        const noLast = screen.queryByText(/is a required field./i);
        expect(noEmail).not.toBeInTheDocument();
        expect(noFirst).not.toBeInTheDocument();
        expect(noLast).not.toBeInTheDocument();
    })
    const renderEmail = screen.getByTestId(/email/i)
    const renderFirst = screen.queryByTestId(/firstname/i)
    const renderLast = screen.queryByTestId(/lastname/i)
    const renderMessage = screen.queryByTestId(/message/i)
    expect(renderEmail).toBeInTheDocument();
    expect(renderFirst).toBeInTheDocument();
    expect(renderLast).toBeInTheDocument();
    expect(renderMessage).toBeInTheDocument();
});