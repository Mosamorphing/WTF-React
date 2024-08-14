# WTF React minimalist tutorial: 9. React Hooks

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

# What are hooks?

React Hooks are functions that let you use state and other React features in functional components. They are like special tools that make it easier to add features to your components without needing complex class components.
With hooks, you can create awesome components using just functions! If you are familiar with classes, you know that most times they are painful to write, but now that hooks have made life easier, why not try them out?
Popular react hooks include useState, useEffect, useContext, useReducer, useMemo, useCallback.
Notice how all the hooks begin with the keyboard "USE". This is the convention in React and when you are writing your own custom hooks -- because you can, make sure to follow the same convention and start with "use" to make it clear that they follow the rules of hooks.

# 1. useEffect

The useEffect hook in React is a powerful tool that allows you to perform side effects in functional components. Side effects refer to any operation that affects something outside the scope of the component, such as fetching data, updating the DOM, or setting up subscriptions or timers.

At the most basic level, the syntax looks like this;

```javascript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Side effect code goes here
  }, [dependencies]);
  return (
    // JSX for rendering the component
  );
}
```

I am now going to explain what each term above means;

-- Side effect, just as the name implies in pain english language is an additional effect that occurs in addition to the main effect of a situation, or simply put, the consequence of an action. You might still be wondering what a consequence of an action means, this means that any code that runs inside a use effect is running because something just happened. A classic example is fetching some data from the backend when you arrive at a particular page in your application. Such data fetching is usually put in a useEffect hook such that it then only runs based on whether you come to that page or not. We will see it in action in just a bit.

-- Dependencies: The dependencies argument in useEffect is an array that allows you to control when the effect should run. It specifies the values that the effect depends on. Here is a simple explanation of how dependencies work in useEffect: 1. If you don't provide the dependencies array, the effect will run after every render. 2. If you provide an empty array [], the effect will run once, after the initial render. 3. If you include values in the dependencies array (e.g., [prop1, state1]), the effect will run after the initial render and whenever any of the dependencies change in subsequent renders.

Keep those in mind and now let's see the above explanation in action.

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.example.com/users`);
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, []); //note the empty dependency here

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
export default Users;
```

What we did here was just stating that we get the users page, fetch some set of data from the users endpoint and then display them to the client. Since we used an empty dependency, this effect is only going to be seen once when the page is loaded. If we passed in an array of dependencies, it is going to run everytime any of the dependencies change. For example;

```javascript
function User({ id }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.example.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, [id]); //Notice the dependency here
  return <>return your jsx here</>;
}
export default User;
```

Here, for everytime the id (which was passed here as a prop) changes, the endpoint to fetch the data is going to be called/hit and then it updates user using the setter SETUSER or error (using SETERROR), in case there is an error.
Please note that it is also going to have run the first time on reaching the page, and then whenever the id changes, not that it only runs when the id changes.
You might be wondering, what if we have more than one dependency? meaning we want it to run based on two or more actions. Well, that is also possible. It then means that we will have all the dependencies in an array, separated by commas. It is shown as follows;

```javascript
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://api.example.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      setError(error);
    }
  };
  fetchUser();
}, [id, something, anotherThing, anotherExtraThing]);
```

Before we move on from useEffect, there's a concept here that needs to be learnt, and it is called the cleanup function. The cleanup function in React's useEffect hook is used to stop side effects that no longer need to be executed before a component is unmounted. This is done in order to prevent memory leaks and ensure that the component's behavior is consistent and predictable. Here's a sample usage of the cleanup function.

```javascript
import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    //here is the cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div>
      <h2>Timer</h2>
      <p>The count is: {count}</p>
    </div>
  );
}
```

In more simpler terms, the cleanup function is telling the useEffect hook to "turn off" the timer when it is no longer in such such that we don't end up having needless renders and memory leaks. In the above example, if for instance you set up an interval in the useEffect hook without providing a cleanup function, the interval will continue to run even after the component has been unmounted. This means that the callback function you've defined in the interval will keep getting called, even though the component is no longer visible on the screen. Each time the interval callback function is called, it will try to update the component's state (in this case, the count state). However, since the component has already been unmounted, React will not be able to actually update the UI. Instead, React will try to "re-render" the component, even though it's not visible anymore. These unnecessary re-renders can lead to performance issues in your application, as React has to do extra work to handle these useless updates. It's just like cleaning up your dishes before using them again, that's what the cleanup function does.

# 2. useReducer

The useReducer hook works similarly to the useState hook, but it's more suitable for complex state logic. UseReducer allows you to keep track of multiple pieces of state and handle state changes in a more organized way. It allows you to define a reducer function that encloses your state update logic, making it easier to manage states in your react application. Here is a simple example, similar to the example in lecture 6 on useStates -- the counter example.

