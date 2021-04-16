import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
test('renders without errors', ()=>{
   render(<ContactForm/>);
});
test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.getByText(/Contact Form/i)
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent("Contact Form")
});
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const fnameInput = screen.getByLabelText(/first name/i)
    userEvent.type(fnameInput,"wer")
    const error = await screen.findByTestId('error');
    expect(error).toBeInTheDocument()
});
test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const submitting = screen.getByRole("button",/submit/i)
    userEvent.click(submitting)
    const error = await screen.findAllByTestId('error');
    expect(error).toHaveLength(3)
});
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const emailInput = screen.getByLabelText(/Email/i)
    userEvent.type(emailInput,"fhhf")
    const error = await screen.findByTestId('error');
    expect(error).toBeInTheDocument()
});
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const emailInput = screen.getByLabelText(/Email/i)
    userEvent.type(emailInput,"fhhf")
    const error = await screen.findByTestId('error');
    expect(error).toBeInTheDocument()
});
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
});
//use querry b/c I am checking to not be there
test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
});
test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
});