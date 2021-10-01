import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

// the component renders the contact form component without errors.
test('renders without errors', () =>
{
    render(<ContactForm />);
});

// the header h1 element exists. Include three asserts, if the header is in the document, if the heads is truthy, if the header has the correct test content.
test('renders the contact form header', () =>
{
    // Arrange: render ContactForm
    render(<ContactForm />);

    // Act: find ContactForm header element
    const contactFormHeader = screen.getByRole("heading");

    // Assert: pass the test if ContactForm header element exists
    expect(contactFormHeader).toBeInTheDocument();
    expect(contactFormHeader).toBeTruthy();
    expect(contactFormHeader).toHaveTextContent("Contact Form");
});

// the component renders ONE error message if the user enters less than 4 characters into the firstname field. Make sure to use async / await and the correct screen method to account for state change.
test('renders ONE error message if user enters less then 5 characters into firstname.', async () =>
{
    // Arrange: render ContactForm
    render(<ContactForm />);

    // Act: 
    // 1. Give firstName input focus
    const firstNameInput = screen.getByLabelText(/first name*/i);

    // 2. Type name that has less than 5 characters into firstName focus
    userEvent.type(firstNameInput, "Vlad");

    // Assert: Check to see if error message appears
    const errorMessages = await screen.findAllByTestId("error");

    expect(errorMessages).toHaveLength(1);
});

// the component renders THREE error messages if the user submits without filling in any values.
test('renders THREE error messages if user enters no values into any fields.', async () =>
{
    // Arrange: render Contact Form
    render(<ContactForm />);

    // Act: Submit blank Contact Form
    // 1. Click submit button
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    //Assert: Check to see if three error messages appear
    await waitFor(() =>
    {
        const errorMessages = screen.queryAllByTestId("error");
        expect(errorMessages).toHaveLength(3);
    });
});

// the component renders ONE error message if the user submits without filling in the email field.
test('renders ONE error message if user enters a valid first name and last name but no email.', async () =>
{
    // Arrange: render Contact Form
    render(<ContactForm />);

    // Act: Submit partially filled out Contact Form
    // 1. Give firstName input focus
    const firstNameInput = screen.getByLabelText(/first name*/i);

    // 2. Type first name with more than 5 characters into firstName focus
    userEvent.type(firstNameInput, "Vladislav");

    // 3. Give lastName input focus
    const lastNameInput = screen.getByLabelText(/last name*/i);

    // 4. Type last name into lastName focus
    userEvent.type(lastNameInput, "Balasanyan");

    // 5. Click submit button
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // Assert: Check to see if email error message appears
    const errorMessages = await screen.getAllByTestId("error");
    expect(errorMessages).toHaveLength(1);

    const emailError = await screen.findByText(/error: email must be a valid email address/i);
    expect(emailError).toBeInTheDocument();
});

// the component renders the text *"email must be a valid email address"* if an invalid email address is typed into the email field.
test('renders "email must be a valid email address" if an invalid email is entered', async () =>
{
    // Arrange: render Contact Form
    render(<ContactForm />);

    // Act: Enter invalid email
    // 1. Give email input focus
    const emailInput = screen.getByLabelText(/email*/i);

    // 2. Type invalid email
    userEvent.type(emailInput, "fake");

    // Assert: Check to see if email error message appears
    const emailError = await screen.findByText(/email must be a valid email address/i);
    expect(emailError).toBeInTheDocument();

});

// the component renders the text *"lastName is a required field"* the form is submitted without a last name.
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () =>
{
    // Arrange: render Contact Form
    render(<ContactForm />);

    // Act: Submit Contact Form with blank lastName input field
    // 1. Give firstName input focus
    const firstNameInput = screen.getByLabelText(/first name*/i);

    // 2. Type first name with more than 5 characters into firstName focus
    userEvent.type(firstNameInput, "Vladislav");

    // 3. Give email input focus
    const emailInput = screen.getByLabelText(/email*/i);

    // 4. Type email into email focus
    userEvent.type(emailInput, "vladislavbalasanyan@gmail.com");

    // 5. Click submit button
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // Assert: Check to see if lastName error message appears
    const lastNameError = await screen.findByText(/error: lastName is a required field/i);
    expect(lastNameError).toBeInTheDocument();

});

// the component renders the firstname, lastname and email text when submitted with valued fields and does **not** render a message value when one is not entered into the message field.
test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () =>
{
    // Arrange: render Contact Form
    render(<ContactForm />);

    // Act: Submit Contact Form without message
    // 1. Give firstName input focus
    const firstNameInput = screen.getByLabelText(/first name*/i);

    // 2. Type first name with more than 5 characters into firstName focus
    const firstName = "Vladislav";
    userEvent.type(firstNameInput, firstName);

    // 3. Give lastName input focus
    const lastNameInput = screen.getByLabelText(/last name*/i);

    // 4. Type last name into lastName focus
    const lastName = "Balasanyan";
    userEvent.type(lastNameInput, lastName);

    // 5. Give email input focus
    const emailInput = screen.getByLabelText(/email*/i);

    // 6. Type email into email focus
    const email = "vladislavbalasanyan@gmail.com";
    userEvent.type(emailInput, email);

    // 7. Click submit button
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // Assert: Check to make sure message value is not rendered

    await waitFor(() =>
    {
        const firstNameRender = screen.queryByText(firstName);
        const lastNameRender = screen.queryByText(lastName);
        const emailRender = screen.queryByText(email);
        const messageRender = screen.queryByTestId("messageDisplay");

        expect(firstNameRender).toBeInTheDocument();
        expect(lastNameRender).toBeInTheDocument();
        expect(emailRender).toBeInTheDocument();
        expect(messageRender).not.toBeInTheDocument();
    });
});

// renders all fields when the user submits with valid text filled in for all fields.
test('renders all fields text when all fields are submitted.', async () =>
{
    // Arrange: render Contact Form
    render(<ContactForm />);

    // Act: Submit Contact Form with message
    // 1. Give firstName input focus
    const firstNameInput = screen.getByLabelText(/first name*/i);

    // 2. Type first name with more than 5 characters into firstName focus
    const firstName = "Vladislav";
    userEvent.type(firstNameInput, firstName);

    // 3. Give lastName input focus
    const lastNameInput = screen.getByLabelText(/last name*/i);

    // 4. Type last name into lastName focus
    const lastName = "Balasanyan";
    userEvent.type(lastNameInput, lastName);

    // 5. Give email input focus
    const emailInput = screen.getByLabelText(/email*/i);

    // 6. Type email into email focus
    const email = "vladislavbalasanyan@gmail.com";
    userEvent.type(emailInput, email);

    // 7. Give message input focus
    const messageInput = screen.getByLabelText(/message/i);

    // 8. Type message into message focus
    const testMessage = "1, 2, 3, testing...";
    userEvent.type(messageInput, testMessage);

    // 9. Click submit button
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // Assert: Check to make sure all fields are rendered

    await waitFor(() =>
    {
        const firstNameRender = screen.queryByText(firstName);
        const lastNameRender = screen.queryByText(lastName);
        const emailRender = screen.queryByText(email);
        const messageRender = screen.queryByTestId("messageDisplay");

        expect(firstNameRender).toBeInTheDocument();
        expect(lastNameRender).toBeInTheDocument();
        expect(emailRender).toBeInTheDocument();
        expect(messageRender).toBeInTheDocument();
    });
});