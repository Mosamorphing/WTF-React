# WTF React minimalist tutorial: 6. React States

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@adedigggba](https://twitter.com/adedigggba)

---

# React States

What is state in React? State is how you manage and track dynamic data within a component. Think of it as a special kind of data that components can maintain and update over time. To make it relatable, consider how you use variables in vanilla JavaScript. Variables hold values that can be changed.

For example, if you have a count that starts at 0 and you want to update it to 1 when a user clicks a button, you'd typically write something like this:

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

The increment function here increases the count by 1 every time it is fired. However, it does not change the UI. To change the UI, you have to update the DOM by:

```javascript
document.getElementById(
  "countDisplay"
).innerText = `You clicked ${count} times`;
document.getElementById("incrementButton").addEventListener("click", increment);
```

State in React plays a crucial role in updating UI components efficiently. However, it's important to understand the concept of **Hooks** in React.

Hooks are special functions that allow you to use state and other React features in functional components. Before hooks, these features were only available in class components. Hooks make managing state and side effects in functional components easier, resulting in cleaner and more maintainable code. All hooks start with the prefix "use," like `useState`, `useEffect`, `useContext`, and so on. 

Here’s how it works:

# 1. Importing `useState`

In the case of state, we use the useState hook which is the most popular of all the React hooks. Here's how to import it

```javascript
import { useState } from "react";
```

Starting with React version 17, you no longer need to import React from 'react' in files that use JSX. This means you can directly use JSX without explicitly importing React. However, if you’re using a version of React earlier than 17, you still need to import React alongside `useState` as follows:

```javascript
import React, { useState } from "react";
```

That is it, you have successfully imported useState! Great first step!

# 2. Initializing the state

We can initialize the state (using the count example from above) as follows;

```javascript
const [count, setCount] = useState(0);
```

Here, we're setting the initial or default value of `count` to 0. The `count` variable holds the current state value, while `setCount` is the function used to update that state. This means if we want to increment the value of `count` (which starts at 0), we’ll use `setCount`. 

That brings us to the next step:

### 3. Updating the State

This is where we define what happens in response to an action or event. For example, if we want to increase the count by 1 each time we click an "Increment" button, we would do the following:

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

![6-1](./img/6-1.png)

Then we went ahead and clicked the button so we got:

![6-2](./img/6-2.png)

Each time we click the increment button, we instantly see the count increase on the screen. Using `setCount` ensures that React is aware of the change and re-renders the component accordingly. When `setCount` is called, React automatically updates the displayed count value within the `<p>` element by re-rendering the component.

Just like we updated a number here, the state setter can also manipulate strings, objects, and even arrays.

You might wonder how this applies to real-world applications because, in reality, no one wants to use an app that simply increases a number with a button click. This brings us to more practical and robust uses of state, which we’ll explore in the next lesson.

# Summary

In this lesson, we learnt what hooks are and what the most-used hook is. We also examined how to use states to store and update a counter.

# Exercise

Start by setting up a state with an empty string. Then, update the state by assigning it to your name. Dive in and get your hands dirty! 
