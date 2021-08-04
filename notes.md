this file contains notes from the video regarding options on waiting for a promist to be completed. Use the preview for an easier read. 
```javascript
test("User can add multiple animals", async () => {
    // Arrange: render & grab the elements we need
    render(<AnimalForm />);

    const speciesInput = screen.getByLabelText(/species/i);
    const ageInput = screen.getByLabelText(/age/i);
    const notesInput = screen.getByLabelText(/notes/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Act: fill out the form and click the button (simulating user behavior with userEvent)
    userEvent.type(speciesInput, "Deer");
    userEvent.type(ageInput, "98");
    userEvent.type(notesInput, "I'm the first animal and I love 98 Degrees");
    userEvent.click(submitButton);

    // Intermediate assertion: now we should have just deer, no llamas
    expect(screen.getByText(/deer/i)).toBeInTheDocument();
    expect(screen.queryByText(/llama/i)).toEqual(null);

    //async assertion:

    // if you are changing state you may want to "wait" for the change... such as a change handler
    //THE PROMISE WAY ... 
    // const newItemPromise = screen.findByText("deer");
    // console.log(newItemPromise);
    // newItemPromise.then(newItem=>{
    //     console.log(newItem);
    //     expect(newItem).toBeInTheDocument();
    // });

    //THE AWAIT WAY 
    // 1) 
    // const newItem = await screen.findByText("deer");//did you put "async" in first line?
    // console.log(newItem);
    // 2) 
    await waitFor(() => {
        const newItem = screen.findByText("deer");
        expect(newItem).toBeInTheDocument();
    });
    ```
