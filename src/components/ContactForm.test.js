import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';
import { mockComponent } from 'react-dom/test-utils';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    screen.getByText(/contact form/i);
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/first name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(firstNameField.value.length).toBeGreaterThan(4);
  
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.queryByLabelText(/first name/i);
    const lastNameField = screen.queryByLabelText(/last name/i);
    const emailField = screen.queryByLabelText(/email/i);

    expect(firstNameField).not.toBeEmpty();
    expect(lastNameField).not.toBeEmpty();
    expect(emailField).not.toBeEmpty();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.queryByLabelText(/first name/i);
    const lastNameField = screen.queryByLabelText(/last name/i);
    const emailField = screen.queryByLabelText(/email/i);

    expect(firstNameField).not.toBeEmpty();
    expect(lastNameField).not.toBeEmpty();
    expect(firstNameField.value.length).toBeGreaterThan(4);
    expect(emailField).toBeEmpty();


});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailField = screen.queryByLabelText(/email/i);

    userEvent.type(emailField, 'test@hotmail.com');
    

    expect(emailField.value.length).toBeGreaterThan(0)
    expect(emailField.value).toContain('@');
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const lastNameField = screen.queryByLabelText(/last name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    //userEvent.click(submitButton);
    

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});