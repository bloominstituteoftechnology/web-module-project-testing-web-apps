import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    // Arrange: 
    render(<ContactForm />)

    // Act: Find header
    const header = screen.queryByText(/contact form/i)

    // Assert: 
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // Arrange: 
    render(<ContactForm />)

    // Act: Fill out firstname with > 5 length
    const fNameInput = screen.getByLabelText("First Name*")
    userEvent.type(fNameInput, '1234')

    //const emailInput = screen.getByLabelText("Email*")
    //userEvent.type(emailInput, "aaa")

    // Assert
    const errorTest = screen.queryAllByTestId('error')
    //console.log(errorTest.length)
    expect(errorTest).toHaveLength(1)

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    // Arrange: 
    render(<ContactForm />)

    // Act:
    const button = screen.getByRole('button');
    userEvent.click(button);

    // Assert:
    const errorTest = screen.queryAllByTestId('error')
    expect(errorTest).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // Arrange: 
    render(<ContactForm />)

    // Act: 
    const fNameInput = screen.getByLabelText("First Name*")
    userEvent.type(fNameInput, "12345")
    const lNameInput = screen.getByLabelText("Last Name*")
    userEvent.type(lNameInput, "ABCDFG")
    const button = screen.getByRole('button');
    userEvent.click(button);

    // Assert:
    const errorTest = screen.queryAllByTestId('error')
    expect(errorTest).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    // Arrange: 
    render(<ContactForm />)

    // Act
    const emailInput = screen.getByLabelText("Email*")
    userEvent.type(emailInput, "aaa")

    // Assert
    const emailError = screen.queryByText(/email must be a valid email address/i)
    expect(emailError).toBeVisible();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    // Arrange: 
    render(<ContactForm />)

    // Act:
    const lNameInput = screen.getByLabelText("Last Name*")
    userEvent.type(lNameInput, "")
    const button = screen.getByRole('button');
    userEvent.click(button);

    // Assert:
    const lNameError = screen.queryByText(/lastName is a required field/i)
    expect(lNameError).toBeVisible();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    // Arrange: 
    render(<ContactForm />)

    // Act
    const fNameInput = screen.getByLabelText("First Name*");
    userEvent.type(fNameInput, "12345");

    const lNameInput = screen.getByLabelText("Last Name*");
    userEvent.type(lNameInput, "ABCDFG");

    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(emailInput, "aaa@aaa.com");

    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "")

    const button = screen.getByRole('button');
    userEvent.click(button);


    // Assert:
    const firstName = screen.queryByTestId("firstnameDisplay")
    const lastName = screen.queryByTestId("lastnameDisplay")
    const email = screen.queryByTestId("emailDisplay")
    const message = screen.queryByTestId("messageDisplay")

    expect(firstName).toBeVisible();
    expect(lastName).toBeVisible();
    expect(email).toBeVisible();
    expect(message).toBeNull();
});

test('renders all fields text when all fields are submitted.', async () => {
    // Arrange: 
    render(<ContactForm />)

    // Act
    const fNameInput = screen.getByLabelText("First Name*");
    userEvent.type(fNameInput, "12345");

    const lNameInput = screen.getByLabelText("Last Name*");
    userEvent.type(lNameInput, "ABCDFG");

    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(emailInput, "aaa@aaa.com");

    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "Friendly")

    const button = screen.getByRole('button');
    userEvent.click(button);


    // Assert:
    const firstName = screen.queryByTestId("firstnameDisplay")
    const lastName = screen.queryByTestId("lastnameDisplay")
    const email = screen.queryByTestId("emailDisplay")
    const message = screen.queryByTestId("messageDisplay")

    expect(firstName).toBeVisible();
    expect(lastName).toBeVisible();
    expect(email).toBeVisible();
    expect(message).toBeVisible();
});