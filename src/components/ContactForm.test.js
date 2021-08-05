/**
 * Tom Bielawski
 * Lambda School WEB45
 * 3.1.4 Testing
 * 8/5/2021
 */

//Imports
import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

//Sanity test
test('renders without errors', ()=>
{
    //Ensure the form renders
    render(<ContactForm/>);
});


test('renders the contact form header', ()=> 
{
    //Arrange: Render the form
    render(<ContactForm/>);
    //Act: Declare header to hold the text
    const header = screenGetByText(/contact form/i);
    //Assert: determine if contents of "header" are in the doc
    expect(header).toBeInTheDocument();
    //Assert: determine if contents of "header" are in contact form
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
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});