import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<App/>);
});

test('renders the contact form header', ()=> {
    render(<App/>);

    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<App/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'abcd');

    const output = screen.queryByText(/error: firstname must have at least 5 characters/i);
    expect(output).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<App/>);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const output = screen.queryByText(/error: firstname must have at least 5 characters/i);
    expect(output).toBeInTheDocument();

    const output2 = screen.queryByText(/error: lastName is a required field/i);
    expect(output2).toBeInTheDocument();

    const output3 = screen.queryByText(/error: email must be a valid email address/i);
    expect(output3).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<App/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'Lucas');

    const LastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(LastName, 'Castelli');

    const button = screen.getByRole("button");
    userEvent.click(button);

    const output3 = screen.queryByText(/error: email must be a valid email address/i);
    expect(output3).toBeInTheDocument();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<App/>);

    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email, 'aaaaaa');

    const button = screen.getByRole("button");
    userEvent.click(button);

    const output3 = screen.queryByText(/error: email must be a valid email address/i);
    expect(output3).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<App/>);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const output2 = screen.queryByText(/error: lastName is a required field/i);
    expect(output2).toBeInTheDocument();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<App/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'Lucas');

    const LastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(LastName, 'Castelli');

    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email, 'abc@gmail.com');

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const outputfn = screen.queryByText(/First Name:/i);
        expect(outputfn).toBeInTheDocument();

        const outputln = screen.queryByText(/Last Name:/i);
        expect(outputln).toBeInTheDocument();

        const outputemail = screen.queryByText(/Email:/i);
        expect(outputemail).toBeInTheDocument();

        const outputmess = screen.queryByText(/Message: /i);
        expect(outputmess).not.toBeInTheDocument();
    })

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<App/>);

    const FirstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(FirstName, 'Lucas');

    const LastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(LastName, 'Castelli');

    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email, 'abc@gmail.com');

    const message =screen.getByLabelText(/message/i);
    userEvent.type(message, 'yadda')

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const outputfn = screen.queryByText(/First Name:/i);
        expect(outputfn).toBeInTheDocument();

        const outputln = screen.queryByText(/Last Name:/i);
        expect(outputln).toBeInTheDocument();

        const outputemail = screen.queryByText(/Email:/i);
        expect(outputemail).toBeInTheDocument();

        const outputmess = screen.queryByText(/Message:/i);
        expect(outputmess).toBeInTheDocument();
    })
});