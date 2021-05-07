import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import App from '../App';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});


test('renders the contact form header', ()=> {
    const {getByText} = render(<ContactForm />);
    const header = getByText(/Contact Form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).not.toBeFalsy();
    expect(header).toBeVisible();
    expect(header).toHaveTextContent("Contact Form");
});


test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render (<ContactForm/>);
    
    const firstNameInput = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(firstNameInput, "A");

    const button = screen.getByRole("button");
    userEvent.click(button);
    
    waitFor(async ()=> {
        expect(() => {
            firstNameInput("A");
        }).toThrow();
    });
});


test('renders THREE error messages if user enters no values into any fields.', async () => {
    render (<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(firstNameInput, "");

    const lastNameInput= screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastNameInput, "");

    const emailInput= screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "");

    const button = screen.getByRole("button");
    userEvent.click(button);

    waitFor(async ()=> {
        expect(() => {
            firstNameInput("");
        }).toThrow();

        expect(() => {
            lastNameInput("");
        }).toThrow();

        expect(() => {
            emailInput("");
        }).toThrow();
    });
});


test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(firstNameInput, "Angela");

    const lastNameInput= screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastNameInput, "Borgtron");

    const emailInput= screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "");

    waitFor(async ()=> {
        expect(() => {
            emailInput("");
        }).toThrow();
    });
});


test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render (<ContactForm/>);
    
    const emailInput= screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "");

    waitFor(async ()=> {
        expect(emailInput).toThrowError(/^email must be a valid email address$/);
        expect(emailInput).toThrowError(new Error("email must be a valid email address"));
    });
});


test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm/>);

    const lastNameInput= screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastNameInput, "");

    const button = screen.getByRole("button");
    userEvent.click(button);

    waitFor(async ()=> {
        expect(lastNameInput).toThrowError(/^lastName is a required field$/);
        expect(lastNameInput).toThrowError(new Error("lastName is a required field"));
    });
    
});


test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm/>);
    
    const firstNameInput = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(firstNameInput, "Angela");

    const lastNameInput= screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastNameInput, "Borgtron");

    const emailInput= screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "foo@bar.com");

    const button = screen.getByRole("button");
    userEvent.click(button);
    
    waitFor(async ()=> {
        const emailDisplay = screen.queryByText("foo@bar.com");
        const lastNameDisplay = screen.queryByText("Borgtron");
        const firstNameDisplay = screen.queryByText("Angela");
        const messageDisplay = screen.queryByText("foo");

        expect(messageDisplay).not.toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(firstNameDisplay).toBeInTheDocument();
    });
});


test('renders all fields text when all fields are submitted.', async () => {
    render (<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText(/Edd/i);
    userEvent.type(firstNameInput, "Angela");

    const lastNameInput= screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastNameInput, "Borgtron");

    const emailInput= screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "foo@bar.com");

    const messageText = "Cool guys don't look at explosions";
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, messageText);

    const button = screen.getByRole("button");
    userEvent.click(button);

    waitFor(async ()=> {
        const messageDisplay = screen.queryByText(messageText);
        const emailDisplay = screen.queryByText("foo@bar.com");
        const lastNameDisplay = screen.queryByText("Borgtron");
        const firstNameDisplay = screen.queryByText("Angela");
        

        expect(messageDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(firstNameDisplay).toBeInTheDocument();
    });
});  


test('renders Lambda header, with text "Lambda Integration Testing Challenge"', ()=>{
    const {getByText} = render(<App/>);

    const header = getByText(/Lambda Integration Testing Challenge/i);

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Lambda Integration Testing Challenge");
});