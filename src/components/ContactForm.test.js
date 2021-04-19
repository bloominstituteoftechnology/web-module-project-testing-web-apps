import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    //Arrange
    const {getByText} = render(<ContactForm/>)
    const header = getByText(/Contact Form/i);
    //Act - n/a
    //Assert
    expect(header).toBeVisible();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', () => {
    // I find the input element for first name
    // I type in Hi
    // I find the submit button
    // I click the submit button
    // I find all of the errors
    // I count the errors
    // Are there exactly 1 error?


    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, "Bob");
    
    const expectedError = screen.getByText(/firstName must have at least 5 characters./i);
    const allErrors = screen.getAllByTestId('error')
    
    expect(expectedError).toBeDefined()
    expect(allErrors.length).toBe(1);
});

test('renders THREE error messages if user enters no values into any fields.', () => {
    render(<ContactForm/>);
    const submitButton = screen.getByRole("button"); // This should be a better selector
    userEvent.click(submitButton);
    
    const allErrors = screen.getAllByTestId('error')
    
    expect(allErrors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', () => {
    render(<ContactForm/>);
    // Valid First
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, "Bobby");
    // Valid Last
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, "Tables");
    // Invalid Email
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "elsa&anna.com");

    const allErrors = screen.getAllByTestId('error')
    
    expect(allErrors.length).toBe(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', () => {
    render(<ContactForm/>);
    // Invalid Email
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "elsa&anna.com");
    
    const expectedError = screen.getByText(/email must be a valid email address/i);
    
    expect(expectedError).toBeDefined()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', () => {
    render(<ContactForm/>);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const expectedError = screen.getByText(/lastName is a required field/i);
    
    expect(expectedError).toBeDefined()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', () => {
    render(<ContactForm/>);
    // Valid First
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, "Bobby");
    // Valid Last
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, "Tables");
    // Valid Email
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "elsa&anna@frozen.com");

    // SUBMIT
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // Rendered TestIds
    const submittedFirstName = screen.getByTestId('firstnameDisplay');
    const submittedLastName = screen.getByTestId('lastnameDisplay');
    const submittedEmail = screen.getByTestId('emailDisplay');
    const submittedMessage = screen.queryByTestId('messageDisplay');
    
    expect(submittedFirstName).toHaveTextContent("Bobby");
    expect(submittedLastName).toHaveTextContent("Tables");
    expect(submittedEmail).toHaveTextContent("elsa&anna@frozen.com");
    expect(submittedMessage).toBeNull();
});

test('renders all fields text when all fields are submitted.', () => {
    render(<ContactForm/>);
    // Valid First
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, "Bobby");
    // Valid Last
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, "Tables");
    // Valid Email
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "elsa&anna@frozen.com");
    // Valid Message
    const messageInput = screen.getByLabelText(/Message/i);
    userEvent.type(messageInput, "Hello World");

    // SUBMIT
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // Rendered TestIds
    const submittedFirstName = screen.getByTestId('firstnameDisplay');
    const submittedLastName = screen.getByTestId('lastnameDisplay');
    const submittedEmail = screen.getByTestId('emailDisplay');
    const submittedMessage = screen.getByTestId('messageDisplay');
    
    expect(submittedFirstName).toHaveTextContent("Bobby");
    expect(submittedLastName).toHaveTextContent("Tables");
    expect(submittedEmail).toHaveTextContent("elsa&anna@frozen.com");
    expect(submittedMessage).toHaveTextContent("Hello World");
});