import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
  render(<ContactForm />)
});

test('renders the contact form header', ()=> {
  render(<ContactForm />)
  const header = screen.getByText('Contact Form')
  expect(header).toBeInTheDocument()
  expect(header).toBeTruthy()
  expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />)
  const firstName = screen.getByLabelText('First Name*')
  userEvent.type(firstName, 'abc')
  const firstNameError = await screen.findByTestId('error')
  expect(firstNameError).toBeInTheDocument()
  expect(firstNameError).toBeTruthy()
  expect(firstNameError).toHaveTextContent('firstName must have at least 5 characters.')
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)
  const button = screen.getByRole('button')
  userEvent.click(button)
  const errors = await screen.findAllByTestId('error')
  console.log(errors)
  expect(errors[0]).toBeInTheDocument()
  expect(errors[0]).toBeTruthy()
  expect(errors[0]).toHaveTextContent('firstName must have at least 5 characters.')
  expect(errors[1]).toBeInTheDocument()
  expect(errors[1]).toBeTruthy()
  expect(errors[1]).toHaveTextContent('lastName is a required field.')
  expect(errors[2]).toBeInTheDocument()
  expect(errors[2]).toBeTruthy()
  expect(errors[2]).toHaveTextContent('email must be a valid email address.')
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />)
  const firstName = screen.getByLabelText('First Name*')
  userEvent.type(firstName, 'Matthew')
  const lastName = screen.getByLabelText('Last Name*')
  userEvent.type(lastName, 'Phillips')
  const button = screen.getByRole('button')
  userEvent.click(button)
  const emailError = await screen.findByTestId('error')
  expect(emailError).toBeInTheDocument()
  expect(emailError).toBeTruthy()
  expect(emailError).toHaveTextContent('email must be a valid email address.')
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />)
  const email = screen.getByLabelText('Email*')
  userEvent.type(email, 'abc')
  const emailError = await screen.findByTestId('error')
  expect(emailError).toBeInTheDocument()
  expect(emailError).toBeTruthy()
  expect(emailError).toHaveTextContent('email must be a valid email address.')
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />)
  const firstName = screen.getByLabelText('First Name*')
  userEvent.type(firstName, 'Matthew')
  const email = screen.getByLabelText('Email*')
  userEvent.type(email, 'matt@matt.com')
  const button = screen.getByRole('button')
  userEvent.click(button)
  const lastNameError = await screen.findByTestId('error')
  expect(lastNameError).toBeInTheDocument()
  expect(lastNameError).toBeTruthy()
  expect(lastNameError).toHaveTextContent('lastName is a required field.')
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />)
  const firstName = screen.getByLabelText('First Name*')
  userEvent.type(firstName, 'Matthew')
  const lastName = screen.getByLabelText('Last Name*')
  userEvent.type(lastName, 'Phillips')
  const email = screen.getByLabelText('Email*')
  userEvent.type(email, 'matt@matt.com')
  const button = screen.getByRole('button')
  userEvent.click(button)

  const firstNameDisplay = await screen.findByTestId('firstnameDisplay')
  const lastNameDisplay = await screen.findByTestId('lastnameDisplay')
  const emailNameDisplay = await screen.findByTestId('emailDisplay')

  expect(firstNameDisplay).toBeInTheDocument()
  expect(firstNameDisplay).toBeTruthy()
  expect(firstNameDisplay).toHaveTextContent('First Name: Matthew')
  expect(lastNameDisplay).toBeInTheDocument()
  expect(lastNameDisplay).toBeTruthy()
  expect(lastNameDisplay).toHaveTextContent('Last Name: Phillips')
  expect(emailNameDisplay).toBeInTheDocument()
  expect(emailNameDisplay).toBeTruthy()
  expect(emailNameDisplay).toHaveTextContent('Email: matt@matt.com')
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />)
  const firstName = screen.getByLabelText('First Name*')
  userEvent.type(firstName, 'Matthew')
  const lastName = screen.getByLabelText('Last Name*')
  userEvent.type(lastName, 'Phillips')
  const email = screen.getByLabelText('Email*')
  userEvent.type(email, 'matt@matt.com')
  const message = screen.getByLabelText('Message')
  userEvent.type(message, 'This is a test.')
  const button = screen.getByRole('button')
  userEvent.click(button)

  const firstNameDisplay = await screen.findByTestId('firstnameDisplay')
  const lastNameDisplay = await screen.findByTestId('lastnameDisplay')
  const emailNameDisplay = await screen.findByTestId('emailDisplay')
  const messageDisplay = await screen.findByTestId('messageDisplay')

  expect(firstNameDisplay).toBeInTheDocument()
  expect(firstNameDisplay).toBeTruthy()
  expect(firstNameDisplay).toHaveTextContent('First Name: Matthew')
  expect(lastNameDisplay).toBeInTheDocument()
  expect(lastNameDisplay).toBeTruthy()
  expect(lastNameDisplay).toHaveTextContent('Last Name: Phillips')
  expect(emailNameDisplay).toBeInTheDocument()
  expect(emailNameDisplay).toBeTruthy()
  expect(emailNameDisplay).toHaveTextContent('Email: matt@matt.com')
  expect(messageDisplay).toBeInTheDocument()
  expect(messageDisplay).toBeTruthy()
  expect(messageDisplay).toHaveTextContent('Message: This is a test.')
});