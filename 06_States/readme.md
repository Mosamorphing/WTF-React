# WTF React minimalist tutorial: 5. React States

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@adedigggba](https://twitter.com/adedigggba)

---

# React States

What is state in React? State is a way to manage and track dynamic data within a component. Or in simpler words, it is a special kind of data that components can maintain and change over time. To make it even more relatable, we have to liken it to vanilla javascript. In vanilla javascript, we usually use Variables which hold values that can be changed.
Take for instance, you have a count that you want to update from 0 to 1 in response to an event, maybe a click event. You'd typically say:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Counter Example</title>
  </head>
  <body>
    <p id="countDisplay">You clicked 0 times</p>
    <button id="incrementButton">Click me</button>

    <script src="script.js"></script>
  </body>
</html>
```

```javascript
let count = 0;

const increment = () => {
  count = count + 1;
};
```

what the increment function does here is to increase count by 1 for every time it is fired. However, it does not change the UI. You then have to update the dom by doing something like just to simply update the UI.

```javascript
document.getElementById(
  "countDisplay"
).innerText = `You clicked ${count} times`;
document.getElementById("incrementButton").addEventListener("click", increment);
```

A react state saves the day by coming to the rescue such that the function can be called and the UI gets updated almost immediately.
It is important however to know that there is the concept of HOOKS in React. Hooks are special functions in React that allow you to use state and other React features in functional components. Before hooks, these features were only available in class components. Hooks make it easier to manage state and side effects in functional components, leading to cleaner and more maintainable code.
Here is how it works.

# 1. Importing `useState`

In the case of state, we use the useState hook which is the most popular of all the React hooks. Here's how to import it

```javascript
import { useState } from "react";
```

Note that since React version 17, you no longer need to import React from react in files that use JSX. This means you can directly use JSX without importing React explicitly. If you are using a < 17 version of React, please import React from 'react' alongside useState as follows:

```javascript
import React, { useState } from "react";
```

That is it, you have successfully imported useState! Great first step!

# 2. Initializing the state

We can initialize the state (using the count example from above) as follows;

```javascript
const [count, setCount] = useState(0);
```

Here, we are saying that the initial or default value of count is 0, count holds the current state value, while setCount is a function to update the state. Meaning that if we want to increment the value of count (0 as at now), we use setCount. Which brings us to the third step.

# 3. Updating the state

This is where we decide what happens when we do something -- the result of an action or event. For instance, if i want to increment the count by 1 everytime I click on an increment button, I am going to do the following;

```javascript
const increment = () => {
  setCount(count + 1);
};
```

Our codebase then looks like this (at this time);

```javascript
import { useState } from "react";

const SimpleCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <p>Our count is {count}</p>
      <button onClick={increment}>Increment</button>
    </>
  );
};

export default SimpleCounter;
```

For everytime we click on the increment button, we see immediately on the screen that the count increases. Using setCount ensures that React knows about the change and re-renders the component. When setCount is called, React automatically re-renders the component, updating the displayed count value in the <p> element.
Just like we update a number in this case, the state setter can manipulate a string, object, even arrays as well.

It is worthy of note that when a React application reloads the page, the state resets to its default values because React is a client-side library. This means that all the JavaScript code, including the React components and their state, runs in the browser after being downloaded from the server. Therefore, on a page reload, React starts fresh, and all state information is lost unless intentionally persisted and rehydrated using techniques like browser storage, server-side rendering, or other state management libraries.

//how to update objects
// how to update arrays as well.
// using state to update forms.


# Summary

In this lecture, we examined React state; the concept of React hooks, why we use react states, and we also learnt about how to use React states to store and update values within our component.

# Exercise

Initiate a state as an empty string, then go ahead to update the state value by setting it to your name. Simple right? Now go ahead and get your hands dirty.
