/**
 * Tom Bielawski
 * Lambda School WEB45
 * 3.1.4 Testing
 * 8/5/2021
 */

//Imports
import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

//Sanity test
test('renders without errors', ()=>
{
    //Ensure the form renders
    render(<ContactForm/>);
});


test('renders the contact form header', ()=> 
{
    //Arrange: Render the form
    render(<ContactForm/>);

    //Act: Declare header to hold the text
    const header = screenGetByText(/contact form/i);
    
    //Assert: 
    //determine if contents of "header" are in the doc,
    //are truthy, have text content
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form");

});


test('renders ONE error message if user enters less then 5 characters into firstname.', async () => 
{
    //Arrange: Render the form
    render(<ContactForm/>);

    //Act: Declare variables to hold the text
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "abcd");
    const errors = screen.queryAllByText(/error/i);

    
    //Assert: 
    expect(errors).toBeTruthy();


});

test('renders THREE error messages if user enters no values into any fields.', async () => 
{
    //Arrange:
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    
    //Act:
    userEvent.type(firstName, "abcd");
    userEvent.type(lastName, "");
    userEvent.type(email, "");

    //Assert:
    const error1 = screen.queryAllByText(/error/i);
    expect(error1).toBeTruthy();
    const error2 = screen.queryAllByText(/error/i);
    expect(error2).toBeTruthy();
    const error3 = screen.queryAllByText(/error/i);
    expect(error3).toBeTruthy();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => 
{
    //Arrange:
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    
    //Act:
    userEvent.type(firstName,"tester");
    userEvent.type(lastName,"tester");
    userEvent.type(email,"");

    //Assert
    const errorEmail = screen.queryAllByText(/error/i)
    expect(errorEmail).toBeTruthy();
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => 
{
    //Arrange:
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);

    //Act:
    userEvent.type(firstName,"tester");
    userEvent.type(lastName,"tester");
    userEvent.type(email,"test@test.com");

    //Assert:
    const emailError = screen.queryByText(/email must be a valid email address/i);
    expect(emailError).toBeTruthy();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => 
{
    //Arrange: 
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    
    //Assert:
    userEvent.type(firstName,"tester");
    userEvent.type(lastName,"");
    userEvent.type(email,"test@test.com");
   
    //Act: 
    const theButton = screen.getByRole("button");
    userEvent.click(theButton);
    const error = screen.queryAllByText(/lastName is a required field/i)
    expect(error).toBeTruthy();
     
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => 
{
    //Arrange:
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);

    //Act:
    userEvent.type(message,"test");
    userEvent.type(email, "test@test.com");
    userEvent.type(lastName,"Vader");
    userEvent.type(firstName, "Darth");

    //Assert:
    expect(firstSubmitted).toBeTruthy();
    expect(lastSubmitted).toBeTruthy();
    expect(emailSubmitted).toBeTruthy();

});

test('renders all fields text when all fields are submitted.', async () => 
{
   //Arrange: 
   render(<ContactForm/>);
   //selecting the fields
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);

    //Act:
    userEvent.type(message,"test");
    userEvent.type(email, "test@test.com");
    userEvent.type(lastName,"Vader");
    userEvent.type(firstName, "Darth");

   
   //Assert:
   const button = screen.getByRole("button")
   userEvent.click(button)
  
   await waitFor(()=> 
   {
       const firstSubmitted = screen.queryByTestId('firstNameDisplay');
       expect(firstSubmitted).toBeTruthy();
   })

   await waitFor(()=> 
   {
       const lastSubmitted = screen.queryByTestId('lastNameDisplay');
       expect(lastSubmitted).toBeTruthy();
   })

   await waitFor(()=> 
   {
       const emailSubmitted = screen.queryByTestId('emailDisplay');
       expect(emailSubmitted).toBeTruthy();
   })

   await waitFor(()=> 
   {
       const messageSubmitted = screen.queryByTestId('messageDisplay');
       expect(messageSubmitted).toBeTruthy();
   })
});