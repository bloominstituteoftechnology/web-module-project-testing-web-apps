import React rom 'React';
import {render ,screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from "./App";
import ContactForm from './ContactForm';

test('renders without errors', ()=>{

render(<ContactForm/>)
    
});

test('renders the contact form header', ()=> {

render(<ContactForm />)

const header = screen.queryByText(/contact form/i)
expect(header).toBeInTheDocument()
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

    render(<ContactForm/>)

    const firstname = screen.getByLabelText("First Name*")
    userEvent.type(firstname, "King")
   const  errors = await screen.getByTestId(/errors/i) 
   expect(errors.length).toEqual(1) 

    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    

render(<ContactForm/>)

const button = screen.getByRole("button")
userEvent.click(button)
const errors = await screen.getByTestId(/errors/i)
expect(errors.length).toEqual(3)

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
    render (<ContactForm/>) 
    const firstname = screen.getByLabelText('First Name*')
    const lastname = screen.getByLabelText("Last Name*")
    const button = screen.getByRole("button")
userEvent.type(firstname, "HELLO") 
userEvent.type(lastname, "GOODBYE")
userEvent.click(button)
const errors = await screen.getByTestId(/errors/i)
expect(errors.length).toEqual(1) 

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
    render (<ContactForm/>) 
const email = screen.getByLabelText("Email*")
userEvent.type(email, "A0L.com")
const errors = await screen.queryByText(/email must be a vaild email address/i) 
expect(errors).toBeInTheDocument()



});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm/>)  
    const button = screen.getByRole("button")
    userEvent.click(button)
    const errors = screen.queryByText(/lastName is a required field/i)
    await waitFor( ( ) => {
        expect(errors).toBeInTheDocument()
    } ) 




});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm/>) 
    const firstname = screen.getByLabelText('First Name*')
    const lastname = screen.getByLabelText("Last Name*")
    const button = screen.getByRole("button")
    const email = screen.getByLabelText("Email*")
 
userEvent.type(email, "email@A0L.com")
userEvent.type(firstname, "HELLO") 
userEvent.type(lastname, "GOODBYE")
userEvent.click(button)

const firstnameDisplay =  screen.getByTestId("firstnameDisplay")
const lastnameDisplay =  screen.getByTestId("lastnameDisplay")
const emailDisplay =  screen.getByTestId("emailDisplay")
const messageDisplay =  screen.getByTestId("messageDisplay")
expect(firstnameDisplay).toBeInTheDocument()
expect(lastnameDisplay).toBeInTheDocument()
expect(emailDisplay).toBeInTheDocument()
expect(messageDisplay).toBeNull()



});

test('renders all fields text when all fields are submitted.', async () => {
    render (<ContactForm/>) 





});