```javascript
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="body__container">
      <p> Count: {state.count}</p>
      <button
        className="button"
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </button>
      <button
        className="button"
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </button>
    </div>
  );
}
```

Here is how it works:
First, define a reducer function that takes the current state (the initial value -- at first) and an action as arguments, and returns the next state. The reducer should be a pure function.
Then, call useReducer in your component, passing the reducer function and an initial state value.
as follows :

```javascript
const [state, dispatch] = useReducer(reducer, { count: 0 });
```

It returns an array with two elements: the current state and a dispatch function. This is similar to useState whic returns the state and its setter. As a refresher, this is what I just said means;

```javascript
const [counter, setCounter] = useState(0); //but we are not talking about useState so do not mix things up here
```

For you to then make an update to the state, you have to use the dispatch function, while passing in the action object which typically has a type property that identifies with the type of action you want to follow the event.
It looks like this:

```javascript
<button className="button" onClick={() => dispatch({ type: "increment" })}>
  +
</button>
```

This means that we want to increment the count state when we click on this button, and the same can be done for decrement or whetever case you have specified in the reducer function.
You might be wondering -- and trust me this question is very valid, that why would you want to use reducers rather than state? I agree with you, the useState hook has a very easy syntax and concept as a whole, in comparison to useReducer. However, reducer comes in handy when you have a number of states you want to manage as it makes your code cleaner, organized and easier to maintain.

# 3. useContext

Typically, in a complex application, passing props from the grandparent, to the parent, then to the child can be such a daunting task. In fact, it makes life harder for everyone. To solve this issue of prop drilling is where the useContext hook comes in.
The useContext hook in React is used to read and subscribe to context from your component. It is a part of React's Context API, which allows you to pass data through the component tree without manually passing props down manually through each nested component.
Imagine a scenario where you want to identify a logged in user throughout your app, whether by reading it or by setting in (during login) you definitely cannot PROP your way out of such OR you want to make an application that support both light and dark modes, it is not advisable to start passing props to identify what the current preference of the user is, therefore you have to use the useContext hook and the good news you do not have to install an external library to use it. Sounds great, right? Let's see an example.

```javascript
//index.js
import React, { createContext, useContext, useState } from "react";

import "./App.css";

const AuthContext = createContext();

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = { isLoggedIn, setIsLoggedIn };
  return (
    <AuthContext.Provider value={value}>
      <App />
    </AuthContext.Provider>
  );
}

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center">
      <p>User is {isLoggedIn ? "Logged in" : "Logged out"}</p>
      <button
        className="button"
        onClick={() => {
          setIsLoggedIn(!isLoggedIn); // typically this will be some type of login or logout action
        }}
      >
        Toggle status
      </button>
    </div>
  );
}
export default Index;
```

What we did here;

1. we created a context by calling createContext outside the components to create a context. It returns a context object that represents the kind of information you can provide or read from components.
2. To use the values in the context, you must wrap your app in the Context Provider which is a property that you can use to wrap components that need to access the context. In this case, we use AuthContext.Provider which is gotten from the the createContext API such that we then have something like;

```javascript
function Index() {
  const value = { isLoggedIn, setIsLoggedIn };
  return (
    <AuthContext.Provider value={value}>
      <LoginPage />
    </AuthContext.Provider>
  );
}
```

![9-1](./img/9-1.png)
![9-2](./img/9-2.png)

The Provider component accepts a VALUE prop that is passed to consuming components that are descendants of this Provider. Note that VALUE here passed out a prop should contain all the states and their corresponding setters that you want to use across the application, from anywhere at all. Just as shown above, I created a constant that houses isLoggedIn and setIsLoggedIn, making it available to for anywhere in the whole app.

3. You can now use your state and its setter (isLoggedIn, setIsLoggedIn) anywhere in this app by just importing useContext and AuthContext, then getting the state and setter out of those as indicated below;

```javascript
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
```

This is a much simpler example, a complex one would be a case where user's information is persisted using localStorage for example and then retrieved via some state, say USER which is going to be set using the setter setUser during login. Then the user can be used anywhere in the app by importing the context.

# Summary

In this lesson, we learnt about the most popular and most used react hooks, one of them we learnt earlier. Please note that these are not all the hooks in React, but these are the ones you will mostly need in your day to day coding using React.

# Exercise

Replicate these examples without taking a look at the codebase provided. Then go out of your way by building an app with all that we have learnt so far up until this stage. Looking at each hook, you should be able to think about where each of them apply in a real world application. If you encounter any problem, remember there are a lot of resources out there.
