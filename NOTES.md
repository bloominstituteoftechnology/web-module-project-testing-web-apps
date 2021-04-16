## Install RTL

npm install --save-dev @testing-library/react

npm install --save-dev @testing-library/jest-dom

npm install --save-dev jest !  NO THIS CAUSES ERRORS

## WORK ON

Where is clear form used in ContactForm.js


## Why Test?

- helps us trust the code
- helps you make future changes and refactoring
- tests are more actionable that comments, helps with collaboration
- bugs will be immediately surfaced
- encourages modularity
- testing enforces best practices
- testing acts as a form of documentation
- helps with quality control and deployment
- less technical debt

## TESTING

we will be using Jest & RTL

https://devhints.io/jest

## NOTES

query = chill = should return null = look for something NOT there

eg. error should not be there


const Logout = () => {
  let history = useHistory();
  const logout = () => {
    alert("You have been logged out. Thank you for visiting");
    localStorage.clear();
    history.push("/");
  };

  <Link
        to="/"
        onClick={() => logout()}
        style={{
          margin: "5vh 0",
          fontSize: "5vh",
          backgroundColor: "#222",
          color: "white",
          textDecoration: "none",
          border: ".05rem solid white",
          padding: "2rem 3rem",
          opacity: "",
        }}
      >

