In the last unit we discussed the general what and why of testing, and learned how to implement end-to-end tests. Here we're going to dive into implementing integration tests. The what and why of testing remains the same between all different types of automated tests.

In this module, we will use the react-testing-library (Links to an external site.) to run tests. Unlike previous testing libraries, react-testing-library is designed with the user in mind, testing components via DOM nodes, similar to how a user would interact with the front end of a website.

react-testing-library recently underwent a major overhaul - we used to use a different libraries, Enzyme and Jest, for tests that cared more about the internal management of props and state. Now though, we can use react-testing-library to test props, state, output (in DOM elements), and more.

The "hello world" of the react-testing-library is a test to check if a component loads without crashing. Here, we declare a test, name it, and check if the App renders.

test("renders App without errors", () => {
  render(<App />);
});
Earlier, we discussed about the "Arrange, Act, Assert" structure for testing. There's a technical first step, import - we'll look at all of them below. For more details, check out the testing-library documentation (Links to an external site.).

The following matches the structure we've studied and is slightly simplified version of what you''ll find in the documentation. What we'll walk through in the tutorial is even more simple but this example is good for illustration.

Here we are testing the greeting component to see if our expected greeting ("hello lambdalorians") appears in the browser as we expect it will per the code below. Important note here, our tests work with text because that's what the user sees and what the user experiences - the test does not test on classes, for example, because that's an implementation detail, not a rendered element.

import React from 'react';

const Greeting = () => {
  return <h1 class="my-greeting">Hello Lambdalorians!</h1>;
};

export default Greeting;
Import
As with any library, we need to import react-testing-library before we can use it, this all should look more or less familiar from imports we've done before. You'll notice that "Arrange, Act, and Assert" are yet to be filled out.

// import dependencies
import React from "react";

// import react-testing methods
import { render, screen } from "@testing-library/react";

// add greeting
import Greeting from "./Greeting";

test("renders greeting on Greeting component", async () => {
  // Arrange
  // Act
  // Assert
});
Arrange
The render method renders a React element into a virtual DOM. Recalling our definition of "arrange", this is basically the part where we set ourselves up for success.

test("renders greeting on Greeting component", async () => {
  // Arrange
  render(<Greeting />);

  // Act
  // Assert
});
Act
The screen.getByText() method can be used to "query" the DOM for a specific node by its text that we expect to see in the browser. We will use it here to test that our greeting ("hello lambdalorians") is being rendered by the <Greeting /> component.

test("renders greeting on Greeting component", async () => {
  // Arrange
  render(<Greeting />);

  // Act
  const greeting = screen.getByText(/hello lambdalorians!/i);

  // Assert
});
A quick note here, you may notice that "hello lambdalorians" is written with / instead of "s. This is regex syntax (Links to an external site.) and is commonly used in testing. the i designates our text as case insensitive so even though we have the string "hello lambdalorians" written, our test will pass even if "hElLo LamBdAlOriAns" is displayed in the browser.

Assert
Finally, we need to "assert" that the greeting has indeed been rendered. Here we use a couple of new functions - expect is a Jest function that is made globally available with create react app. The other, toBeInTheDocument(), comes from Jest DOM (Links to an external site.), a companion library to react-testing-library that provides custom matchers for Jest. A full list of functions can be found on GitHub (Links to an external site.). Throughout our examples we assume that you import Jest DOM in create-react-app, and suggest that you always do this, rather than importing it every time.

test("renders greeting on Greeting component", async () => {
  // Arrange
  render(<Greeting />);

  // Act
  const greeting = screen.getByText(/hello lambdalorians!/i);

  // Assert
  expect(greeting).toBeInTheDocument();
});
Running Tests
You should be at least somewhat familiar with this process from tests that we've used throughout Lambda to help your code along. All tests run in the terminal with npm test - as you run tests you should see passes and failures in the console. Running this test would result in a "pass" since our earlier code does indeed render "Hello Lambdalorians".


For review, the react-testing-library are designed to mimic how a human would interact with a website, just like the react-testing-library, these tests focus on UI specifically. This again, is just another way to consider the user in design.

We test pieces of interface by capturing what we expect to see (or not see) in the DOM using queries. What should (or should not) be there is rendered to a virtual DOM by the library's renderer. This is the DOM node of interest (a certain button, a label containing a specific text, an input with some specific value). We can run matchers against that piece of DOM to assert, for example, that the selection exists in the document, or that it's visible.

Let's consider the example of an increment counter that increases by one every time the Increment button is clicked. Set up like so:

import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;
Our test would look something like the following. This should look similar to the example we walked through in the last objective, with just a few more steps added on. Importantly, we simulate a user click with userEvent.click(button) and include multiple assertions at the end.

import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Counter from "./Counter";

test("increments count when increment button is clicked", async () => {
  // Arrange
  render(<Counter />);
  // Act
  const count = screen.getByText(/0/i);
  // get the button node
  const button = screen.getByText(/increment/i);
  // simulate a user click
  userEvent.click(button);
  // Assert
  expect(count).toHaveTextContent("1"); //passes with 1 because we expect it to be 1 after a button click
  expect(count).not.toHaveTextContent("0");
});
Break the Test
We'll tell you to break your tests often. In the example above there are multiple expect statements as an attempt to 'break the test', this is important and intentional. When testing, we want to "break the test" as much as we possibly can, this is the best (and really the only) way to ensure that your website won't break when a user goes to try and use it.

Follow Along
Change App.js to output different jsx:

 const App = () => {
      return (
        <section aria-labelledby="KittensHeader">
          <h2 id="KittensHeader">All About Kittens</h2>
          <p className='content'>Lorem ipsum dolor sit amet</p>
        </section>
  }
Import the App component into our test file App.test.js and render it. You may pass any props you want! Renders the app component.

  import React from 'react';
  import { render, screen } as rtl from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import App from './App';

  it('renders "all about kittens" text', () => {
    render(<App foo="you may inject props!" />);
  });
Capture a piece of the output! We expect some text containing "All About Kittens" to be rendered so we'll use queryByText. This is an example of the act phase.

  it('renders "all about kittens" text', () => {
    render(<App />);
    const hasKittensText = screen.queryByText(/all about kittens/i);
  });
Assert that the hasKittensText is actually in the document. If it's not, the value of hasKittensText will be null.

  it('renders "all about kittens" text', () => {
    render(<App />);
    // IMPORTANT
    // queryByText() returns either the node, or null:
    const hasKittensText = screen.queryByText(/all about kittens/i);
    expect(hasKittensText).toBeInTheDocument();
  });
Try out getByText() as an alternative to queryByText().

  it('renders "all about kittens" text', () => {
    render(<App />);
    // IMPORTANT
    // getByText() returns either the node, or **FAILS THE TEST** outright:
    expect(screen.getByText(/all about kittens/i));
  });
Break the test!. Remember that getByText, as well as the rest of the queries that have get prefix in their names, will cause a test fail, instead of returning a null value. Queries that have the query prefix return null if the element is not found.

  it('renders "all about kittens" text', () => {
    render(<App />);
    // no matcher needed, although it may be added to improve readability
    expect(screen.getByText(/THIS WILL MAKE THE TEST CRASH AND BURN/i));
  });
alt text

Capture using different criteria. We have many other queries available to us. In our component, we have an aria-e attribute on the section to inform screen readers that the element <h2 id="KittensHeader">All About Kittens</h2> is actually a label for the section element. Let's capture the h2 by label text! The point is to test like a user would. We expect a particular label to be there for our users!

  it('renders "all about kittens" text', () => {
    render(<App />);
    expect(screen.getByLabelText(/All About Kittens/i));
  });