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

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //Arrange: render contact form
    render(<ContactForm/>)
    //Act: find email input,
    const email = screen.getByLabelText(/email*/i)
    //type an invalid email in the input
    userEvent.type(email, "thisIsn'tAnEmail")
    //find fname, type fname, find lname, type lname
    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, "Monica")
    const lastname = screen.getByLabelText(/last name/i)
    userEvent.type(lastname, "Zwissler")
    //find submit button, click submit button
    // const button= screen.getByRole("button")
    // userEvent.click(button)
    const test = screen.queryByText(/email must be a valid email address/i)
    // console.log(error)
    // //Assert: check that the error is in the doc.
    // expect(error).toHaveValue("email must be a valid email address");
    expect(test).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //Arrange: render contact form
    render(<ContactForm/>)
    //Act: find email input,
    const email = screen.getByLabelText(/email*/i)
    //type an invalid email in the input
    userEvent.type(email, "mon@mon.com")
    //find fname, type fname, 
    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, "Monica")
    
    //find submit button, click submit button
    const button= screen.getByRole("button")
    userEvent.click(button)
    const test = screen.queryByText(/lastName is a required field/i)
    // console.log(error)
    // //Assert: check that the error is in the doc.
    // expect(error).toHaveValue("email must be a valid email address");
    expect(test).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, "Monica")
    const lastname = screen.getByLabelText(/last name/i)
    userEvent.type(lastname, "Zwissler")
    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email, "mon@mon.com")
    const button= screen.getByRole("button")
    userEvent.click(button)
    const messageDisplay = screen.queryByText(/test/i)
    expect(messageDisplay).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, "Monica")
    const lastname = screen.getByLabelText(/last name/i)
    userEvent.type(lastname, "Zwissler")
    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email, "mon@mon.com")
    const message = screen.getByLabelText(/message/i)
    userEvent.type(message, "I like turtles")
    const button= screen.getByRole("button")
    userEvent.click(button)

    const firstnameCheck = screen.queryByText(/monica/i)
    const lastnameCheck = screen.queryByText(/zwissler/i)
    const emailCheck = screen.queryByText(/mon@mon.com/i)
    // const messageCheck = screen.queryByText(/i like turtles/i)
    expect(firstnameCheck).toBeInTheDocument();
    expect(lastnameCheck).toBeInTheDocument();
    expect(emailCheck).toBeInTheDocument();


});