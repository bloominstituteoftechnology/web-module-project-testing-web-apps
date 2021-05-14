import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

const firstName = "George";
const shortFirstName = "Tim";
const lastName = "Smith";
const email = "email@email.com";
const message = "I love tacos";

test( 'renders without errors', () => {
	render( <ContactForm/> );
} );

test( 'renders the contact form header', () => {
	render( <ContactForm/> );

	expect( screen.getByText( /contact form/i ) );
} );

test( 'renders ONE error message if user enters less then 5 characters into firstname.', async () => {
	render( <ContactForm/> );

	const firstNameInput = screen.getByPlaceholderText( /edd/i );
	const lastNameInput = screen.getByPlaceholderText( /burke/i );
	const emailInput = screen.getByPlaceholderText( /bluebill1049@hotmail.com/i );
	const messageInput = screen.getByLabelText( /message/i );
	const submitButton = screen.getByRole( "button" );

	await userEvent.type( firstNameInput, shortFirstName );
	await userEvent.type( lastNameInput, lastName );
	await userEvent.type( emailInput, email );
	await userEvent.type( messageInput, message );

	userEvent.click( submitButton );

	const errorMessage = await screen.getByTestId( "error" );

	expect( errorMessage ).toHaveTextContent( /must have at least 5 characters./i );
} );

test( 'renders THREE error messages if user enters no values into any fields.', async () => {
	render( <ContactForm/> );

	const firstNameInput = screen.getByPlaceholderText( /edd/i );
	const lastNameInput = screen.getByPlaceholderText( /burke/i );
	const emailInput = screen.getByPlaceholderText( /bluebill1049@hotmail.com/i );
	const messageInput = screen.getByLabelText( /message/i );
	const submitButton = screen.getByRole( "button" );

	await userEvent.type( firstNameInput, "" );
	await userEvent.type( lastNameInput, "" );
	await userEvent.type( emailInput, "" );
	await userEvent.type( messageInput, "" );

	userEvent.click( submitButton );

	const errorMessages = await screen.getAllByTestId( "error" );

	expect( errorMessages ).toHaveLength( 3 );
} );

test( 'renders ONE error message if user enters a valid first name and last name but no email.', async () => {
	render( <ContactForm/> );

	const firstNameInput = screen.getByPlaceholderText( /edd/i );
	const lastNameInput = screen.getByPlaceholderText( /burke/i );
	const emailInput = screen.getByPlaceholderText( /bluebill1049@hotmail.com/i );
	const messageInput = screen.getByLabelText( /message/i );
	const submitButton = screen.getByRole( "button" );

	await userEvent.type( firstNameInput, firstName );
	await userEvent.type( lastNameInput, lastName );
	await userEvent.type( emailInput, "" );
	await userEvent.type( messageInput, message );

	userEvent.click( submitButton );

	const errorMessage = await screen.getByTestId( "error" );

	expect( errorMessage ).toHaveTextContent( /valid email/i );
} );

test( 'renders "email must be a valid email address" if an invalid email is entered', async () => {
	render( <ContactForm/> );

	const firstNameInput = screen.getByPlaceholderText( /edd/i );
	const lastNameInput = screen.getByPlaceholderText( /burke/i );
	const emailInput = screen.getByPlaceholderText( /bluebill1049@hotmail.com/i );
	const messageInput = screen.getByLabelText( /message/i );
	const submitButton = screen.getByRole( "button" );

	await userEvent.type( firstNameInput, firstName );
	await userEvent.type( lastNameInput, lastName );
	await userEvent.type( emailInput, "jkhgyucftyd" );
	await userEvent.type( messageInput, message );

	userEvent.click( submitButton );

	const errorMessage = await screen.getByTestId( "error" );

	expect( errorMessage ).toHaveTextContent( /valid email/i );
} );

test( 'renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
	render( <ContactForm/> );

	const firstNameInput = screen.getByPlaceholderText( /edd/i );
	const lastNameInput = screen.getByPlaceholderText( /burke/i );
	const emailInput = screen.getByPlaceholderText( /bluebill1049@hotmail.com/i );
	const messageInput = screen.getByLabelText( /message/i );
	const submitButton = screen.getByRole( "button" );

	await userEvent.type( firstNameInput, firstName );
	await userEvent.type( lastNameInput, "" );
	await userEvent.type( emailInput, email );
	await userEvent.type( messageInput, message );

	userEvent.click( submitButton );

	const errorMessage = await screen.getByTestId( "error" );

	expect( errorMessage ).toHaveTextContent( /required/i );
} );

test( 'renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
	render( <ContactForm/> );

	const firstNameInput = screen.getByPlaceholderText( /edd/i );
	const lastNameInput = screen.getByPlaceholderText( /burke/i );
	const emailInput = screen.getByPlaceholderText( /bluebill1049@hotmail.com/i );
	const messageInput = screen.getByLabelText( /message/i );
	const submitButton = screen.getByRole( "button" );

	await userEvent.type( firstNameInput, firstName );
	await userEvent.type( lastNameInput, lastName );
	await userEvent.type( emailInput, email );

	userEvent.click( submitButton );

	const messageDisplay = await screen.queryByTestId( "messageDisplay" );

	expect( messageDisplay ).toBeNull();
} );

test( 'renders all fields text when all fields are submitted.', async () => {
	render( <ContactForm/> );

	const firstNameInput = screen.getByPlaceholderText( /edd/i );
	const lastNameInput = screen.getByPlaceholderText( /burke/i );
	const emailInput = screen.getByPlaceholderText( /bluebill1049@hotmail.com/i );
	const messageInput = screen.getByLabelText( /message/i );
	const submitButton = screen.getByRole( "button" );

	await userEvent.type( firstNameInput, firstName );
	await userEvent.type( lastNameInput, lastName );
	await userEvent.type( emailInput, email );
	await userEvent.type( messageInput, message );

	userEvent.click( submitButton );

	const firstNameDisplay = await screen.queryByTestId( "firstnameDisplay" );
	const lastNameDisplay = await screen.queryByTestId( "lastnameDisplay" );
	const emailDisplay = await screen.queryByTestId( "emailDisplay" );
	const messageDisplay = await screen.queryByTestId( "messageDisplay" );

	expect( firstNameDisplay ).toBeInTheDocument();
	expect( lastNameDisplay ).toBeInTheDocument();
	expect( emailDisplay ).toBeInTheDocument();
	expect( messageDisplay ).toBeInTheDocument();
} );
