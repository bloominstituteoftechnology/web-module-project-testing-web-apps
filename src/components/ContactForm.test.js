import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<App/>);
});

test('renders the contact form header', ()=> {
    render(<App/>);
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Contact Form");
    expect(header).not.toBeFalsy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<App/>);
    const  firstLabel =   screen.getByLabelText(/First Name*/i)
    expect(firstLabel).toBeInTheDocument();
    userEvent.type(firstLabel,'1234');
    const firstError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(firstError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<App/>)
    const button = screen.getByTestId('submitBtn');
    expect(button).toBeInTheDocument();
    userEvent.click(button)
    const firstError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(firstError).toBeInTheDocument();
    const secondError = screen.queryByText(/lastName is a required field./i);
    expect(secondError).toBeInTheDocument();
    const thirdError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(thirdError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<App/>)
    const  firstLabel =   screen.getByLabelText(/First Name*/i)
    expect(firstLabel).toBeInTheDocument();
    userEvent.type(firstLabel,'123456');
    const  secondLabel =   screen.getByPlaceholderText(/Burke/i)
    expect(secondLabel).toBeInTheDocument();
    userEvent.type(secondLabel,'123456');
    const button = screen.getByTestId('submitBtn');
    expect(button).toBeInTheDocument();
    userEvent.click(button)
    const thirdError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(thirdError).toBeInTheDocument();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<App/>)
    const  thirdLabel =   screen.getByPlaceholderText(/bluebill1049@hotmail.com/i)
    expect(thirdLabel).toBeInTheDocument();
    userEvent.type(thirdLabel,'12345');
    const thirdError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(thirdError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<App/>)
    const button = screen.getByTestId('submitBtn');
    expect(button).toBeInTheDocument();
    userEvent.click(button)
    const secondError = screen.queryByText(/lastName is a required field./i);
    expect(secondError).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<App/>)
    const  firstLabel =   screen.getByLabelText(/First Name*/i)
    expect(firstLabel).toBeInTheDocument();
    userEvent.type(firstLabel,'123456');
    const  secondLabel =   screen.getByPlaceholderText(/Burke/i)
    expect(secondLabel).toBeInTheDocument();
    userEvent.type(secondLabel,'123456');
    const  thirdLabel =   screen.getByPlaceholderText(/bluebill1049@hotmail.com/i)
    expect(thirdLabel).toBeInTheDocument();
    userEvent.type(thirdLabel,'12345fref@gmail.com');
    const button = screen.getByTestId('submitBtn');
    expect(button).toBeInTheDocument();
    userEvent.click(button)

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<App/>)
    const  firstLabel =   screen.getByLabelText(/First Name*/i)
    expect(firstLabel).toBeInTheDocument();
    userEvent.type(firstLabel,'123456');
    const  secondLabel =   screen.getByPlaceholderText(/Burke/i)
    expect(secondLabel).toBeInTheDocument();
    userEvent.type(secondLabel,'123456');
    const  thirdLabel =   screen.getByPlaceholderText(/bluebill1049@hotmail.com/i)
    expect(thirdLabel).toBeInTheDocument();
    userEvent.type(thirdLabel,'12345fref@gmail.com');
    const button = screen.getByTestId('submitBtn');
    expect(button).toBeInTheDocument();
    userEvent.click(button)
});