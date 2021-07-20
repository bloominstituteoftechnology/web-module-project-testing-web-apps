import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

//3 main type of tests
//1.end-to-end tests(cypress)
//  run your project in an actual brower. Run as many user scenarios as possible.
//  take a long time to run, and take a lot of computing power
//2. integration tests(React Testing Library, Enzyme)
    //test how different pieces of your code work integrate together.
//3. unit tests(jest)
    //test a single unit of code to make sure it always runs correctly under many different scenarios.

    //throw an error message in a test.
    //throw new Error("this test broke because of ...")

    //jest  - test runner
    //      - used for assertions(global functions)
    //      - uses global functions to structure our tests  
            // test, describe, it
            // describe("testing",()=> {
            //     it("should pass all the tests", () =>{
            //         console.log("it passed!")
            //     })
            // })

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    //Arrange - rander the component
    render(<ContactForm />)

    //act - query the DOM for the header element
    const header = screen.getByText(/Contact Form/i)//reges reg-ex regular expressions

    //assert - is the header found on the DOM?
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstNameInput,"lady")
    await waitFor(()=> {
        expect(screen.queryByText(/firstName must have at least 5 characters./i)).toBeInTheDocument()
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const button= screen.getAllByTestId('submit')
    userEvent.click(button)
    await waitFor(() => {
        expect(screen.queryByText(/firstName must have at least 5 characters./i)).toBeInTheDocument()
        expect(screen.queryByText(/Error: lastName is a required field./i)).toBeInTheDocument()
        expect(screen.queryByText(/Error: email must be a valid email address../i)).toBeInTheDocument()
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name*/i)
    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    userEvent.type(firstNameInput,"lydia")
    userEvent.type(lastNameInput,"gaga")
    //query for the button
    const button= screen.getAllByTestId('submit')
    //click button
    userEvent.click(button)
    await waitFor(() => {
        expect(screen.queryByText(/Error: email must be a valid email address../i)).toBeInTheDocument()
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = screen.getByLabelText(/Email*/i)
    userEvent.type(emailInput,"ladygaga")
    await waitFor(() => {
        expect(screen.queryByText(/Error: email must be a valid email address../i)).toBeInTheDocument()
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name*/i)
    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    const emailInput = screen.getByLabelText(/Email*/i)
    userEvent.type(firstNameInput,"lydia")
    userEvent.type(emailInput,"ladygaga@gmail.com")
    //query for the button
    const button= screen.getAllByTestId('submit')
    //click button
    userEvent.click(button)
    await waitFor(() => {
        expect(screen.queryByText(/Error: lastName is a required field./i)).toBeInTheDocument()
    })

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //render
    render(<ContactForm />)
    //query for all inputs
    const firstNameInput = screen.getByLabelText(/First Name*/i)
    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    const emailInput = screen.getByLabelText(/Email*/i)
    const messageInput = screen.getByLabelText(/Message/i)

    userEvent.type(firstNameInput,"lydia")
    userEvent.type(lastNameInput,"gaga")
    userEvent.type(emailInput,"ladygaga@gmail.com")
    userEvent.type(messageInput,"Hi")

    const noFirstNameText= screen.queryByText(/lydia/i)
    expect(noFirstNameText).toBeNull()
    const noLastNameInput= screen.queryByText(/gaga/i)
    expect(noLastNameInput).toBeNull()
    const noEmailText= screen.queryByText(/ladygaga@gmail.com/i)
    expect(noEmailText).toBeNull()
    const noMessageText= screen.queryByText(/Hi/i)
    expect(noMessageText).toBeNull()
});

test('renders all fields text when all fields are submitted.', async () => {
    //render
    render(<ContactForm />)
    //query for all inputs
    const firstNameInput = screen.getByLabelText(/First Name*/i)
    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    const emailInput = screen.getByLabelText(/Email*/i)
    const messageInput = screen.getByLabelText(/Message/i)

    //type into inputs
    userEvent.type(firstNameInput,"lydia")
    userEvent.type(lastNameInput,"gaga")
    userEvent.type(emailInput,"ladygaga@gmail.com")
    userEvent.type(messageInput,"Hi")

    expect(firstNameInput).toHaveValue("lydia")
    expect(lastNameInput).toHaveValue("gaga")
    expect(emailInput).toHaveValue("ladygaga@gmail.com")
    expect(messageInput).toHaveValue("Hi")
    
    //query for the button
    const button= screen.getAllByTestId('submit')
    //click button
    userEvent.click(button)
    //query for the text "tiger"
    const firstNameText = screen.queryByText(/lydia/i)
    const lastNameText = screen.queryByText(/gaga/i)
    const emailText = screen.queryByText(/ladygaga@gmail.com/i)
    const messageText = screen.queryByText(/Hi/i)
    //assert
    expect(firstNameText).toBeInTheDocument()
    expect(lastNameText).toBeInTheDocument()
    expect(emailText).toBeInTheDocument()
    expect(messageText).toBeInTheDocument()
});