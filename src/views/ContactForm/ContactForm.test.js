import React from 'react';
import {getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

//sanity check
test('renders without errors', ()=>{
    render(<ContactForm />)    
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.getByText(/Contact Form/i)
    expect(header).toBeVisible()
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy()
    
});

test('renders ONE error message if user enters less then 2 characters into firstname.', async () => {
      //Arrange
      render(<ContactForm />)
      const firstNameInput = screen.getByLabelText(/first name/i)
      const lastNameInput = screen.getByLabelText(/last name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      const buttonInput = screen.getByRole('button', {value: /submit/i})
      //Act
      userEvent.type(firstNameInput, 'S')
      userEvent.type(lastNameInput, 'Miller')
      userEvent.type(messageInput, "fixed the validation issues")
      userEvent.type(emailInput, 'tony.miller@blackthought.tech')
      userEvent.click(buttonInput)
  
      //Assertion sanity checker
      expect(firstNameInput).toBeVisible()
      const errorMessage = screen.getByText(/Error: firstName is required AND must have at least 2 characters./i);
      expect(errorMessage).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
          //Arrange
          render(<ContactForm />)
          const buttonInput = screen.getByRole('button', {value: /submit/i})
          //Act
          userEvent.click(buttonInput)
          //Assertion sanity checker
          expect(buttonInput).toBeVisible()
          const firstError = screen.getByText(/Error: firstName is required AND must have at least 2 characters./i);
          const secondError = screen.getByText(/Error: lastName is a required field/i);
          const thirdError = screen.getByText(/Error: email must be a valid email address/i)
          expect(firstError).toBeInTheDocument()
          expect(secondError).toBeInTheDocument()
          expect(thirdError).toBeInTheDocument()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        //Arrange
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText(/first name/i)
        const lastNameInput = screen.getByLabelText(/last name/i)
        const messageInput = screen.getByLabelText(/message/i)
        const buttonInput = screen.getByRole('button', {value: /submit/i})
        //Act
        userEvent.type(firstNameInput, 'Tony')
        userEvent.type(lastNameInput, 'Miller')
        userEvent.type(messageInput, "fixed the validation issues")
        userEvent.click(buttonInput)
    
        //Assertion sanity checker
        expect(firstNameInput).toBeVisible()
        const errorMessage = screen.getByText(/Error: email must be a valid email address./i);
        expect(errorMessage).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
          //Arrange
          render(<ContactForm />)
          const firstNameInput = screen.getByLabelText(/first name/i)
          const lastNameInput = screen.getByLabelText(/last name/i)
          const emailInput = screen.getByLabelText(/email/i)
          const messageInput = screen.getByLabelText(/message/i)
          const buttonInput = screen.getByRole('button', {value: /submit/i})
          //Act
          userEvent.type(firstNameInput, 'S')
          userEvent.type(lastNameInput, 'Miller')
          userEvent.type(messageInput, "fixed the validation issues")
          userEvent.type(emailInput, 'tony.milleught.tech')
          userEvent.click(buttonInput)
      
          //Assertion sanity checker
          expect(firstNameInput).toBeVisible()
          const errorMessage = screen.getByText(/Error: email must be a valid email address./i);
          expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
        //Arrange
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText(/first name/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/message/i)
        const buttonInput = screen.getByRole('button', {value: /submit/i})
        //Act
        userEvent.type(firstNameInput, 'Tony')
        userEvent.type(messageInput, "fixed the validation issues")
        userEvent.type(emailInput, 'tony.miller@blackthought.tech')
        userEvent.click(buttonInput)

        //Assertion sanity checker
        expect(firstNameInput).toBeVisible()
        const errorMessage = screen.getByText(/Error: lastName is a required field/i);
        expect(errorMessage).toBeInTheDocument()

    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
          //Arrange
          render(<ContactForm />)
          const firstNameInput = screen.getByLabelText(/first name/i)
          const lastNameInput = screen.getByLabelText(/last name/i)
          const emailInput = screen.getByLabelText(/email/i)         
          const messageValue = screen.queryByLabelText(/Message/i)
          const buttonInput = screen.getByRole('button', {value: /submit/i})
          //Act
          userEvent.type(firstNameInput, 'S')
          userEvent.type(lastNameInput, 'Miller')
          userEvent.type(messageValue, '')
          userEvent.type(emailInput, 'tony.miller@blackthought.tech')
          userEvent.click(buttonInput)
      
          //Assertion sanity checker
          expect(firstNameInput).toBeVisible();
          expect(messageValue).toBeEmpty()
});

test('renders all fields text when all fields are submitted.', async () => {
          //Arrange
          render(<ContactForm />)
          const firstNameInput = screen.getByLabelText(/first name/i)
          const lastNameInput = screen.getByLabelText(/last name/i)
          const emailInput = screen.getByLabelText(/email/i)
          const messageInput = screen.getByLabelText(/message/i)
          const buttonInput = screen.getByRole('button', {value: /submit/i})
          //Act
          userEvent.type(firstNameInput, 'Tony')
          userEvent.type(lastNameInput, 'Miller')
          userEvent.type(messageInput, "fixed the validation issues")
          userEvent.type(emailInput, 'tony.miller@blackthought.tech')
          userEvent.click(buttonInput)
      
          //Assertion sanity checker
          expect(firstNameInput).toBeVisible()
          expect(lastNameInput).toBeInTheDocument()
          expect(messageInput).toBeVisible()
          expect(emailInput).toBeVisible()

});