import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

const firstName = () => screen.getByLabelText('First Name*')
const lastName = () => screen.getByLabelText('Last Name*')
const email = () => screen.getByLabelText('Email*')
const message = () => screen.getByLabelText('Message')
const submit = () => screen.getByTestId('submit')
const errors = () => screen.queryAllByTestId('error')

test('renders without errors', ()=>{
  render(<ContactForm/>)
})

test('renders the contact form header', ()=> {
  render(<ContactForm/>)
  screen.getByText('Contact Form')
})

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>)

  expect(errors().length).toEqual(0) // checks no errors to start

  userEvent.type(firstName(), 'aoeu')
  console.log(errors().length)
  expect(errors().length).toEqual(1)
})

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>)  
  userEvent.click(submit())
  
  expect(screen.queryAllByTestId('error').length).toEqual(3)
})

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>)
  
  userEvent.type(firstName(), 'pickle')
  userEvent.type(lastName(), 'doctor')
  userEvent.click(submit())
  
  console.log(errors().length)
  expect(errors().length).toEqual(1)
})

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm/>)
  
  userEvent.type(email(), 'invalidEmail')
  
  expect(errors().length).toEqual(1)
  
})

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm/>)
  
  userEvent.click(submit())
  
  screen.getByText('Error: lastName is a required field.')
})

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm/>)

  userEvent.type(firstName(), 'Matthew')
  userEvent.type(lastName(), 'E')
  userEvent.type(email(), 'validemail@email.com')
  userEvent.click(submit())

  screen.getByText('Matthew')
  screen.getByText('E')
  screen.getByText('validemail@email.com')

  expect(screen.queryByTestId('messageDisplay')).not.toBeInTheDocument()
})

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm/>)
  
  userEvent.type(firstName(), 'Matthew')
  userEvent.type(lastName(), 'E')
  userEvent.type(email(), 'validemail@email.com')
  userEvent.type(message(), 'message')
  userEvent.click(submit())
  
  screen.getByText('Matthew')
  screen.getByText('E')
  screen.getByText('validemail@email.com')
  expect(screen.queryByTestId('messageDisplay')).toBeInTheDocument()
})