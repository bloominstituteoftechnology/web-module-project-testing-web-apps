import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    const {getByText} = render(<ContactForm />);
    const header = getByText(/Contact Form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).not.toBeFalsy();
    expect(header).toBeVisible();
    expect(header).toHaveTextContent("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm/>);
    
    const firstNameInput = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(firstNameInput, "Angela");

    const lastNameInput= screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastNameInput, "Borgtron");

    const emailInput= screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "foo@bar.com");

   

    const button = screen.getByRole("button");
    userEvent.click(button);

    


    
});

test('renders all fields text when all fields are submitted.', async () => {
    render (<ContactForm/>);

    const messageText = "Cool guys don't look at explosions";
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, messageText);
    
    const messageDisplay = screen.queryByText(messageText);
    console.log(messageDisplay);

    expect(messageDisplay).toBeInTheDocument();
});