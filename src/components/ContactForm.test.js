import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContactForm from './ContactForm';


const typeFirst = () => screen.getByLabelText('First Name*');
const typeLast = () => screen.getByLabelText('Last Name*');
const typeEmail = () => screen.getByLabelText('Email*');
const typeMessage = () => screen.getByLabelText('Message')
const submitForm = () => screen.getByRole('button');

const errors = () => screen.getAllByTestId(/error/);
const error = () => screen.getByTestId(/error/)

const displayFirst = () => screen.queryByTestId(/firstnameDisplay/);
const displayLast = () => screen.queryByTestId(/lastnameDisplay/);
const displayEmail = () => screen.queryByTestId(/emailDisplay/);
const displayMessage = () => screen.queryByTestId(/messageDisplay/);


test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toBeVisible();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)

    userEvent.type(typeFirst(), 'hi');

    expect(errors()).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    userEvent.click(submitForm());
    errors().forEach(item => {
        expect(item).toBeInTheDocument();
        expect(item).toBeVisible();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Michael');
    userEvent.type(typeLast(), 'Lee');
    userEvent.click(submitForm());
    expect(error()).toBeInTheDocument();
    expect(error()).toBeVisible();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    userEvent.type(typeEmail(), 'hello');
    expect(error()).toBeInTheDocument()
    expect(error()).toBeVisible()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Michael');
    userEvent.type(typeEmail(), 'yahoo@yahoo.com')
    userEvent.click(submitForm())
    expect(error()).toBeInTheDocument()
    expect(error()).toBeVisible()
    ;
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Michael');
    userEvent.type(typeLast(), 'Lee');
    userEvent.type(typeEmail(), 'yahoo@yahoo.com')
    userEvent.click(submitForm());


    expect(displayFirst()).toBeInTheDocument();
    expect(displayLast()).toBeInTheDocument();
    expect(displayEmail()).toBeInTheDocument();
    expect(displayMessage()).not.toBeInTheDocument();

    
    expect(displayFirst()).toBeVisible();
    expect(displayLast()).toBeVisible();
    expect(displayEmail()).toBeVisible();
   
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    userEvent.type(typeFirst(), 'Michael');
    userEvent.type(typeLast(), 'Lee');
    userEvent.type(typeEmail(), 'yahoo@yahoo.com')
    userEvent.type(typeMessage(), 'hello world!')
    userEvent.click(submitForm());

    expect(displayFirst()).toHaveTextContent('Michael');
    expect(displayLast()).toHaveTextContent('Lee');
    expect(displayEmail()).toHaveTextContent('yahoo@yahoo.com');
    expect(displayMessage()).toHaveTextContent('hello world!');

    expect(displayFirst()).toBeVisible();
    expect(displayLast()).toBeVisible();
    expect(displayEmail()).toBeVisible();
    expect(displayMessage()).toBeVisible();



});

// const typeFirst = screen.getByLabelText('First Name*');
// const typeLast = screen.getByLabelText('Last Name*');
// const typeEmail = screen.getByLabelText('Email*');