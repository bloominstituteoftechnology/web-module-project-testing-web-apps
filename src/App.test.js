const { render } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");



test('submiting a form with more then 3 chars triggers an error', async ()=>{
    render(<App/>);

    //get inputs
    const nameInput = screen.getByPlaceholder(/test/);

    userEvent.type(nameInput, "warasdfasdfsafds");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const newText = await screen.findByText(/Looks like there was an error: maxLength/i);
    expect(newText).toBeInTheDocument();
})

test('submiting a form with more then 3 chars triggers an error', async ()=>{
    render(<App/>);

    //get inputs
    const nameInput = screen.getByPlaceholder(/test/);

    userEvent.type(nameInput, "war");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const newText = await screen.findByText(/Looks like there was an error: required/i);
    expect(newText).toBeInTheDocument();
})