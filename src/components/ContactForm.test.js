import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.getByText(/contact form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  // render
  render(<ContactForm />);

  // query for all inputs
  const firstNameInput = screen.getByLabelText(/first name*/i);
  expect(firstNameInput).toBeInTheDocument();

  // type into inputs
  userEvent.type(firstNameInput, "Rafe");

  // query for button
  const button = screen.getByRole("button", { name: /submit/i });

  // click button
  userEvent.click(button);

  // query for error message
  const oneError = await screen.getByText(/must have at least 5 characters/i);

  // assert
  expect(oneError).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  // query for all inputs
  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  const emailInput = screen.getByLabelText(/email*/i);
  const messageInput = screen.getByLabelText(/message/i);
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();

  // type into inputs
  userEvent.type(firstNameInput, "");
  userEvent.type(lastNameInput, "");
  userEvent.type(emailInput, "");
  userEvent.type(messageInput, "");

  // query for button
  const button = screen.getByRole("button", { name: /submit/i });

  // click button
  userEvent.click(button);

  // query for error message
  const firstNameError = await screen.getByText(
    /must have at least 5 characters/i
  );
  const emailError = await screen.getByText(/must be a valid email address/i);
  const messageError = await screen.getByText(/is a required field/i);

  // assert
  expect(firstNameError).toBeInTheDocument();
  expect(emailError).toBeInTheDocument();
  expect(messageError).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  // query for all inputs
  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  const emailInput = screen.getByLabelText(/email*/i);
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();

  // type into inputs
  userEvent.type(firstNameInput, "Rafe");
  userEvent.type(lastNameInput, "Roberts");
  userEvent.type(emailInput, "");

  // query for button
  const button = screen.getByRole("button", { name: /submit/i });

  // click button
  userEvent.click(button);

  // query for error message
  const emailError = await screen.getByText(/must be a valid email address/i);

  // assert
  expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  // query for inputs
  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();

  // type into inputs
  userEvent.type(emailInput, "invalidEmail");

  // query for button
  const button = screen.getByRole("button", { name: /submit/i });

  // click button
  userEvent.click(button);

  // query for error message
  const invalidEmail = await screen.getByText(/must be a valid email address/i);

  // assert
  expect(invalidEmail).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  // query for inputs
  const lastName = screen.getByLabelText(/last name*/i);
  expect(lastName).toBeInTheDocument();

  // type in inputs
  userEvent.type(lastName, "");

  // query for button
  const button = screen.getByRole("button", { name: /submit/i });
  // click button
  userEvent.click(button);

  // query for text
  const errorMsg = screen.getByText(/lastName is a required field/i);

  // assert
  expect(errorMsg).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  // query for inputs
  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  const emailInput = screen.getByLabelText(/email*/i);
  const messageInput = screen.getByLabelText(/message/i);

  // add text
  userEvent.type(firstNameInput, "Rafee");
  userEvent.type(lastNameInput, "Roberts");
  userEvent.type(emailInput, "Rafe@email.com");
  userEvent.type(messageInput, "");

  // query for button
  const button = screen.getByRole("button", { name: /submit/i });

  // click button
  userEvent.click(button);

  // query for text
  const firstText = await screen.getByText(/rafee/i);
  const lastText = await screen.getByText(/roberts/i);
  const emailText = await screen.getByText(/rafe@email.com/i);
  // const messageText = await screen.getByText()

  // assert
  expect(firstText).toBeInTheDocument();
  expect(lastText).toBeInTheDocument();
  expect(emailText).toBeInTheDocument();
  // expect(messageInput).not.toBeInTheDocument()
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  // query for inputs
  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  const emailInput = screen.getByLabelText(/email*/i);
  const messageInput = screen.getByLabelText(/message/i);

  // add text
  userEvent.type(firstNameInput, "Rafee");
  userEvent.type(lastNameInput, "Roberts");
  userEvent.type(emailInput, "Rafe@email.com");
  userEvent.type(messageInput, "This is my message test");

  // query for button
  const button = screen.getByRole("button", { name: /submit/i });

  // click button
  userEvent.click(button);

  // query for text
  const firstText = await screen.getByText(/rafee/i);
  const lastText = await screen.getByText(/roberts/i);
  const emailText = await screen.getByText(/rafe@email.com/i);
  const messageText = await screen.getByDisplayValue(
    /this is my message test/i
  );

  // assert
  expect(firstText).toBeInTheDocument();
  expect(lastText).toBeInTheDocument();
  expect(emailText).toBeInTheDocument();
  expect(messageText).toBeInTheDocument();
});
