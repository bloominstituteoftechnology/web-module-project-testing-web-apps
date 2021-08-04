import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test("does the test 1", ()=>{
    // throw new Error("This is an error")
    console.log('doing a sanity test 1');
});


it('renders without errors', ()=>{
    render(<ContactForm />);
});

test('2 renders the contact form header', ()=> {
    render(<ContactForm />);
	const header = screen.queryByText(/contact form/i);
    console.log(header);
	expect(header).toBeInTheDocument();//can use either
    expect(header).toBeVisible();//can use any of these
    expect(header).toHaveTextContent(/contact form/i);
    expect(header).toBeTruthy();
    expect(header).not.toBeFalsy();
//another example to just have plenty of options
    const h1 = screen.queryByTestId('testh1');
    expect(h1).toBeInTheDocument();//can also tag with an id and use any of these 
});


test('3 renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = "Ric";
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);
    const errorMessage = screen.queryAllByText(/error/i);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage).toBeTruthy();//same thing
});


test('4 renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button');//arrange 
    userEvent.click(submitButton);
    const errorMessages = screen.queryAllByTestId(/error/i);
    expect(errorMessages).toHaveLength(3);

});

test('5 renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    //enters first name
    const firstName = "Ricster";
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);
    //enters last name
    const lastName = "Mansfield";
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, lastName);
    //uses submit button before entering email
    const button = screen.getByRole('button');
	userEvent.click(button);
    //should see error for email
    const errorMessages = screen.queryAllByText(/error/i);
	expect(errorMessages).toHaveLength(1);
    //alternative check for email error message using preestablished variable from test 4
    const emailErrorMessage = screen.queryAllByTestId(/error/i);
    expect(emailErrorMessage).toHaveLength(1);

});

test('6 renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    //Arrange = create bad email and retrieve email input field
    const email = 'badEmail';
    const emailInput = screen.getByLabelText(/email/i);
    //Act = input bad email into field just like a user might do & use submitt button
    userEvent.type(emailInput, email);
    const submitButton = screen.getByRole('button');//arrange 
    userEvent.click(submitButton);
    //Assert = expect to get error message for email
    const errorMessage = screen.queryByText(/email must be a valid email address/i);
	expect(errorMessage).toBeVisible();

});

test('7 renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    //ARRANGE - The message prints upon using submit without doing anything So We only need to screen for the button 
    const submitButton = screen.getByRole('button');
    //ACT - user then clicks the button
    userEvent.click(submitButton);
    //ASSERT - error message for last name is expected 
    const errorMessage = screen.queryByText(/lastName is a required field/i);
	expect(errorMessage).toBeVisible();
    
});

test('8 renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
    render(<ContactForm />);
    //Arrange Need good first, last and email and screen for each field
    const firstName = 'William';
    const lastName = 'Mansfield';
    const email = 'RicksMyCodeGuy@gmail.com';

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/email/i);
    //Act user inputs each and clicks submit button no message until after clicked
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(emailInput, email);

    const messageDiv = screen.queryByText(/you submitted/i);
    expect(messageDiv).toBeFalsy();//starts falsy

    const button = screen.getByRole('button');
    userEvent.click(button);
    //Assert - should get affimative You Submitted: card back with all details rendered back
    // expect(messageDiv).toBeTruthy();//ends truthy couldn't get this to work. seeing help

    const firstNameDisplay = screen.queryByTestId('firstnameDisplay');
    const lastNameDisplay = screen.queryByTestId('lastnameDisplay');
    const emailDisplay = screen.queryByTestId('emailDisplay');

    expect(firstNameDisplay).toBeVisible();
    expect(lastNameDisplay).toBeVisible();
    expect(emailDisplay).toBeVisible();

    test('9 renders all fields text when all fields are submitted.', async () => {
        render(<ContactForm />);
        //Arranged need good first, last, email, scan for each field
        const firstName = 'Wiliam';
        const lastName = 'Mansfield';
        const email = 'RicksMyCodeGuy@gmail.com';
    
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/email/i);
        
        //ACT - user enters each as arranged above and uses submit button
        userEvent.type(firstNameInput, firstName);
        userEvent.type(lastNameInput, lastName);
        userEvent.type(emailInput, email);
    
        const button = screen.getByRole('button');
        userEvent.click(button);
    
        //Assert - must utilize a delay method | Per Warrens video the "Await" vs the "Promise" is shorter. I've included the notes from class an an extra file called notes.md attached next to the readme.md file.  
        const firstNameDisplay = await screen.findByTestId('firstnameDisplay');
    
        expect(firstNameDisplay).toBeVisible();
        expect(screen.getByText(/mansfield/i)).toBeTruthy();
        screen.getByText(/mansfield/i);
    });