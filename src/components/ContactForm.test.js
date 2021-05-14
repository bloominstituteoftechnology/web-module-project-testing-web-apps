import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

//1
test('renders without errors', ()=>{
    render (<ContactForm/>)
});
//2
test('renders the contact form header', ()=> {
render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();   
});
//3
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
render(<ContactForm/>);
  const firstInput = screen.getByLabelText("First Name*")
    userEvent.type(firstInput,"Walter");

  const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument(); 
});
//4
test('renders THREE error messages if user enters no values into any fields.', async () => {
render(<ContactForm/>);
  const button = screen.getByRole("button");
    userEvent.click(button);

  const err = await screen.findAllByTestId(/error/i);
    expect(err).toHaveLength(3);
});
//5
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
render(<ContactForm/>);
  const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Walter");

  const secondInput = screen.getByLabelText("Last Name*");
    userEvent.type(secondInput,"Grey");

  const button = screen.getByRole("button");
    userEvent.click(button);

  const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument();
});
//6
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
render(<ContactForm/>);
  const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput, "WalterDanger135");

  const err = await screen.findByTestId(/error/i);
    expect(err).toHaveTextContent("email must be a valid email address");    
});
//7
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Walter");

const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput, "WalterDanger135@gmail.com");

const button = screen.getByRole("button");
    userEvent.click(button);

const err = await screen.findByTestId(/error/i);
    expect(err).toHaveTextContent("lastName is a required field");    
});
//8
test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
render(<ContactForm/>);
const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Walter");

const secondInput = screen.getByLabelText("Last Name*");
    userEvent.type(secondInput,"Grey");

const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput, "WalterDanger135@gmail.com");

const button = screen.getByRole("button");
    userEvent.click(button);

const fnSubmmitted = await screen.findByTestId("firstnameDisplay");
    expect(fnSubmmitted).toBeInTheDocument();

const lnSubmitted = await screen.findByTestId("lastnameDisplay");
    expect(lnSubmitted).toBeInTheDocument();
const eSubmitted = await screen.findByTestId("emailDisplay");
    expect(eSubmitted).toBeInTheDocument();
const bSubmmited  = await screen.queryByTestId("messageDisplay");
    expect(bSubmmited).not.toBeInTheDocument();   
});
//9
test('renders all fields text when all fields are submitted.', async () => {
render(<ContactForm/>);
const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Walter");

const secondInput = screen.getByLabelText("Last Name*");
    userEvent.type(secondInput,"Grey");

const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput, "WalterDanger135@gmail.com");

const fourthInput = screen.getByLabelText("Message");
    userEvent.type(fourthInput, "Hello There!");

const button = screen.getByRole("button");
    userEvent.click(button);

const fnSubmmitted = await screen.findByTestId("firstnameDisplay");
    expect(fnSubmmitted).toBeInTheDocument();
const lnSubmitted = await screen.findByTestId("lastnameDisplay");
    expect(lnSubmitted).toBeInTheDocument();
const eSubmitted = await screen.findByTestId("emailDisplay");
    expect(eSubmitted).toBeInTheDocument();
const bSubmmited  = await screen.findByTestId("messageDisplay");
    expect(bSubmmited).toBeInTheDocument();
});