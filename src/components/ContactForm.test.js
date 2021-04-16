import React from 'react';
import {getByLabelText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=> {
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    //arrange
   render(<ContactForm/>);
//    screen.debug()
   //act
   const header = screen.getByText(/contact form/i);
   //assert
   expect(header).toBeVisible(); 
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>); 

    const firstNameInput = screen.getByLabelText(/first name/i)
    
    // console.log(firstnameInput);
    userEvent.type(firstNameInput, "Mina")
    // screen.debug()
    expect(screen.getAllByTestId('error')).toHaveLength(1)
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>); 

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>); 
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>); 
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>); 
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>); 
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>); 
});