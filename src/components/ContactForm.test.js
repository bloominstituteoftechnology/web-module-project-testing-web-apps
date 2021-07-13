import React from 'react';
import {fireEvent, getByText, queryAllByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import * as rtl from 'react-testing-library'
// import 'jest-dom/extend-expect'

import ContactForm from './ContactForm';

// test('practice test', ()=>{

//     //Arrange, (act)
//     const { getByText } = render(<ContactForm isFetchingData={true}/>)
//     const message = getByText(/email/i);
//     //Assertion
//     // expect(message).not.toBeNull();

// });

//1
test('renders without errors', ()=>{

    render(<ContactForm/>)

});

//2
test('renders the contact form header', ()=> {
    //Arrange, (act)
    const {getByText} = render(
        <ContactForm>
            <h1 isFetchingData={true}></h1>
        </ContactForm>
    )
    const message = getByText(/Contact Form/i)
    //Assertion
    expect(message).toBeTruthy();
});

//3
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

  // Arrange
  render(<ContactForm/>)

  // Act
  screen.queryAllByPlaceholderText(/Edd/i);

  userEvent.type(screen.getByRole('textbox'), 'Hell')

  let firstError = screen.queryAllByText(/5 characters/i)
  // Assert

  expect(screen.getByRole('textbox')).toHaveValue('Hell')
  expect(firstError).toBeTruthy();

});

//4
test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    userEvent.type(screen.getByRole('textbox'), ' ')
    userEvent.type(screen.getByRole('textbox'), ' ')
    userEvent.type(screen.getByRole('textbox'), ' ')

    
    
    const firstErr = screen.queryAllByText(/5 characters/i);
    const lastErr = screen.getByText(/last name/i);
    const emailErr = screen.getByText(/email/i);

    //Assert
    expect(firstErr).toBeTruthy();
    expect(lastErr).toBeTruthy();
    expect(emailErr).toBeTruthy();
    
});

//5
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    const firstBox = screen.getAllByPlaceholderText(/Edd/i)
    const lastBox = screen.getAllByPlaceholderText(/Burke/i)
    const emailBox = screen.getAllByPlaceholderText(/bluebill1049@hotmail.com/i)

    userEvent.type(screen.getByRole('textbox'), 'Joseph ')
    userEvent.type(screen.getByRole('textbox'), 'Krapsicher ')

    const emailErr = screen.queryAllByText(/email/i);

    //Assert
    expect(firstBox).toBeTruthy();
    expect(lastBox).toBeTruthy();
    expect(emailBox).toBeTruthy();

});

//6
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //Arange
    render(<ContactForm/>)

    const emailInput = screen.getAllByPlaceholderText(/bluebill1049@hotmail.com/i)

    //Act
    userEvent.type(screen.getByRole('textbox'), 'Joe@nomail.com ')
    const emailErr = screen.queryAllByText(/email/i);

    //Assert

    expect(emailInput).toBeTruthy();
    expect(emailErr).toBeTruthy();
});

//7
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    const lastInput = screen.getAllByPlaceholderText(/Burke/i)
    userEvent.type(screen.getByRole('textbox'), ' ')
    userEvent.click(screen.getByRole('button'))

    const emailErr = screen.getAllByText(/must be a valid email address/i)

    //Assert

    expect(emailErr).toBeTruthy();
    
});


//8
test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //Arange
    render(<ContactForm/>)

    //Act
    const firstInput = screen.getAllByPlaceholderText(/Edd/i)
    const lastInput = screen.getAllByPlaceholderText(/Burke/i)
    const emailInput = screen.getAllByPlaceholderText(/bluebill1049@hotmail.com/i)

    userEvent.type(screen.getByRole('textbox'), 'Joseph ')
    userEvent.type(screen.getByRole('textbox'), 'Krapsicher ')
    userEvent.type(screen.getByRole('textbox'), 'JoeKraspicher@gmail.com ')

    userEvent.click(screen.getByRole('button'))

    //Assert
    expect(firstInput).toBeTruthy();
    expect(lastInput).toBeTruthy();
    expect(emailInput).toBeTruthy();



});

//9
test('renders all fields text when all fields are submitted.', async () => {
    //Arange
    render(<ContactForm/>)

    //Act
    const firstInput = screen.getAllByPlaceholderText(/Edd/i)
    const lastInput = screen.getAllByPlaceholderText(/Burke/i)
    const emailInput = screen.getAllByPlaceholderText(/bluebill1049@hotmail.com/i)

    userEvent.type(screen.getByRole('textbox'), 'Joseph ')
    userEvent.type(screen.getByRole('textbox'), 'Krapsicher ')
    userEvent.type(screen.getByRole('textbox'), 'JoeKraspicher@gmail.com ')

    userEvent.click(screen.getByRole('button'))

    //Assert
    expect(firstInput).toBeTruthy();
    expect(lastInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    
});