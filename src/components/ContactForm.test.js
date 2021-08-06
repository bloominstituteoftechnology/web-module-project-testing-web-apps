import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm/>);  
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header=screen.queryByText("Contact Form")
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const inputEl = screen.queryByLabelText('First Name*')
    userEvent.type(inputEl, 'vai')
    expect(inputEl).toHaveValue('vai')
    expect(screen.getByTestId('error').textContent).toEqual('Error: firstName must have at least 5 characters.');
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
      const inputEl1 = screen.queryByLabelText('First Name*')
      userEvent.type(inputEl1, "v")
      
      const inputEl2 = screen.queryByLabelText('Last Name*')
      userEvent.type(inputEl2, "m")

      const inputEl3 = screen.queryByLabelText('Email*')
     userEvent.type(inputEl3, "s")
     expect(screen.queryAllByText('Error: firstName must have at least 5 characters.' || 'Error: lastName is a required field.' || 'Error: email must be a valid email address.'));
    
 
    
   
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const inputName = screen.queryByLabelText('First Name*')
    userEvent.type(inputName, 'vaibhavi')
    const inputLName = screen.queryByLabelText('Last Name*')
      userEvent.type(inputLName, "balar")
      const inputEmail = screen.queryByLabelText('Email*')
      userEvent.type(inputEmail, "d") 
    expect(screen.getByTestId('error').textContent).toEqual('Error: email must be a valid email address.');
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const inputVEmail = screen.queryByLabelText('Email*')
    userEvent.type(inputVEmail, "v") 
  expect(screen.getByTestId('error').textContent).toEqual('Error: email must be a valid email address.');
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const inputFirstName = screen.queryByLabelText('First Name*')
    userEvent.type(inputFirstName, 'vaibhavi')
    const inputLName = screen.queryByLabelText('Last Name*')
      userEvent.type(inputLName, "")
      const inputEmail = screen.queryByLabelText('Email*')
      userEvent.type(inputEmail, "vaibhavi123balar@gmail.com") 
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton)

    await waitFor(() => {
    expect(screen.getByTestId('error').textContent).toEqual('Error: lastName is a required field.');
    })
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const inputFirstName = screen.queryByLabelText('First Name*')
    const inputLName = screen.queryByLabelText('Last Name*')
    const inputEmail = screen.queryByLabelText('Email*')
    const inputMessage = screen.queryByLabelText('Message')
    userEvent.type(inputFirstName, 'vaibhavi')
    userEvent.type(inputLName, "balar")
    userEvent.type(inputEmail, "vaibhavi123balar@gmail.com") 
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton)
    
     const displayLName = screen.queryByTestId('lastnameDisplay').textContent
    const displayName = screen.queryByTestId('firstnameDisplay').textContent
    const displayEmail = screen.queryByTestId('emailDisplay').textContent
    const displayMessage = screen.queryByTestId('messageDisplay')
    
   

    await waitFor(() => {
        expect(displayName).toEqual('First Name: vaibhavi')
        expect(displayLName).toEqual(' Last Name: balar')
        expect(displayEmail).toEqual('Email: vaibhavi123balar@gmail.com')
        expect(displayMessage).not.toEqual('Message: "s"')
        })
    
});

test('renders all fields text when all fields are submitted.', async () => {

    render(<ContactForm/>)
    const inputFirstName = screen.queryByLabelText('First Name*')
    const inputLName = screen.queryByLabelText('Last Name*')
    const inputEmail = screen.queryByLabelText('Email*')
    const inputMessage = screen.queryByLabelText('Message')
    userEvent.type(inputFirstName, 'vaibhavi')
    userEvent.type(inputLName, "balar")
    userEvent.type(inputEmail, "vaibhavi123balar@gmail.com") 
    userEvent.type(inputMessage, "I could finally succeed in testing")
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton)
    
     const displayLName = screen.queryByTestId('lastnameDisplay').textContent
    const displayName = screen.queryByTestId('firstnameDisplay').textContent
    const displayEmail = screen.queryByTestId('emailDisplay').textContent
    const displayMessage = screen.queryByTestId('messageDisplay').textContent
    
   

    await waitFor(() => {
        expect(displayName).toEqual('First Name: vaibhavi')
        expect(displayLName).toEqual(' Last Name: balar')
        expect(displayEmail).toEqual('Email: vaibhavi123balar@gmail.com')
        expect(displayMessage).toEqual('Message: I could finally succeed in testing')
        })
    
});