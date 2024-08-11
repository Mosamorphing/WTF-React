# WTF React minimalist tutorial: 12. More Hooks

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@mofasasi](https://twitter.com/mofasasi)

---

As discussed in one of our past lectures, hooks are a game-changer for React development, particularly in the realm of functional components. They allowe developers to manage state, lifecycle methods, and other React features within functional components, previously exclusive to class components.

In this lesson, we will consider a few more hooks.

# 1. useRef

The useRef Hook in React allows you to create a mutable ref object that persists throughout the entire lifecycle of a component. Unlike state, the value of a ref object doesn't trigger a re-render when it changes. This makes refs useful for storing values that don't directly affect the UI, but you may still need to access them from within your component.

Here's the basic syntax for using useRef:

import { useRef } from 'react';

```javascript
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

In this example, we created a ref object called inputRef using useRef(null). We then assigned this ref to the input element using the ref prop. This in turn allowrd us to access the actual DOM element of the input field later in our component. As demonstrated above, useRef can be used to access DOM elements directly. This can be helpful for manually focusing elements, measuring element sizes, or manipulating the DOM in other ways. Another basic usage of the userRef hook, which is an adavantage over the useState hook is that : while state can be used to store values, it triggers a re-render whenever it changes. With useRef, you can store values that don't need to trigger re-renders, such as previous values or references to objects. Also, in some third-party libraries, you might be required to pass a DOM element reference as a prop. useRef can be used to create these references.

Take for instance;

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

But you get the gist, the plan is to be able to initiate a Ref, do whatever you want with the ref and then pass the ref as a prop whenever you need. Also useRef is usable in cases where you want to scrollToTop when something changes. For instance, you may want to scroll to the top of a modal as you switch a multistage modal form for example. Then you can use a function like:

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

What we did in the above example was to create a resuable function "handleScrollToTop", which takes an argument div, then we are using on our page when the component mounts. Meaning that, whenever showModal changes, we want the content of the modal to be scrolled to the top, rather than our previous state -- imagine the user scrolled down and then closed the modal, it's a good user experience if they open the modal and it starts from the top again.

# 2. useMemo

useMemo is a React hook that memoizes the result of a calculation. This means it remembers the result of a function and only re-calculates it when the dependencies change. This is useful for optimizing performance when you have expensive calculations that don't need to be re-done on every render.
Here's a simple useMemo syntax;

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

useMemo and another react hook we will get into in a moment are used to optimize performance in React applications by preventing unnecessary re-renders. For instance, useMemo memoizes the result of a calculation, meaning that it remembers the result of a function and only re-calculates it when the dependencies change. If a calculation is costly, using useMemo can significantly improve performance by avoiding redundant computations.

# 3. useCallback

useCallback is similar to useMemo but instead of memoizing a value, it memoizes a callback function. This is useful for preventing unnecessary re-renders of child components when passing callback functions as props.

Here's a simple example;

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

In this example, handleClick is memoized using useCallback. This ensures that the Child component only re-renders when its own props or state changes, not when the parent's state changes. This can improve performance by preventing unnecessary re-renders. Basically, the syntax is more like wrapping your function in a useCallback keyword in a similar way as useEffect. Just like useEffect, it also accepts dependencies and the function is only going to run whenever the dependencies change.

useMemo and useCallback are performance optimization tools in React. While both involve memorization, they serve different purposes. useMemo caches the result of a complex calculation, preventing unnecessary re-computations when the result hasn't changed. On the other hand, useCallback caches a function, preventing it from being recreated on every render, which is especially useful when passing functions as props to child components to prevent unnecessary re-renders. Essentially, useMemo is for optimizing values, while useCallback is for optimizing functions.

However, with the above perks come limitations, which the major one is performance issues. It sounds ironic that, you are trying to avoid performance issues by using these hooks and then run into more perfomance issues by using them. Therefore, they should be used judiciously. Overusing them can lead to unintended consequences.This is because, if used indiscriminately, they can actually degrade performance. Also, excessive use can make your code harder to understand and maintain (you can already see that from even the most basic examples provided above). If dependencies are not managed correctly, useMemo might return outdated values, thereby leading to unexpected behavior.
