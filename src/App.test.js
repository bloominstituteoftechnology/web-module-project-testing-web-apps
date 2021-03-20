import React from 'react';
import { render , screen } from '@testing-library/react';
import App from "./App"

test( " renders App without errors", () => {
    render(<App/>)

    let header = screen.queryByText(/Form/i);
    expect(header).toBeInTheDocument();
})