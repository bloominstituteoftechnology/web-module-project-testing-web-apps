import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
    render(<ContactForm />);

    const contactHeader= screen.getByText(/Contact Form/i);
    console.log(contactHeader);
    expect(contactHeader).toBeInTheDocument();

});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
    // Arrange
    render(<ContactForm/>);
    // Assert
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput,"Aar");
    console.log(firstNameInput)
    const errorMsg = await screen.findAllByTestId("error");
    

    expect(errorMsg).toHaveLength(1);


});

test("renders THREE error messages if user enters no values into any fields.", async () => {
       // Arrange
       render(<ContactForm/>);
       // Assert
       const firstNameInput = screen.getByLabelText(/First Name*/i);
       userEvent.type(firstNameInput,"");

       const lastNameInput = screen.getByLabelText(/Last Name*/i);
       userEvent.type(lastNameInput,"");

       const emailInput = screen.getByLabelText(/Email*/i);
       userEvent.type(emailInput,"");



       
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
