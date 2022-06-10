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
    const formHeader = screen.getByText(/Contact Form/i);
    
    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toBeTruthy();
    expect(formHeader).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText('First Name*');
    
    userEvent.type(firstName, 'hi');

    expect(screen.getByText(/Error: firstName must have at least 5 characters./i))
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButt = screen.getByRole('button');

    userEvent.click(submitButt);

    expect(screen.queryAllByText(/Error/i).length).toEqual(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText('First Name*');
    const lastName = screen.getByLabelText('Last Name*');
    const submitButt = screen.getByRole('button');

    userEvent.type(firstName, "Esmodea");
    userEvent.type(lastName, "Burk");
    userEvent.click(submitButt);

    expect(screen.queryAllByText(/Error/i).length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText('Email*');

    userEvent.type(email, 'hi');

    expect(screen.getByText(/email must be a valid email address./i));
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText('First Name*');
    const email = screen.getByLabelText('Email*');
    const submitButt = screen.getByRole('button');

    userEvent.type(firstName, "Esmodea");
    userEvent.type(email, "esmodearburk@gmail.com");
    userEvent.click(submitButt);

    expect(screen.getByText(/lastName is a required field/i));
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText('First Name*');
    const lastName = screen.getByLabelText('Last Name*');
    const email = screen.getByLabelText('Email*');
    const submitButt = screen.getByRole('button');

    userEvent.type(firstName, "Esmodea");
    userEvent.type(lastName, "Burk");
    userEvent.type(email, "esmodearburk@gmail.com");
    userEvent.click(submitButt);

    expect(screen.getByText("Esmodea")).toBeVisible();
    expect(screen.getByText("Burk")).toBeVisible();
    expect(screen.getByText("esmodearburk@gmail.com")).toBeVisible();
    expect(screen.queryByTestId("messageDisplay")).toBeFalsy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText('First Name*');
    const lastName = screen.getByLabelText('Last Name*');
    const email = screen.getByLabelText('Email*');
    const message = screen.getByLabelText('Message');
    const submitButt = screen.getByRole('button');

    userEvent.type(firstName, "Esmodea");
    userEvent.type(lastName, "Burk");
    userEvent.type(email, "esmodearburk@gmail.com");
    userEvent.type(message, "Hello my fellow programming aficionados.")
    userEvent.click(submitButt);

    expect(screen.getByTestId("firstnameDisplay").innerHTML).toEqual("<strong>First Name: </strong>Esmodea");
    expect(screen.getByTestId("lastnameDisplay").innerHTML).toEqual("<strong>Last Name: </strong>Burk");
    expect(screen.getByTestId("emailDisplay").innerHTML).toEqual("<strong>Email: </strong>esmodearburk@gmail.com");
    expect(screen.getByTestId("messageDisplay").innerHTML).toEqual("<strong>Message: </strong>Hello my fellow programming aficionados.");
});
