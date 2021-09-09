import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

// Arrange

//Act 

//Assert

//findBy uses await

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText('Contact Form');
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByLabelText('First Name*');
    expect(firstName).toBeInTheDocument();
     //const error = screen.queryByTestId('error')
    userEvent.type(firstName, 'rick')
    await expect(screen.queryByText('Error: firstName must have at least 5 characters.')).toBeInTheDocument()
    //await expect(error).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByLabelText('First Name*');
    expect(firstName).toBeInTheDocument();
    const lastName = screen.queryByLabelText('Last Name*');
    expect(lastName).toBeInTheDocument();
    const email = screen.queryByLabelText('Email*');
    expect(email).toBeInTheDocument();
    userEvent.type(firstName, '')
    userEvent.type(lastName, '')
    userEvent.type(email, '')
    const button = screen.queryByRole('button')
    userEvent.click(button)
    await expect(screen.queryByText('Error: firstName must have at least 5 characters.')).toBeInTheDocument()
    await expect(screen.queryByText('Error: lastName is a required field.')).toBeInTheDocument()
    await expect(screen.queryByText('Error: email must be a valid email address.')).toBeInTheDocument()

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByLabelText('First Name*');
    expect(firstName).toBeInTheDocument();
    const lastName = screen.queryByLabelText('Last Name*');
    expect(lastName).toBeInTheDocument();
    const email = screen.queryByLabelText('Email*');
    expect(email).toBeInTheDocument();
    userEvent.type(firstName, 'ricky')
    userEvent.type(lastName, 'williams')
    userEvent.type(email, '')
    const button = screen.queryByRole('button')
    userEvent.click(button)
    await expect(screen.queryByText('Error: email must be a valid email address.')).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    
    const email = screen.queryByLabelText('Email*');
    expect(email).toBeInTheDocument();
    
    userEvent.type(email, 'trtt')
    
    await expect(screen.queryByText('Error: email must be a valid email address.')).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    
    const lastName = screen.queryByLabelText('Last Name*');
    expect(lastName).toBeInTheDocument();
    
   
    userEvent.type(lastName, '')
    
    const button = screen.queryByRole('button')
    userEvent.click(button)
   
    await expect(screen.queryByText('Error: lastName is a required field.')).toBeInTheDocument()
   
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByLabelText('First Name*');
    expect(firstName).toBeInTheDocument();
    const lastName = screen.queryByLabelText('Last Name*');
    expect(lastName).toBeInTheDocument();
    const email = screen.queryByLabelText('Email*');
    expect(email).toBeInTheDocument();
    userEvent.type(firstName, 'ricky')
    userEvent.type(lastName, 'williams')
    userEvent.type(email, 'rick@yahoo.com')
    const button = screen.queryByRole('button')
    userEvent.click(button)
    await waitFor(()=> {
        const firstNamePrint = screen.queryByTestId('firstnameDisplay');
        expect(firstNamePrint).toBeInTheDocument();
        const lastNamePrint = screen.queryByTestId('lastnameDisplay');
        expect(lastNamePrint).toBeInTheDocument();
        const emailPrint = screen.queryByTestId('emailDisplay');
        expect(emailPrint).toBeInTheDocument();
        const messagePrint = screen.queryByTestId('messageDisplay');
        expect(messagePrint).not.toBeInTheDocument();
        
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByLabelText('First Name*');
    expect(firstName).toBeInTheDocument();
    const lastName = screen.queryByLabelText('Last Name*');
    expect(lastName).toBeInTheDocument();
    const email = screen.queryByLabelText('Email*');
    expect(email).toBeInTheDocument();
    const message = screen.queryByLabelText('Message');
    expect(message).toBeInTheDocument();
    userEvent.type(firstName, 'ricky')
    userEvent.type(lastName, 'williams')
    userEvent.type(email, 'rick@yahoo.com')
    userEvent.type(message, ' What up King')
    const button = screen.queryByRole('button')
    userEvent.click(button)
    await waitFor(()=> {
        const firstNamePrint = screen.queryByTestId('firstnameDisplay');
        expect(firstNamePrint).toBeInTheDocument();
        const lastNamePrint = screen.queryByTestId('lastnameDisplay');
        expect(lastNamePrint).toBeInTheDocument();
        const emailPrint = screen.queryByTestId('emailDisplay');
        expect(emailPrint).toBeInTheDocument();
        const messagePrint = screen.queryByTestId('messageDisplay');
        expect(messagePrint).toBeInTheDocument();
        
    });
});