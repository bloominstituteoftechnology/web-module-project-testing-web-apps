import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)

});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const header = screen.findByText(/contact form/i)
    expect(header).toBeVisible


});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = screen.findByLabelText('firstname')
    userEvent.type(firstName, 'edd')
    expect(screen.findByText('Error: firstName must have at least 5 characters.'))
        .toBeVisible
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstName = screen.findByLabelText('firstname')
    const lastName = screen.findByLabelText('lastname')
    const email = screen.findByLabelText('email')
    userEvent.type(firstName, ' {backspace}')
    userEvent.type(lastName, ' {backspace}')
    userEvent.type(email, ' {backspace}')
    expect(screen.findByText('Error: firstName must have at least 5 characters.'))
        .toBeVisible
    expect(screen.findByText('Error: lastName is a required field.'))
        .toBeVisible
    expect(screen.findByText('Error: email must be a valid email address.'))
        .toBeVisible
    

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.findByLabelText('firstname')
    const lastName = screen.findByLabelText('lastname')
    const submit = screen.findByRole('button')
    userEvent.type(firstName, 'Steven')
    userEvent.type(lastName, 'Grant')
    userEvent.click(await submit)
    expect(screen.findAllByText('Error: email must be a valid email address.'))
        .toBeVisible
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.findByLabelText('email')
    userEvent.type(email, 'email')
    expect(screen.findByText('Error: email must be a valid email address.'))
        .toBeVisible

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const submit = screen.findByRole('button')
    userEvent.click(await submit)
    expect(screen.findByText('Error: lastName is a required field.'))
        .toBeVisible
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.findByLabelText('firstname')
    const lastName = screen.findByLabelText('lastname')
    const email = screen.findByLabelText('email')
    const submit = screen.findByRole('button')
    userEvent.type(firstName, 'Steven')
    userEvent.type(lastName, 'Grant')
    userEvent.type(email, 'email@email.com')
    userEvent.click(await submit)
    expect(screen.findByText(/you submitted/i)).toBeInTheDocument
    expect(screen.findByText(/first name: steven/i)).toBeInTheDocument
    expect(screen.findByText(/last name: grant/i)).toBeInTheDocument
    expect(screen.findByText(/email: email@email.com/i)).toBeInTheDocument
    expect(screen.findByTestId('messageDisplay')).not.toBeInTheDocument
})

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.findByLabelText('firstname')
    const lastName = screen.findByLabelText('lastname')
    const email = screen.findByLabelText('email')
    const submit = screen.findByRole('button')
    const message = screen.findByRole('message')
    userEvent.type(firstName, 'Steven')
    userEvent.type(lastName, 'Grant')
    userEvent.type(email, 'email@email.com')
    userEvent.type(message, 'test text message')
    userEvent.click(await submit)
    expect(screen.findByText(/you submitted/i)).toBeInTheDocument
    expect(screen.findByText(/first name: steven/i)).toBeInTheDocument
    expect(screen.findByText(/last name: grant/i)).toBeInTheDocument
    expect(screen.findByText(/email: email@email.com/i)).toBeInTheDocument
    expect(screen.findByText(/messsage: test text message/i)).toBeInTheDocument

})
