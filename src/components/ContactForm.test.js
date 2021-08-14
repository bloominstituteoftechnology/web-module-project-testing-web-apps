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
	const error = screen.queryAllByText(/error/i);
	// check if the error displays
	expect(error).toHaveLength(1)

	// arrange
	// act
	// assert
	
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
	render(<ContactForm />)
	
	const firstName = screen.getByLabelText(/First Name*/i)
	const lastName = screen.getByLabelText(/Last Name/i)
	const email = screen.getByLabelText(/email/i)

	userEvent.type(firstName, '')
	userEvent.type(lastName,'')
	userEvent.type(email, '') 

	const error = screen.queryAllByText("error")
	expect(error).toBeTruthy()

	

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
   render(<ContactForm />)
	
	const firstName = screen.getByLabelText(/First Name*/i)
	const lastName = screen.getByLabelText(/Last Name/i)
	const email = screen.getByLabelText(/email/i)

	userEvent.type(firstName, 'Steve')
	userEvent.type(lastName,'Rivera')
	userEvent.type(email, '') 

	const error = screen.queryAllByText("error")
	expect(error).toBeTruthy() 
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />)
	

	const email = screen.getByLabelText(/email/i)

	
	userEvent.type(email, 'steveyahoo.com')

	const error = screen.queryAllByText("error")
	expect(error).toMatch("email must be a valid email address")
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
   render(<ContactForm />)
	

	const lastName = screen.getByLabelText(/Last Name*/i)

	
	userEvent.type(email, 'steveyahoo.com')

	const error = screen.queryAllByText("error")
	expect(error).toMatch("email must be a valid email address")
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});