import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText(/contact form/i);
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText("First Name*");
  userEvent.type(firstNameInput, "alex");

  const errors = await screen.findAllByText(/error/i);

  expect(errors.length).toEqual(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const button = screen.getByRole("button");

  userEvent.click(button);

  const errors = await screen.findAllByText(/error/i);

  expect(errors.length).toEqual(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText("First Name*");
  const lastNameInput = screen.getByLabelText("Last Name*");
  const button = screen.getByRole("button");

  userEvent.type(firstNameInput, "alexander");
  userEvent.type(lastNameInput, "edwards");
  userEvent.click(button);

  const errors = await screen.findAllByText(/error/i);
  expect(errors.length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.queryByLabelText("Email*");

  userEvent.type(emailInput, "a.com");

  const errors = await screen.queryByText(
    /email must be a valid email address/i
  );
  expect(errors).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const err = screen.queryByText(/lastName is a required field/i);
  await waitFor(() => {
    expect(err).toBeInTheDocument();
  });
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText("First Name*");
  userEvent.type(firstNameInput, "alexander");

  const lastNameInput = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameInput, "edwards");

  const emailInput = screen.getByLabelText("Email*");
  userEvent.type(emailInput, "a@email.com");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const firstNameDisplay = screen.getByTestId("firstnameDisplay");
  const lastNameDisplay = screen.getByTestId("lastnameDisplay");
  const emailDisplay = screen.getByTestId("emailDisplay");
  const messageDisplay = screen.queryByTestId("messageDisplay");

  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).toBeNull();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText("First Name*");
  console.log(firstNameInput);
  userEvent.type(firstNameInput, "alexander");

  const lastNameInput = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameInput, "edwards");

  const emailInput = screen.getByLabelText("Email*");
  userEvent.type(emailInput, "a@email.com");

  const messageInput = screen.getByLabelText("Message");
  userEvent.type(messageInput, "Hey i hate todays project");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const firstNameDisplay = screen.getByTestId("firstnameDisplay");
  const lastNameDisplay = screen.getByTestId("lastnameDisplay");
  const emailDisplay = screen.getByTestId("emailDisplay");
  const messageDisplay = screen.getByTestId("messageDisplay");

  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).toBeInTheDocument();
});
