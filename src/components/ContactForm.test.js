import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';



test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
        const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, 'Edd')

        await waitFor(()=> {
        const error = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(error).toBeInTheDocument();
        })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
render(<ContactForm/>)
const submit = screen.getByRole('button')
userEvent.click(submit)

await waitFor(()=>{
    const firtsnameempty = screen.queryByText(/firstName must have at least 5 characters./i);
    const Lastnameempty = screen.queryByText(/lastName is a required field./i);
    const Emailempty = screen.queryByText(/email must be a valid email address./i);
    expect(firtsnameempty).toBeInTheDocument();
    expect(Lastnameempty).toBeInTheDocument();
    expect(Emailempty).toBeInTheDocument();
})
});
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, 'therman')
    const lastname = screen.getByLabelText(/last name/i)
    userEvent.type(lastname, 'mcmillan')
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, '')
    const submit = screen.getByRole('button')
    userEvent.click(submit)
    await waitFor(()=>{
    const error =  screen.queryByText(/Error: email must be a valid email address./i);
    expect(error).toBeInTheDocument();
})
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const email = screen.getByLabelText(/email/i)
     userEvent.type(email, 'empty')

    await waitFor(()=>{
        const empty =screen.queryByText(/Error: email must be a valid email address./i);
        expect(empty).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const submit = screen.getByRole('button')
    userEvent.click(submit)

    await waitFor(()=>{
    const error = screen.queryByText(/Error: lastName is a required field./i)
    expect(error).toBeInTheDocument()
})
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, 'therman')
    const lastname = screen.getByLabelText(/last name/i)
    userEvent.type(lastname, 'mcmillan')
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'mcmillanj0106@yahoo.com')
    const submit = screen.getByRole('button')
    userEvent.click(submit)
    await waitFor(()=>{
        const showfirstname = screen.queryByText('therman')
        const showlastname = screen.queryByText('mcmillan')
        const showemail = screen.queryByText('mcmillanj0106@yahoo.com')
        const showmessage = screen.queryByText('what up coders')

        expect(showfirstname).toBeInTheDocument();
        expect(showlastname).toBeInTheDocument();
        expect(showemail).toBeInTheDocument();
        expect(showmessage).not.toBeInTheDocument();
    })

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstname = screen.getByLabelText(/first name/i)
    userEvent.type(firstname, 'therman')

    const lastname = screen.getByLabelText(/last name/i)
    userEvent.type(lastname, 'mcmillan')

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'mcmillanj0106@yahoo.com')

    const message = screen.getByLabelText(/message/i)
    userEvent.type(message, 'what up coders')

    const submit=screen.getByRole('button')
    userEvent.click(submit);

    
        await waitFor(()=>{
            const firtsnameempty = screen.queryByText(/firstName must have at least 5 characters./i);
            const Lastnameempty = screen.queryByText(/lastName is a required field./i);
            const Emailempty = screen.queryByText(/email must be a valid email address./i);
            expect(firtsnameempty).not.toBeInTheDocument();
            expect(Lastnameempty).not.toBeInTheDocument();
            expect(Emailempty).not.toBeInTheDocument(); 
        })   
       
        
     const renderfirtsname = screen.queryByTestId(/firstname/i)
    const renderlastname = screen.queryByTestId(/lastname/i)
    const renderemail = screen.getByTestId(/email/i)
    const renderMessage = screen.queryByTestId(/message/i)
    
    expect(renderfirtsname).toBeInTheDocument();
    expect(renderlastname).toBeInTheDocument();
    expect(renderemail).toBeInTheDocument();
    expect(renderMessage).toBeInTheDocument();
        
    
});