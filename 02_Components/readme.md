# WTF React minimalist tutorial: 2. Components

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

# What are Components?

In React, Components are reusable pieces of code that represent a part of a user interface (UI). Components are the building blocks of a React application, and they make it easier to create, manage, and maintain complex UIs by breaking them down into smaller, manageable pieces.

One of the primary advantages of using components in React is that they facilitate code reusability. By creating components for different parts of a UI, such as buttons, forms, or navigation bars, developers can reuse these components in multiple places throughout their application. This not only saves time and effort but also promotes consistency in the look and feel of the application.


# Breakdown of a Component

```javascript
function Contributors () {
  return (
    <img
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  )
}
```

1. The `function` prefix allows us to name a component. For example, the above component is named `Contributors`. 

2. React's JSX syntax combines the simplicity of HTML-like markup with JavaScript, allowing you to create components easily, like an <img /> tag with attributes.

```javascript
  return (
    <img
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  )
```
![2-2](./img/2-2.png) 

# Reusing a Component

1. To reuse the above component, we use the `export default` prefix to identify the function. The prefix allows us to nest it or import it into another component with ease. 

In the example below, the `Contributors` component is reused in the `Catalogue` component with 4 `Contributors ` components. 

```javascript
function Contributors() {
  return (
    <img
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  );
}

export default function Catalogue() {
  return (
    <section>
      <h1>WTF Academy Top Contributors</h1>
      <Contributors/>
      <Contributors/>
      <Contributors/>
      <Contributors/>
    </section>
  );
}
```
![2-1](./img/2-1.png) 

In other words, `Catalogue` is a parent component and `Contributors` is a child component. 

# Exporting and Importing Components

Imagine you want to redesign your app's landing screen to show a list of courses available on WTF Academy instead of top contributors. It would be smart to separate components like `Contributors` and `Catalogue` from the main component file. You can separate these components by:

1. Creating a new JSX file to put the existing components
2. Export your function component from the new file (using either `default` or `named` exports
3. Import it into the file where you will use the component (typically your root/main JS file)

![2-3](./img/2-3.png) 

Note: `Catalogue.jsx` now defines the `Contributors` component which is only used within the same file and is not exported while the `Catalogue` component is exported.
Also, `App.jsx` imports `Catalogue` from `Catalogue.jsx` and exports the root `App` component as a default export.

But what if you want to export and import multiple components from and into the same file? This is possible by using the `default export` and `named export`. However, a file can only have one default export but many named exports. Let's see how: 

From the above code, let's imagine that we want to import one contributor into `App.jsx`.

1. We make sure we `export` the function from our `Catalogue.jsx` (this becomes our named export while the other remains a default)
2. In our `App.jsx` file, we import the named export with the curly brackets like so:
   
```javascript
import { Contributors } from './Catalogue';
```
3. Render `Contributors` from the `App.jsx` components
   
```javascript
export default function App() {
  return (
    <Contributors/>
  );
}
```
![2-4](./img/2-4.png) 

Try rendering `<Contributors/>` and `Catalogue` and see the difference in your local host. 

# Summary

In this lecture, we introduced Components, one of the core concepts of React. We looked at a breakdown of components and how we can reuse them. We also touched on how to export, import and how to nest them in other components. 
