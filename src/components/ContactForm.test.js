import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';


test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const nameError = screen.getByPlaceholderText("Edd");
    userEvent.type(nameError, " ");

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(3);

    const error = screen.getAllByTestId('error');
    expect(error[0]).toHaveTextContent('Error: firstName must have at least 5 characters.');
    expect(error[1]).toHaveTextContent('Error: lastName is a required field.');
    expect(error[2]).toHaveTextContent('Error: email must be a valid email address.');
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
   render (<ContactForm />);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'First');

    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Last');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'Test');
    fireEvent.change(email, { target: { value: '' } });

    const error = screen.getAllByTestId('error');
    expect(error[0]).toHaveTextContent('Error: email must be a valid email address.');
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, ' ');
    fireEvent.change(email, { target: { value: ""} });

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'First');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'test@test.com');

    const button = screen.getByRole('button', { type: 'submit' });
    button.click();

    const error = screen.getByTestId('error');
    expect(error).toHaveTextContent('Error: lastName is a required field.');

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'First');

    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Last');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'test@test.com');

    const button = screen.getByRole('button', { type: 'submit' });
    button.click();

    const firstNameDisplay = screen.queryByTestId('firstnameDisplay');
    const lastNameDisplay = screen.queryByTestId('lastnameDisplay');
    const emailDisplay = screen.queryByTestId('emailDisplay');
    const messageDisplay = screen.queryByTestId('messageDisplay');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'First');

    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Last');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'test@test.com');

    const message = screen.getByLabelText('Message');
    userEvent.type(message, 'Test Message');

    const button = screen.getByRole('button', { type: 'submit' });
    button.click();

    const firstNameDisplay = screen.queryByTestId('firstnameDisplay');
    const lastNameDisplay = screen.queryByTestId('lastnameDisplay');
    const emailDisplay = screen.queryByTestId('emailDisplay');
    const messageDisplay = screen.queryByTestId('messageDisplay');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
});