import React from "react";
import { getByText, render, screen, waitFor } from "@testing-library/react";
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
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "Bob");

  const buttonInput = screen.getByRole("button", { value: /submit/i });
  userEvent.click(buttonInput);

  const errorMessage = screen.getByText(
    /firstName must have at least 5 characters./i
  );
  expect(errorMessage).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "");

  const lastNameInput = screen.getByLabelText(/last Name/i);
  userEvent.type(lastNameInput, "");

  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "");

  const buttonInput = screen.getByRole("button", { value: /submit/i });
  userEvent.click(buttonInput);

  screen.debug();
  const errorMessage1 = screen.getByText(
    /firstName must have at least 5 characters./i
  );

  const errorMessage2 = screen.getByText(/lastName is a required field./i);

  const errorMessage3 = screen.getByText(
    /email must be a valid email address./i
  );

  expect(errorMessage1).toBeInTheDocument();
  expect(errorMessage2).toBeInTheDocument();
  expect(errorMessage3).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "Ralph");

  const lastNameInput = screen.getByLabelText(/last Name/i);
  userEvent.type(lastNameInput, "Ralph");

  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "");

  const buttonInput = screen.getByRole("button", { value: /submit/i });
  userEvent.click(buttonInput);

  const errorMessage = screen.getByText(
    /email must be a valid email address./i
  );
  expect(errorMessage).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "ralph.com");

  const errorMessage = screen.getByText(
    /email must be a valid email address./i
  );
  expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const lastNameInput = screen.getByLabelText(/last Name/i);
  userEvent.type(lastNameInput, "");

  const buttonInput = screen.getByRole("button", { value: /submit/i });
  userEvent.click(buttonInput);

  const errorMessage = screen.getByText(/lastName is a required field./i);
  expect(errorMessage).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "Ralph");

  const lastNameInput = screen.getByLabelText(/last Name/i);
  userEvent.type(lastNameInput, "Ralph");

  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "ralph@ralph.com");

  const messageInput = screen.getByLabelText(/message/i);

  const buttonInput = screen.getByRole("button", { value: /submit/i });
  userEvent.click(buttonInput);

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).not.toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "Ralph");

  const lastNameInput = screen.getByLabelText(/last Name/i);
  userEvent.type(lastNameInput, "Ralph");

  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "ralph@ralph.com");

  const messageInput = screen.getByLabelText(/message/i);
  userEvent.type(messageInput, "We major.");

  const buttonInput = screen.getByRole("button", { value: /submit/i });
  userEvent.click(buttonInput);

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();
});
