// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
test("on mount, new animal header renders", () => {
    render(<App/>);
    const aTag = screen.queryByText(/Lambda Integration Testing Challengel/i);
    expect(aTag).toHaveTextContent(/Lambda Integration Testing Challenge/i);
    expect(aTag).toBeInTheDocument();
});