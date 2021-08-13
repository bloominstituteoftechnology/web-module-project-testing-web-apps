import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    // Arrange
    render(<ContactForm />);
    // This prints the DOM as the test sees it, when done after sanity check remove it
    // screen.debug();
    // Act
    const headerText = screen.getByText(/Contact Form/i);
    // Assert
    // make the test fail to 'sanity check' it
    // expect(headerText).not.toBeInTheDocument();
    expect(headerText).toBeInTheDocument();
});


test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // Arrange ??? is it necessary to render the entire contact form ???
    render(<ContactForm />)
    // Act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "firs");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Ali");
    
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "tom@hotmail.com");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "message");

    const button = screen.getByRole("button");
    userEvent.click(button);
    //screen.debug();
    
    const errorMessage = screen.getAllByTestId("error");
    // Assert
    // Checking to see if just one error is there
    // sanity check 
    // expect(errorMessage).toHaveLength(2);
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "");
    
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "");

    const button = screen.getByRole("button");
    userEvent.click(button);


   // screen.debug();

    const errorMessages = screen.getAllByTestId("error");
    // Assert
    expect (errorMessages).toHaveLength(3);


});

 test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
// Arrange
render(<ContactForm />);

// Act
const firstName = screen.getByLabelText(/First Name*/i);
userEvent.type(firstName, "Alieze");

const lastName = screen.getByLabelText(/Last Name*/i);
userEvent.type(lastName, "Ali");

const email = screen.getByLabelText(/Email*/i);
userEvent.type(email, "");

const message = screen.getByLabelText(/Message/i);
userEvent.type(message, "");

const button = screen.getByRole("button");
userEvent.click(button);

const errorMessages = screen.getAllByTestId("error");

// Assert
// Sanity Check
// expect (errorMessages).toHaveLength(2);
expect (errorMessages).toHaveLength(1);


 });


test('renders "email must be a valid email address" if an invalid email is entered', async () => {
// Arrange
render(<ContactForm />);

// Act
const firstName = screen.getByLabelText(/First Name*/i);
userEvent.type(firstName, "Alieze");

const lastName = screen.getByLabelText(/Last Name*/i);
userEvent.type(lastName, "Ali");

const email = screen.getByLabelText(/Email*/i);
userEvent.type(email, "ksjsjf");

const message = screen.getByLabelText(/Message/i);
userEvent.type(message, "message");

const button = screen.getByRole("button");
userEvent.click(button);

const errorMessages = screen.getAllByTestId("error");

// Assert
// Sanity Check
// expect (errorMessages).toHaveLength(2);
expect (errorMessages).toHaveLength(1);
// expect (errorMessages[0]).toHaveTextContent("email must be a valid email addressss");
expect (errorMessages[0]).toHaveTextContent("email must be a valid email address");

 });

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// Arrange
render(<ContactForm />);

// Act
const firstName = screen.getByLabelText(/First Name*/i);
userEvent.type(firstName, "Alieze");

const lastName = screen.getByLabelText(/Last Name*/i);
userEvent.type(lastName, "");

const email = screen.getByLabelText(/Email*/i);
userEvent.type(email, "keanu@gmail.com");

const message = screen.getByLabelText(/Message/i);
userEvent.type(message, "message");

const button = screen.getByRole("button");
userEvent.click(button);

const errorMessages = screen.getAllByTestId("error");
// screen.debug();
// Assert
// Sanity Check
// expect (errorMessages).toHaveLength(2);
expect (errorMessages).toHaveLength(1);
//expect (errorMessages[0]).toHaveTextContent("email must be a valid email addressss");
expect (errorMessages[0]).toHaveTextContent("lastName is a required field");
 });


test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
// Arrange
render(<ContactForm />);

// Act
const firstName = screen.getByLabelText(/First Name*/i);
userEvent.type(firstName, "Alieze");

const lastName = screen.getByLabelText(/Last Name*/i);
userEvent.type(lastName, "Ali");

const email = screen.getByLabelText(/Email*/i);
userEvent.type(email, "keanu@gmail.com");

const message = screen.getByLabelText(/Message/i);
userEvent.type(message, "");

const button = screen.getByRole("button");
userEvent.click(button);
// ??? Need help understanding what's going on here
const messageDisplay = screen.queryByTestId("messageDisplay");
// screen.debug();
// Assert
expect(messageDisplay).toBeNull();

 });

test('renders all fields text when all fields are submitted.', async () => {
// Arrange
render(<ContactForm />);

// Act
const firstName = screen.getByLabelText(/First Name*/i);
userEvent.type(firstName, "Alieze");

const lastName = screen.getByLabelText(/Last Name*/i);
userEvent.type(lastName, "Ali");

const email = screen.getByLabelText(/Email*/i);
userEvent.type(email, "keanu@gmail.com");

const message = screen.getByLabelText(/Message/i);
userEvent.type(message, "");

const button = screen.getByRole("button");
userEvent.click(button);

// Act
expect(firstName).toBeInTheDocument();
expect(lastName).toBeInTheDocument();
expect(email).toBeInTheDocument();
expect(message).toBeInTheDocument();

 });