import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  const { getByText } = render(<ContactForm />);
  const header = getByText(/contact form/i);
  expect(header).toHaveTextContent("Contact Form");
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  //Arrange
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  //  //Act
  userEvent.type(firstNameInput, "sash");
  //  //Assert
  const errorMessage = screen.getByText(/ must have at least 5 characters/i);

  expect(errorMessage).toBeVisible();
  expect(errorMessage).toBeDefined();
  expect(errorMessage).not.toBeDisabled();

  userEvent.type(firstNameInput, "");
}); // passes

test("renders THREE error messages if user enters no values into any fields.", async () => {
  //Arrange
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });
  //Act

  userEvent.type(firstNameInput, "");
  userEvent.type(lastNameInput, "");
  userEvent.type(email, "");
  userEvent.type(message, "");
  userEvent.click(submitButton);

  //Assert
  const errorMessages = screen.getAllByText(/error/i);
  expect((errorMessages.length = 3));
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  //Arrange
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);
  const button = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "Aleksandar");
  userEvent.type(lastNameInput, "Jovanovic");
  userEvent.type(email, "");
  userEvent.type(message, "test");
  userEvent.click(button);
  //Assert
  const errorMessage = screen.getByText(/valid email/i);
  expect(errorMessage).toBeInTheDocument();
}); // passes

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  //Arrange
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);
  const button = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "Aleksandar");
  userEvent.type(lastNameInput, "Jovanovic");
  userEvent.type(email, "invalidEmail");
  userEvent.type(message, "test");
  userEvent.click(button);
  //Assert
  const errorMessage = screen.getByText(/valid email/i);
  expect(errorMessage).toBeInTheDocument();
}); // passes

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  //Arrange
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);
  const button = screen.getByRole("button", { value: /submit/i });
  //Act
  userEvent.type(firstNameInput, "Aleksandar");
  userEvent.type(lastNameInput, "");
  userEvent.type(email, "sasha@gmail.com");
  userEvent.type(message, "test");
  userEvent.click(button);
  //Assert
  const errorMessage = screen.getByText(/is a required field./i);
  expect(errorMessage).toBeInTheDocument();
}); // passes

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
