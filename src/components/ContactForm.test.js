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

describe('Async firstname component', () => {
	test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
		render(<ContactForm />);
		const contactButton = screen.getByRole('button');
		userEvent.click(contactButton);
		const errorMessage = screen.findByText('must have at least 5 characters');
		expect(errorMessage);
	});
		
})

describe('Async all error fields components', () => {
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

describe('Async missing email input', () => {
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

describe('Async wrong email input', () => {
	test('renders "email must be a valid email address" if an invalid email is entered', async () => {
		render(<ContactForm />);
		const firstNameInput = screen.getByPlaceholderText('Edd');
		const lastNameInput = screen.getByPlaceholderText('Burke');
		const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
		const contactButton = screen.getByRole('button');
		const emailError = screen.findByText('must be a valid email address');
		userEvent.type(firstNameInput, "Abraman");
		userEvent.type(lastNameInput, "Gaaaarcia");
		userEvent.type(emailInput, "abraman.com");
		userEvent.click(contactButton);
		expect(emailError);
	});
})
	
describe('Async no lastname input component', () => {
	test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
		render(<ContactForm />);
		const lastNameError = screen.findByText('is a required field');
		const lastNameInput = screen.getByPlaceholderText('Burke');
		const contactButton = screen.getByRole('button');
		userEvent.type(lastNameInput, "");
		userEvent.click(contactButton);
		expect(lastNameError);
	});
})

describe('Async Message text', () => {
	test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
		render(<ContactForm />);
		const firstNameInput = screen.getByPlaceholderText('Edd');
		const lastNameInput = screen.getByPlaceholderText('Burke');
		const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
		const contactButton = screen.getByRole('button');
		// const messageInput = screen.getByPlaceholderText('type message here');
		const messageBox = screen.findByText('Message:', {exact: true});
		userEvent.type(firstNameInput, "Abraman");
		userEvent.type(lastNameInput, "Gaaaarcia");
		userEvent.type(emailInput, "abraman@bossin.com");
		// userEvent.type(messageInput, "");
		userEvent.click(contactButton);
		expect(messageBox);
	});
})

describe('Async all forms submit component', () => {
	test('renders all fields text when all fields are submitted.', async () => {
		render(<ContactForm />);
			const firstNameInput = screen.getByPlaceholderText('Edd');
			const lastNameInput = screen.getByPlaceholderText('Burke');
			const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
			const contactButton = screen.getByRole('button');
			const messageInput = screen.getByPlaceholderText('type message here');
			const messageBox = screen.findByText('Message:');
			userEvent.type(firstNameInput, "Abraman");
			userEvent.type(lastNameInput, "Gaaaarcia");
			userEvent.type(emailInput, "abraman@bossin.com");
			userEvent.type(messageInput, "Test");
			userEvent.click(contactButton);
			expect(messageBox);
	});
})
