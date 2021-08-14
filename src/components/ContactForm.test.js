import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
   render(<ContactForm />)
});

test('renders the contact form header', ()=> {
	const { getByText } = render(<ContactForm />)
	const header = getByText(/contact form/i)

	expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
	render(<ContactForm />)
	// first I need to find if the app contains the input field first name
	const firstName = screen.getByLabelText(/First Name*/i)
	// then type a name with 5 characters
	userEvent.type(firstName, 'stev');
	//check for error message
	const error = screen.getAllByTestId("error");
	//check if the error displays
	expect(error)

	
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
	// render(<ContactForm />)
	
	// const firstName = screen.getByLabelText(/First Name*/i)
	// const lastName = screen.getByLabelText(/Last Name/i)
	// const email = screen.getByLabelText(/email/i)

	// userEvent.type(firstName, '')
	// userEvent.type(lastName,'')
	// userEvent.type(email, '') 

	// const error = screen.getAllByTestId(/error/i)

	// expect(error).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});