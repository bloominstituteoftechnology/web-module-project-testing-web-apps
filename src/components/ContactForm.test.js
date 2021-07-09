import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

describe("the component renders the contact form component without errors.", () => {
  test("renders contact form without errors", async () => {
    render(<ContactForm />);
    const contactForm = screen.getByAltText(/Contact Form/i);

    expect(contactForm).toBeInTheDocument();
  });
});

test("renders the contact form header", () => {
  render(<ContactForm />);

  const header = screen.getByText(/Contact Form/i);

  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const firstNameLength = screen.getByLabelText(/firstName/i);
  userEvent.type(firstNameLength, "joe");

  expect(firstNameLength).toHaveValue("joe");
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const firstName = await screen.findByText(/ error: firstName/i);
  const lastName = await screen.findByText(/ error: lastName/i);
  const email = await screen.findByText(/ error: email/i);
  expect(firstName).toBeTruthy();
  expect(lastName).toBeTruthy();
  expect(email).toBeTruthy();
  //const email = screen.getByLabelText(/email/i);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const firstName = screen.getAllByLabelText(/first name/i);
  userEvent.type(firstName, "Joseph");

  const lastName = screen.getAllByLabelText(/last name/i);
  userEvent.type(lastName, "Escobedo");

  const email = screen.getAllByLabelText(/email/i);
  userEvent.type(email, "email here");

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const error = screen.findAllByTestId("error");
    expect(error).toHaveLength(1);
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const email = screen.getByLabelText(/email/i);
  userEvent.type(email, "joegmail.com");
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const lastName = screen.getByLabelText("/last name*/i");
  userEvent.type(lastName, "");

  const button = screen.getByRole("button");

  userEvent.click(button);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);
  const button = screen.getByRole("button");

  userEvent.type(firstName, "Joseph");
  userEvent.type(lastName, "Escobedo");
  userEvent.type(email, "joe@gmail.com");
  userEvent.type(message, "");
  userEvent.click(button);
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);
  const button = screen.getByRole("button");

  userEvent.type(firstName, "Joseph");
  userEvent.type(lastName, "Escobedo");
  userEvent.type(email, "joe@gmail.com");
  userEvent.type(message, "I am a message");
  userEvent.click(button);
});
