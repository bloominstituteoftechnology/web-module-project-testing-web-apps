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

  const contactHeader = screen.getByText(/Contact Form/i);
  console.log(contactHeader);
  expect(contactHeader).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  // Arrange
  render(<ContactForm />);
  // Act
  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Aar");
  console.log(firstNameInput);
  const errorMsg = await screen.findAllByTestId("error");

  expect(errorMsg).toHaveLength(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  // Arrange
  render(<ContactForm />);
  // Assert
  const submitBtn = screen.getByRole("button");
  userEvent.click(submitBtn);

  await waitFor(() => {
    const errorMsg = screen.queryAllByTestId("error");

    expect(errorMsg).toHaveLength(3);
  });
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Aaron");

  const lastNameInput = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastNameInput, "Belmore");

  const submitBtn = screen.getByRole("button");
  userEvent.click(submitBtn);

  await waitFor(() => {
    const errorMsg = screen.queryAllByTestId("error");

    expect(errorMsg).toHaveLength(1);
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Aaron");

  const lastNameInput = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastNameInput, "Belmore");

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, "belmoresoj");

  const btn = screen.getByRole("button");
  userEvent.click(btn);

  const errorMsg = await screen.findByText(
    /email must be a valid email address/i
  );

  expect(errorMsg).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Aaron");

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, "belmoreaaron9@gmail.com");

  const btn = screen.getByRole("button");
  userEvent.click(btn);

  const errorMsg = await screen.findByText(/lastName is a required field/i);

  expect(errorMsg).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Aaron");

  const lastNameInput = screen.getByLabelText(/last Name*/i);
  userEvent.type(lastNameInput, "Belmore");

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, "belmoreaaron9@gmail.com");

  const btn = screen.getByRole("button");
  userEvent.click(btn);

  await waitFor(() => {
    const firstNameReveal = screen.queryByText("Aaron");
    const lastNameReveal = screen.queryByText("Belmore");
    const emailNameReveal = screen.queryByText("belmoreaaron9@gmail.com");
    const messageDisplay = screen.queryByTestId("MessageDisplay");
    expect(messageDisplay).not.toBeInTheDocument();
  });
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Aaron");

  const lastNameInput = screen.getByLabelText(/last Name*/i);
  userEvent.type(lastNameInput, "Belmore");

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, "belmoreaaron9@gmail.com");

  const message = screen.getByLabelText(/message/i);
  userEvent.type(message, "I'm ready to learn.");

  const btn = screen.getByRole("button");
  userEvent.click(btn);

  await waitFor(() => {
    const firstNameReveal = screen.queryByText("Aaron");
    const lastNameReveal = screen.queryByText("Belmore");
    const emailNameReveal = screen.queryByText("belmoreaaron9@gmail.com");
    const messageDisplay = screen.queryByText("I'm ready to learn.");
    expect(messageDisplay).toBeInTheDocument();
    expect(firstNameReveal).toBeInTheDocument();
    expect(emailNameReveal).toBeInTheDocument();
    expect(lastNameReveal).toBeInTheDocument();
  });
});
