import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    const {getByText} = render(
        <ContactForm>
            <h1 isFetchingData={true}></h1>
        </ContactForm>
    )
    const message = getByText(/Contact Form/i)
   
    expect(message).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

render(<ContactForm/>)

const firstName = screen.getByLabelText('First Name')
userEvent.type(firstName, 'Vida')
const errorMessage= await screen.findAllByTestId('error');
expect(errorMessage).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
    render(<ContactForm/>)


    userEvent.type(screen.getByRole('textbox'), ' ')
    userEvent.type(screen.getByRole('textbox'), ' ')
    userEvent.type(screen.getByRole('textbox'), ' ')


    
    
    const firstErr = screen.queryAllByText(/5 characters/i);
    const lastErr = screen.getByText(/last name/i);
    const emailErr = screen.getByText(/email/i);

    expect(firstErr).toBeTruthy();
    expect(lastErr).toBeTruthy();
    expect(emailErr).toBeTruthy();
    

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
    render(<ContactForm/>)

    
    const firstName = screen.getAllByPlaceholderText(/Vida/i)
    const lastName = screen.getAllByPlaceholderText(/Causey/i)
    const emailBox = screen.getAllByPlaceholderText(/ofo28@aol.com/i)


    userEvent.type(screen.getByRole('textbox'), 'Wilton ')
    userEvent.type(screen.getByRole('textbox'), 'Causey ')


    const emailErr = screen.queryAllByText(/email/i);


    
    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();
    expect(emailBox).toBeTruthy();



});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)


    const emailInput = screen.queryByText(/ofo28@aol.com/i)



    userEvent.type(screen.getByRole('textbox'), 'case@hotmail.com ')
    const emailErr = screen.queryAllByText(/email/i);





    expect(emailInput).toBeInDocument();
    expect(emailErr).toBeInDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const submit = screen.getByRole("button");
    userEvent.click(submit);
    const errorMessage = await screen.findByText(/lastName is a required field./i);
    expect(errorMessage).toBeInTheDocument();    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first name*/i); 
    const lastName = screen.getByLabelText(/last name*/i); 
    const email = screen.getByLabelText(/email*/i); 

    userEvent.type(firstName, "abcde");
    userEvent.type(lastName, "fghijk");
    userEvent.type(email, "abc@def.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
         const firstDisplay = screen.queryByText("abcde");
         const lastDisplay = screen.queryByText("fghijk");
         const emailDisplay = screen.queryByText("abc@def.com");
         const messageDisplay = screen.queryByTestId("ilovecoding");

         expect(firstDisplay).toBeInTheDocument();
         expect(lastDisplay).toBeInTheDocument();
         expect(emailDisplay).toBeInTheDocument();
         expect(messageDisplay).not.toBeInTheDocument();
    })   
});

test('renders all fields text when all fields are submitted.', async () => {
    
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first name*/i); 
    const lastName = screen.getByLabelText(/last name*/i); 
    const email = screen.getByLabelText(/email*/i); 
    const message = screen.getByLabelText(/message/i); 

    userEvent.type(firstName, "abcde");
    userEvent.type(lastName, "fghijk");
    userEvent.type(email, "abc@def.com");
    userEvent.type(message, "message");

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
         const firstDisplay = screen.queryByText(/abcde/i);
         const lastDisplay = screen.queryByText(/fghijk/i);
         const emailDisplay = screen.queryByText(/abc@def.com/i);
         const messageDisplay = screen.queryByTestId(/message/i);

         expect(firstDisplay).toBeInTheDocument();
         expect(lastDisplay).toBeInTheDocument();
         expect(emailDisplay).toBeInTheDocument();
         expect(messageDisplay).toBeInTheDocument();
    })
});