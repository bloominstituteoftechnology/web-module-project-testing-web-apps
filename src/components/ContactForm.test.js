import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const headerText = screen.getByText(/Contact Form*/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {render
    (<ContactForm/>);
    const oneError = screen.getByLabelText(/First name*/i);
    userEvent.type(oneError, 'abcd')
    const oneErrorRen = await screen.findByTestId(/error*/i)
    expect(oneErrorRen).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button =await screen.getByRole('button');
    userEvent.click(button);
    const errorMessage =await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First name*/i);
    userEvent.type(firstName, 'Cheyenne')
    const lastName = screen.getByLabelText(/Last name*/i);
    userEvent.type(lastName, 'Bowman')
    const missingEmail =await screen.getByLabelText(/Email*/i);
    userEvent.type(missingEmail, '')
    const button =await screen.getByRole('button');
    userEvent.click(button);
    const errorMessage =await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First name*/i);
    userEvent.type(firstName, 'Cheyenne')
    const lastName = screen.getByLabelText(/Last name*/i);
    userEvent.type(lastName, 'Bowman')
    const badEmail =await screen.getByLabelText(/Email*/i);
    userEvent.type(badEmail, 'aa')
    const button =await screen.getByRole('button');
    userEvent.click(button);
    const errorMessage =await screen.findByTestId('error');
    expect(errorMessage).toBeInTheDocument("email must be a valid email address");
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First name*/i);
    userEvent.type(firstName, 'Cheyenne')
    const badEmail =await screen.getByLabelText(/Email*/i);
    userEvent.type(badEmail, 'cheye@gmail.com')
    const lastName = screen.getByLabelText(/Last name*/i);
    userEvent.type(lastName, '')
    const button =await screen.getByRole('button');
    userEvent.click(button);
    const errorMessage =await screen.getByTestId('error');
    expect(errorMessage).toBeInTheDocument("lastName is a required field");
});
    


test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First name*/i);
    userEvent.type(firstName, 'Cheyenne')
    const badEmail =await screen.getByLabelText(/Email*/i);
    userEvent.type(badEmail, 'cheye@gmail.com')
    const lastName = screen.getByLabelText(/Last name*/i);
    userEvent.type(lastName, 'bowman')
    const button =await screen.getByRole('button');
    userEvent.click(button);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First name*/i);
    userEvent.type(firstName, 'Cheyenne')
    const badEmail =await screen.getByLabelText(/Email*/i);
    userEvent.type(badEmail, 'cheye@gmail.com')
    const lastName = screen.getByLabelText(/Last name*/i);
    userEvent.type(lastName, 'bowman')
    const button =await screen.getByRole('button');
    userEvent.click(button);
    const output = screen.queryByText(/Cheyenne/i);
        expect(output).toBeInTheDocument();
        const put = screen.queryByText(/cheye@gmail.com/i);
        expect(put).toBeInTheDocument();
        const out = screen.queryByText(/bowman/i);
        expect(out).toBeInTheDocument();

});