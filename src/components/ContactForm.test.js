import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test ("renders without errors", async () => {
    render(<ContactForm/>);

    const nameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    userEvent.type(nameInput, "Declan");
    userEvent.type(lastNameInput, "Casey");
    userEvent.type(emailInput, "dpcboy99@yahoo.com");
    userEvent.type(messageInput, "Hello World");

    const submitInput = screen.getByRole('button');
    userEvent.click(submitInput);

    const newAcc = await screen.findByText(/declan/i);
    expect(newAcc).toBeInTheDocument();
})