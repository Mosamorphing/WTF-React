# WTF React minimalist tutorial: 10. More Hooks

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@mofasasi](https://twitter.com/mofasasi)

---

As we discussed in previous lectures, hooks revolutionize React development, especially for functional components. They enable us to manage state, lifecycle methods, and other React features within functional components, which were previously only accessible in class components.

In this lesson, we’ll explore a few more hooks.

# 1. `useRef`

The `useRef` hook in React lets you create a mutable ref object that persists throughout the entire lifecycle of a component. Unlike state, changing the value of a ref object doesn’t trigger a re-render of the component. This makes refs ideal for storing values that don’t directly impact the UI but need to be accessed within the component.

Here’s the basic syntax for using `useRef`:

```javascript
import { useRef } from "react";

function MyComponent() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}
```

In this example, we created a ref object called `inputRef` using `useRef(null)`. We then assigned this ref to the input element using the `ref` prop. This allows us to directly access the DOM element of the input field later in our component. As shown, `useRef` can be used to access DOM elements directly, which is useful for tasks like manually focusing elements, measuring element sizes, or making other direct manipulations to the DOM.

Another advantage of `useRef` over `useState` is that while state updates trigger a re-render of the component, `useRef` allows you to store values that don’t cause re-renders. This makes `useRef` ideal for storing values that need to persist between renders but don’t affect the UI, such as previous values or references to objects. Additionally, third-party libraries often require DOM element references as props, and `useRef` is perfect for creating these references.

For example:
```javascript
import React, { useRef, useEffect } from "react";
import Chart from "third-party-chart-library"; // This is a dummy library by the way

function MyChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {});

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: "400px", height: "300px" }} />;
}

export default MyChart;
```

But you get the gist: the plan is to initiate a ref, perform any necessary operations with it, and then pass the ref as a prop whenever needed. `useRef` is also handy in scenarios where you want to scroll to the top when something changes. For example, you might want to scroll to the top of a modal when switching between different stages of a multi-step form. You can accomplish this with a function like:

```javascript
export const handleScrollToTop = (div) => {
  div.current.scrollTop = 0;
};

//to then use it you can have this in your page
useEffect(() => {
  handleScrollToTop(modalRef);
}, [showModal]); //or whatever your array dependencies are.

return (
  <ModalContainer showModal={showModal} closeModal={closeModal}>
    <div ref={modalRef}>your multistage modal body goes here</div>
  </ModalContainer>
);
```

What we did in the above example was to create a reusable function, `handleScrollToTop`, which takes a `div` as an argument. We then use this function on our page when the component mounts. Specifically, whenever `showModal` changes, we want the content of the modal to scroll to the top. This improves user experience by ensuring that the modal starts from the top every time it's opened, rather than retaining the previous scroll position—imagine if the user scrolled down and then closed the modal; reopening it would start at the top, which is usually more intuitive.

# 2. useMemo

`useMemo` is a React hook that memoizes the result of a calculation. This means it remembers the result of a function and only recalculates it when the dependencies change. This is useful for optimizing performance when dealing with expensive calculations that don't need to be re-computed on every render.

Here's a simple syntax for `useMemo`:

```javascript
import { useMemo, useState } from "react";

function ExpensiveComponent({ data }) {
  const [count, setCount] = useState(0);

  // Expensive calculation goes in here
  const filteredData = useMemo(() => {
    return data.filter((item) => item.value > count);
  }, [data, count]);

  return <div>{/* Render filtered data */}</div>;
}
```

In this example, we are ensuring that `filteredData` is not recalculated on every render. Instead, it is recalculated only when `data` or `count` changes. This is achieved using the `useMemo` hook. By memoizing `filteredData`, React avoids recalculating it unnecessarily, thus optimizing performance, especially when dealing with costly computations.

`useMemo` and `useCallback` (which we’ll discuss next) are both used to optimize performance in React applications. While `useMemo` memoizes the result of a calculation, `useCallback` memoizes a callback function. This prevents unnecessary re-renders of components that depend on these values or functions.

# 3. useCallback

`useCallback` is similar to `useMemo`, but instead of memoizing a value, it memoizes a callback function. This is useful for preventing unnecessary re-renders of child components that receive the callback function as a prop. 

Here’s a simple example:

```javascript
import { useCallback, useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}
```

In this example, `handleClick` is memoized using `useCallback`. This means that the `Child` component will only re-render if its own props or state change, rather than when the parent’s state updates. This can enhance performance by avoiding unnecessary re-renders. Essentially, `useCallback` is used to ensure that a function is not recreated on every render, similar to how `useEffect` works with dependencies. The function inside `useCallback` will only be updated when the specified dependencies change.

Both `useMemo` and `useCallback` are tools for optimizing performance in React. While `useMemo` is used to cache the results of expensive calculations, preventing them from being recalculated unnecessarily, `useCallback` is used to cache functions, preventing them from being recreated on each render. This is particularly useful when passing functions as props to child components, as it helps to avoid unnecessary re-renders. In summary, use `useMemo` for optimizing calculations and `useCallback` for optimizing functions.

However, it’s important to use these hooks wisely. Overusing `useMemo` and `useCallback` can ironically lead to performance issues. This happens because excessive optimization might actually hurt performance, and managing dependencies incorrectly can lead to outdated values or unexpected behaviour. Balancing optimization with simplicity is key to maintaining both performance and code readability.

# Summary

In this lesson, we explored additional React hooks and their basic usage. We also discussed how over-optimization can negatively impact performance and lead to more complex code.

# Exercise

Identify scenarios in your application where the hooks discussed could be applied. Implement these hooks thoughtfully to see their effects. Remember to avoid over-engineering and excessive optimization, it never ends well.
