import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
describe("the tests", () => {
    beforeEach(() => {
        render(<ContactForm />)
    })

    test('renders without errors', ()=>{
        render(<ContactForm />)
    });
    
    test('renders the contact form header', ()=> {
        const header = screen.getByText(/contact form/i)
        expect(header).toBeInTheDocument()
        expect(header).toBeTruthy()
    });
    
    test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
        const input = screen.getByLabelText(/first name*/i)
        userEvent.type(input, "1234")
        const errs = await screen.findAllByTestId("error")
        expect(errs.length).toBe(1)
    });
    
    test('renders THREE error messages if user enters no values into any fields.', async () => {
        const submit = screen.getByRole(/submit/i) 
        userEvent.click(submit)
        const errors = await screen.findAllByTestId("error")
        expect(errors.length).toBe(3)
    });
    
    test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, "FirstName")
        const lastName = screen.getByLabelText(/last name/i)
        userEvent.type(lastName, "LastName")
        const submit = screen.getByRole(/submit/i) 
        userEvent.click(submit)
        const errs = screen.getByTestId("message")
        expect(errs).toBeInTheDocument();
    });
    
    test('renders "email must be a valid email address" if an invalid email is entered', async () => {
        const emailInput = screen.getByLabelText(/email/i)
        userEvent.type(emailInput, "asdfghjkl")
        const err = screen.getByText(/email must be a valid email address/i)
        expect(err).toBeInTheDocument();
    });
    
    test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
        
        const emailInput = screen.getByLabelText(/email/i)
        userEvent.type(emailInput, "j@y.com")
        const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, "firstName")
        const submit = screen.getByRole(/submit/i) 
        userEvent.click(submit)
        const err = screen.getByText(/lastName is a required field/i)
        expect(err).toBeInTheDocument();
    });
    
    test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        const firstName = "Jacob"
        const lastName = "shomali"
        const email = "j@y.com"

        const firstNameInput = screen.getByLabelText(/First Name*/i)
        userEvent.type(firstNameInput, firstName)
        const lastNameInput = screen.getByLabelText(/Last Name*/i)
        userEvent.type(lastNameInput, lastName)
        const emailInput = screen.getByLabelText(/Email*/i)
        userEvent.type(emailInput, email)

        const submit = screen.getByRole(/submit/i) 
        userEvent.click(submit)

        const nameDisplay = screen.getByTestId("firstnameDisplay")
        const lastNameDisplay = screen.getByTestId("lastnameDisplay")
        const emailDisplay = screen.getByTestId("emailDisplay")
        expect(nameDisplay).toBeVisible();
        expect(lastNameDisplay).toBeVisible();
        expect(emailDisplay).toBeVisible();
    });
    
    test('renders all fields text when all fields are submitted.', async () => {
        const firstName = "Jacob"
        const lastName = "shomali"
        const email = "j@y.com"
        const message = "message"


        const firstNameInput = screen.getByLabelText(/First Name*/i)
        userEvent.type(firstNameInput, firstName)
        const lastNameInput = screen.getByLabelText(/Last Name*/i)
        userEvent.type(lastNameInput, lastName)
        const emailInput = screen.getByLabelText(/Email*/i)
        userEvent.type(emailInput, email)
        const messageInput = screen.getByTestId("message")
        userEvent.type(messageInput, message)

        const submit = screen.getByRole(/submit/i) 
        userEvent.click(submit)

        const nameDisplay = screen.getByTestId("firstnameDisplay")
        const lastNameDisplay = screen.getByTestId("lastnameDisplay")
        const emailDisplay = screen.getByTestId("emailDisplay")
        const msgDisplay = screen.getByTestId("messageDisplay")

        expect(nameDisplay).toBeVisible();
        expect(lastNameDisplay).toBeVisible();
        expect(emailDisplay).toBeVisible();
        expect(msgDisplay).toBeVisible();
    });
})