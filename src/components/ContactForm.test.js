import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
	render(<ContactForm />);
});

test('renders the contact form header', () => {
	render(<ContactForm />);
	const greetingHeader = screen.getByText("Contact Form");
	expect(greetingHeader).toBeInTheDocument();
});

describe('Async component', () => {
	test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
		render(<ContactForm />);
		const contactButton = screen.getByRole('button');
		userEvent.click(contactButton);
		const errorMessage = screen.findByText('must have at least 5 characters');
		expect(errorMessage);
	});
		
})

describe('Async component', () => {
	test('renders THREE error messages if user enters no values into any fields.', async () => {
		render(<ContactForm />);
		const contactButton = screen.getByRole('button');
		const emailError = screen.findByText('must be a valid email address');
		const errorMessage = screen.findByText('must have at least 5 characters');
		const lastNameError = screen.findByText('is a required field');
		userEvent.click(contactButton);
		expect(emailError);
		expect(errorMessage);
		expect(lastNameError);
	});
})

describe('Async Component', () => {
	test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
		render(<ContactForm />);
		const firstNameInput = screen.getByPlaceholderText('Edd');
		const lastNameInput = screen.getByPlaceholderText('Burke');
		const contactButton = screen.getByRole('button');
		const emailError = screen.findByText('must be a valid email address');
		userEvent.type(firstNameInput, "Abraman");
		userEvent.type(lastNameInput, "Gaaaarcia");
		userEvent.click(contactButton);
		expect(emailError);
		
	});
})

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});