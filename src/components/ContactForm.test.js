import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.getByText(/contact form/i)
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i)
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into first name.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'tee')
    await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.')
        expect(firstNameError).toBeInTheDocument()
    })
    
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
   const firstName =screen.getByPlaceholderText(/edd/i)
   userEvent.type(firstName, '')
   const email =screen.getByLabelText('Email*')
   userEvent.type(email, '')
   const lastName =screen.getByLabelText('Last Name*')
    userEvent.type(lastName, '')
    const submit = screen.getByRole('button')
   userEvent.click(submit)
   await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.')
        expect(firstNameError).toBeInTheDocument()
        const lastNameError = screen.queryByText('Error: lastName is a required field.')
        expect(lastNameError).toBeInTheDocument()
        const emailError = screen.queryByText('Error: email must be a valid email address.')
        expect(emailError).toBeInTheDocument()
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstName = screen.queryByLabelText('First Name*')
    userEvent.type(firstName, 'Neneeee')
    const lastName = screen.queryByLabelText('Last Name*')
    userEvent.type(lastName, 'Fauntleroy')
    const email = screen.queryByLabelText('Email*')
    userEvent.type(email, '')
    const submit = screen.getByRole('button')
   userEvent.click(submit)
    await waitFor(() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.')
        expect(emailError).toBeInTheDocument()
    })
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const email = screen.queryByLabelText('Email*')
    userEvent.type(email, 'hsjddjdg')
    await waitFor(() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.')
        expect(emailError).toBeInTheDocument()
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const lastName = screen.queryByLabelText('Last Name*')
    userEvent.type(lastName, '')
    const submit = screen.getByRole('button')
   userEvent.click(submit)
   await waitFor(() => {
        const lastNameError = screen.queryByText('Error: lastName is a required field.')
        expect(lastNameError).toBeInTheDocument()
   })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.queryByLabelText('First Name*')
    userEvent.type(firstName, 'Neneeee')
    const lastName = screen.queryByLabelText('Last Name*')
    userEvent.type(lastName, 'Fauntleroy')
    const email = screen.queryByLabelText('Email*')
    userEvent.type(email, 'ihgfd@aol.com')
    const submit = screen.getByRole('button')
   userEvent.click(submit)
   const message = screen.queryByLabelText('Message')
   userEvent.type(message, '')
   await waitFor(() => {
        const fName = screen.getByTestId('firstnameDisplay')
        expect(fName).toBeInTheDocument()
        const lName = screen.getByTestId('lastnameDisplay')
        expect(lName).toBeInTheDocument()
        // const emailS = screen.getByTestId('emailDisplay')
        // expect(emailS).toBeInTheDocument()
        const messageS = screen.getByTestId('messageDisplay')
        expect(messageS).not.toBeInTheDocument()
   })
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstName =screen.getByPlaceholderText(/edd/i)
    userEvent.type(firstName, "NeNeee")
    const lastName =screen.getByLabelText('Last Name*')
    userEvent.type(lastName, "Fauntleroy")
   const email =screen.getByLabelText('Email*')
   userEvent.type(email, "NeNeee@aol.com")
   const message = screen.getByLabelText(/message/i)
   userEvent.type(message, "i dont know what to say here")
   const submit = screen.getByRole('button')
   userEvent.click(submit)
   await waitFor(() => {
        const fName = screen.getByTestId('firstnameDisplay')
        expect(fName).toBeInTheDocument()
        const lName = screen.getByTestId('lastnameDisplay')
        expect(lName).toBeInTheDocument()
        const emailS = screen.getByTestId('emailDisplay')
        expect(emailS).toBeInTheDocument()
        const messageS = screen.getByTestId('messageDisplay')
        expect(messageS).toBeInTheDocument()

   })
   
});