import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText(/Contact Form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange: render Contact Form
    render(<ContactForm/>)
    //Act:
    // find the firstname input
    const firstname = screen.getByLabelText(/first name/i)
    // type in a name that is less than 5 characters long
    userEvent.type(firstname, "Tony")
    
    //Assert: is there now an error that exists on the screen?
    const error = screen.getByTestId(/error/i)
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange: render contact form
    render(<ContactForm/>)
    //Act: 
    //find submit button
    const button= screen.getByRole("button")
    //click submit button
    userEvent.click(button)
    //find errors to be in the document 3 times. 
    const error = screen.getAllByTestId(/error/i)
    // const error1 = screen.getByTestId(/error/i)
    // const error2 = screen.getByTestId(/error/i)
    // console.log(error)
   
       
    //Assert: all 3 errors are in the document. 
    // expect(error).toBeInTheDocument();
   await expect(error).toHaveLength(3)
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange: render contact form
    render(<ContactForm/>)
    //Act: 
    //find firstname, type something in it
    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, "Monica")
    //find lastname, type something in it
    const lastname = screen.getByLabelText(/last name/i)
    userEvent.type(lastname, "Zwissler")
    //find submit button
    const button= screen.getByRole("button")
    //click submit button
    userEvent.click(button)
    //find 1 error to be in the document 
    const error = screen.getAllByTestId(/error/i)

   
    expect(error).toHaveLength(1)
});

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
// });

// test('renders all fields text when all fields are submitted.', async () => {
    
// });