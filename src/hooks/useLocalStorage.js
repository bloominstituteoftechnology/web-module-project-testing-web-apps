import { useState } from "react";

// An upgraded version of useState, with the same interface but the added functionality of reading to / writing from localStorage
export const useLocalStorage = (key, initialValue) => {
  // If the values are in localStorage already, use them to initialize our useState call
  const [value, setStoredValue] = useState(() => {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key)); // parse the string saved in local storage back into a JavaScript object
    }
    return initialValue;
  });

  // Then, each time we update state, also update localStorage (this means we're going to create our own custom "upgraded" setValue function)
  const setValue = newValue => {
    setStoredValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setValue];
}

// JavaScript objects are data structures specific to the JavaScript programming language. JSON is a text format, universal to all web servers and clients.

// When working with local storage. JSON.stringify your JS objects into a string to store them in local storage. Then JSON.parse the string back into the JavaScript data structure we know and love :)

// tl;dr "stringify on the way in, parse on the way out"