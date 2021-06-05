import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  //Arrange
  render(<App />);
  //Act
  const headerText = screen.getByText(/Lambda Integration Testing Challenge/i);
  //Assert
  expect(headerText);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  //Arrange
  render(<ContactForm />);
  //Act
  const firstNameText = screen.getByLabelText("First Name*");
  userEvent.type(firstNameText, "john");
  const errorField = screen.getByTestId("error");
  expect(errorField).toHaveTextContent(
    "firstName must have at least 5 characters."
  );
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const firstNameText = screen.getByLabelText("First Name*");
  userEvent.type(firstNameText, "");

  const lastNameText = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameText, "");

  const emailText = screen.getByLabelText("Email*");
  userEvent.type(emailText, "");

  const messageText = screen.getByLabelText("Message");
  userEvent.type(messageText, "");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const errorFieldFN = screen.getByText(
    "Error: firstName must have at least 5 characters."
  );
  expect(errorFieldFN);
  expect(screen.getByText("Error: lastName is a required field."));
  expect(screen.getByText("Error: email must be a valid email address."));
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const firstNameText = screen.getByLabelText("First Name*");
  userEvent.type(firstNameText, "JohnL");

  const lastNameText = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameText, "Laubscher");

  const emailText = screen.getByLabelText("Email*");
  userEvent.type(emailText, "");

  const button = screen.getByRole("button");
  userEvent.click(button);

  expect(
    screen.queryByText("Error: firstName must have at least 5 characters.")
  );
  expect(screen.queryByText("Error: lastName is a required field."));
  expect(screen.getByText("Error: email must be a valid email address."));
  // way to identify this individual error, then show that it exists (.tobeInTheDocument)  (probably)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailText = screen.getByLabelText("Email*");
  userEvent.type(emailText, "LancetheDragonTrainer.com");

  const button = screen.getByRole("button");
  userEvent.click(button);

  expect(screen.getByText("Error: email must be a valid email address."));
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const lastNameText = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameText, "");

  const button = screen.getByRole("button");
  userEvent.click(button);

  expect(screen.getByText("Error: lastName is a required field."));
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstNameText = screen.getByLabelText("First Name*");
  userEvent.type(firstNameText, "Lance");

  const lastNameText = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameText, "DragonTrainer");

  const emailText = screen.getByLabelText("Email*");
  userEvent.type(emailText, "LanceDragon@trainer.com");

  expect(screen.queryByTestId("displayContainer"));

  const button = screen.getByRole("button");
  userEvent.click(button);

  expect(screen.getByTestId("firstnameDisplay"));
  expect(screen.getByTestId("lastnameDisplay"));
  expect(screen.getByTestId("emailDisplay"));
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);

  const firstNameText = screen.getByLabelText("First Name*");
  userEvent.type(firstNameText, "Lance");

  const lastNameText = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameText, "DragonTrainer");

  const emailText = screen.getByLabelText("Email*");
  userEvent.type(emailText, "LanceDragon@trainer.com");

  const messageText = screen.getByLabelText("Message");
  userEvent.type(messageText, "Leader of the Elite Four");

  const button = screen.getByRole("button");
  userEvent.click(button);

  expect(screen.getByTestId("firstnameDisplay"));
  expect(screen.getByTestId("lastnameDisplay"));
  expect(screen.getByTestId("emailDisplay"));
  expect(screen.getByTestId("messageDisplay"));
});