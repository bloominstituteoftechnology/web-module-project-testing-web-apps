import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test("renders without errors", () => {
    render(<App/>);
});

test("When component mounts, Contact Form exists.", ()=> {
    //Arrange: Display App Component
    render(<App/>);

    //Act: Find the element with ADD NEW ANIMAL as text

    //findBy - finds an one item. Return a promise if an async call was made.
    //         Test automatically fails if item is not found.
    // const header = screen.findByText("Add New Animal");
    // console.log(header);

    //getBy - finds an one item. Test automatically fails if item is not found.
    // const header = screen.getByText("Add Old Animal");
    
    //queryBy - finds an one item. Returns null if item is not found
    const header = screen.queryByText(/Contact Form/i);

    //queryAllBy - finds multiple items. Returns null if items are not found
    // const header = screen.queryAllByText("Add New Animal");


    //Assert: Verify that element exists on the page.
    // const item = 1;
    // expect(item === 2).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/Contact Form/i);
    expect(header).toBeTruthy();
});