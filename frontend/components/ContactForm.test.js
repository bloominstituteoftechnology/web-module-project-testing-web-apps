import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const headerelement = screen.queryByText(/Contact Form/i);

    expect(headerelement).toBeInTheDocument();
    expect(headerelement).toBeTruthy();
    expect(headerelement).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstnamefield = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstnamefield, "123")

    const errorMessages = await screen.findAllByTestId("error")
    expect(errorMessages).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitbutton = screen.getByRole("button")
    userEvent.click(submitbutton)
    await waitFor(() => {
        const errormessages = screen.queryAllByTestId("error")
        expect(errormessages).toHaveLength(3)
    }
    )
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstname = screen.getByLabelText(/First Name*/i)
    const lastname = screen.getByLabelText(/Last Name*/i)

    userEvent.type(firstname, "emrie")
    userEvent.type(lastname, "lalaland")
    const submitbutton = screen.getByRole("button")
    userEvent.click(submitbutton)

    await waitFor(() => {
        const errormessage = screen.queryAllByTestId("error")
        expect(errormessage).toHaveLength(1)
    })

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm />);
    const email = screen.getByLabelText(/Email*/i)
    userEvent.type(email, "abcdefg");

    const errorMessages = await screen.findByText(/email must be a valid email address/i)
    expect(errorMessages).toBeInTheDocument()

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submitbutton = screen.getByRole("button")
    userEvent.click(submitbutton)
    const error = await screen.findByText(/lastName is a required field/i)
    expect(error).toBeInTheDocument()



});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstname = screen.getByLabelText(/First Name*/i)
    const lastname = screen.getByLabelText(/Last Name*/i)
    const email = screen.getByLabelText(/Email*/i)

    userEvent.type(firstname, "emrie")
    userEvent.type(lastname, "lalaland")
    userEvent.type(email, "abcdefg@gmail.com");

    const submitbutton = screen.getByRole("button")
    userEvent.click(submitbutton)

    await waitFor(()=>{
        const firstdisplay = screen.queryByText("emrie")
        const lastdisplay = screen.queryByText("lalaland")
        const emaildisplay = screen.queryByText("abcdefg@gmail.com")
        const messagedisplay = screen.queryByTestId("messageDisplay")


        expect(firstdisplay).toBeInTheDocument()
        expect(lastdisplay).toBeInTheDocument()
        expect(emaildisplay).toBeInTheDocument()
        expect(messagedisplay).not.toBeInTheDocument()
    })

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstname = screen.getByLabelText(/First Name*/i)
    const lastname = screen.getByLabelText(/Last Name*/i)
    const email = screen.getByLabelText(/Email*/i)
    const message = screen.getByLabelText(/message/i)

    userEvent.type(firstname, "emrie")
    userEvent.type(lastname, "lalaland")
    userEvent.type(email, "abcdefg@gmail.com");
    userEvent.type(message, "text message")

    const submitbutton = screen.getByRole("button")
    userEvent.click(submitbutton)

    await waitFor(()=>{
        const firstdisplay = screen.queryByText("emrie")
        const lastdisplay = screen.queryByText("lalaland")
        const emaildisplay = screen.queryByText("abcdefg@gmail.com")
        const messagedisplay = screen.queryByText("text message")


        expect(firstdisplay).toBeInTheDocument()
        expect(lastdisplay).toBeInTheDocument()
        expect(emaildisplay).toBeInTheDocument()
        expect(messagedisplay).toBeInTheDocument()
    })



});
