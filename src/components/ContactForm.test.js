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
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByPlaceholderText("Edd");
  userEvent.type(firstName, "Adam");
  const error = await screen.findByTestId("error");
  expect(error).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errors = await screen.findAllByTestId("error");
  expect(errors).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const button = screen.getByRole("button");

  const firstName = screen.getByPlaceholderText("Edd");
  userEvent.type(firstName, "Adamm");
  const lastName = screen.getByPlaceholderText("Burke");
  userEvent.type(lastName, "Daddi");
  userEvent.click(button);
  const error = await screen.findByTestId("error");
  expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const email = screen.getByLabelText("Email*");
  userEvent.type(email, "adamdadi23gmail.com");
  const error = await screen.findByTestId("error");
  expect(error).toHaveTextContent("email must be a valid email address");
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const firstName = screen.getByPlaceholderText("Edd");
  userEvent.type(firstName, "Adamm");
  const email = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  userEvent.type(email, "adamdadi23@gmail.com");
  const button = screen.getByRole("button");
  userEvent.click(button);
  const error = await screen.findByTestId("error");
  expect(error).toHaveTextContent("lastName is a required field");
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByPlaceholderText("Edd");
  userEvent.type(firstName, "Adamm");
  const lastName = screen.getByPlaceholderText("Burke");
  userEvent.type(lastName, "Daddi");
  const email = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  userEvent.type(email, "adamdadi23@gmail.com");
  const button = screen.getByRole("button");
  userEvent.click(button);
  const message = await screen.queryByTestId("messageDisplay");
  expect(message).not.toBeInTheDocument();
  const firstNameSubmission = await screen.findByTestId("firstnameDisplay");
  const lastNameSubmission = await screen.findByTestId("lastnameDisplay");
  const emailSubmission = await screen.findByTestId("emailDisplay");

  expect(firstNameSubmission).toBeInTheDocument();
  expect(lastNameSubmission).toBeInTheDocument();
  expect(emailSubmission).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByPlaceholderText("Edd");
  userEvent.type(firstName, "Adamm");
  const lastName = screen.getByPlaceholderText("Burke");
  userEvent.type(lastName, "Daddi");
  const email = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  userEvent.type(email, "adamdadi23@gmail.com");
  const message = screen.getByLabelText("Message");
  userEvent.type(message, "Hey!");
  const button = screen.getByRole("button");
  userEvent.click(button);
  const messageSubmission = await screen.findByTestId("messageDisplay");
  const firstNameSubmission = await screen.findByTestId("firstnameDisplay");
  const lastNameSubmission = await screen.findByTestId("lastnameDisplay");
  const emailSubmission = await screen.findByTestId("emailDisplay");

  expect(messageSubmission).toBeInTheDocument();
  expect(firstNameSubmission).toBeInTheDocument();
  expect(lastNameSubmission).toBeInTheDocument();
  expect(emailSubmission).toBeInTheDocument();
});
