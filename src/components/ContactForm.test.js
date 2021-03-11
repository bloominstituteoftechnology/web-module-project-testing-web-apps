import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";
import DisplayComponent from "./DisplayComponent";

test("renders without errors", () => {
  render(<ContactForm />);
});

///the header h1 element exists. Include three asserts, if the header is in the document, if the heads is truthy, if the header has the correct test content.
test("renders the contact form header", () => {
  //arrange
  render(<ContactForm />);
  //act - access the header
  const header = screen.queryByText(/contact form/i);
  //assert - header should be on the screen
  expect(header).toBeInTheDocument();
  // expect(
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  //arrange
  render(<ContactForm />);
  //act - access the firstName input field
  const firstNameInput = screen.queryByLabelText(/firstname/i);
  userEvent.type(firstName, "Ralp");
  const error = await screen.queryByText(
    /firstName must have at least 5 characters./
  );
  console.log(error);
  //assert - One error message should be on the screen
  expect(error).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  //arrange
  render(<ContactForm />);
  //act:
  // find and click the button
  const button = screen.getByRole("button");
  userEvent.click(button);
  // access error message1
  const error1 = await screen.queryByText(
    /firstName must have at least 5 characters./
  );
  // access error message2
  const error2 = await screen.queryByText(/lastName is a required field./);
  // access error message3
  const error3 = await screen.queryByText(
    /email must be a valid email address./
  );

  //assert - Three error messages appear on screen
  expect(error1).toBeInTheDocument();
  expect(error2).toBeInTheDocument();
  expect(error3).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  // arrange
  render(<ContactForm />);
  // act:
  // find firstName input and enter value
  const firstNameInput = screen.queryByLabelText(/firstname/i);
  userEvent.type(firstName, "Ralph");
  // find lastName input and enter value
  const lastNameInput = screen.queryByLabelText(/lastname/i);
  userEvent.type(lastName, "Ralpherson");
  // find and click the button
  const button = screen.getByRole("button");
  userEvent.click(button);
  // access error message
  const error = await screen.queryByText(
    /email must be a valid email address./
  );
  // assert - One error message should be on the screen
  expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  // arrange
  render(<ContactForm />);
  // act:
  // find email input and enter value
  const emailInput = screen.queryByLabelText(/email/i);
  userEvent.type(email, "ralphralpherson.com");
  // access error message
  const error = await screen.queryByText(
    /email must be a valid email address./
  );
  // assert - Email error message should be on screen
  expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  // arrange
  render(<ContactForm />);
  // act:
  // find firstName input and enter value
  const firstNameInput = screen.queryByLabelText(/firstname/i);
  userEvent.type(firstName, "Ralph");
  // find email input and enter value
  const emailInput = screen.queryByLabelText(/email/i);
  userEvent.type(email, "ralph@ralpherson.com");
  // find and click the button
  const button = screen.getByRole("button");
  userEvent.click(button);
  // access error message
  const error = await screen.queryByText(/lastName is a required field./);
  // assert - One error message should be on the screen
  expect(error).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  // arrange
  render(<ContactForm />);

  // act:
  // find firstName input and enter value
  const firstNameInput = screen.queryByLabelText(/firstname/i);
  userEvent.type(firstNameInput, "Ralph");
  // find lastName input and enter value
  const lastNameInput = screen.queryByLabelText(/lastname/i);
  userEvent.type(lastNameInput, "Ralpherson");
  // find email input and enter value
  const emailInput = screen.queryByLabelText(/email/i);
  userEvent.type(emailInput, "ralph@ralpherson.com");
  // find and click the button
  const button = screen.getByRole("button");
  userEvent.click(button);
  // access new contact card
  const firstName = await screen.queryByText(/ralph/i);
  const lastName = await screen.queryByText(/ralpherson/i);
  const email = await screen.queryByText(/ralph@ralpherson.com/i);
  // const message = await screen.queryByLabelText(/message/i);

  // assert:
  // new contact info should be on screen
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  // message does not appear on screen
  // expect(message).toNotBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  // arrange
  render(<ContactForm />);

  // act:
  // find firstName input and enter value
  const firstNameInput = screen.queryByLabelText(/firstname/i);
  userEvent.type(firstName, "Ralph");
  // find lastName input and enter value
  const lastNameInput = screen.queryByLabelText(/lastname/i);
  userEvent.type(lastName, "Ralpherson");
  // find email input and enter value
  const emailInput = screen.queryByLabelText(/email/i);
  userEvent.type(email, "ralph@ralpherson.com");
  // find and click the button
  const button = screen.getByRole("button");
  userEvent.click(button);
  // access new contact card
  const firstName = await screen.queryByText(/ralph/i);
  const lastName = await screen.queryByText(/ralpherson/i);
  const email = await screen.queryByText(/ralph@ralpherson.com/i);
  const message = await screen.queryByLabelText(/I'm the greatest!/i);

  // assert:
  // new contact info should be on screen
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});
