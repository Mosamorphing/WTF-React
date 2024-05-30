# WTF React minimalist tutorial: 5. Props

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

# Props

Props in React are properties passed from parent components to child components, allowing the child components to be customizable. They are the information that you pass to a JSX tag. For example, the `<img>` tag contain the props `className`, `src`, `alt`:

```javascript
import './App.css';

function Avi({ imageUrl, size }) {
  return (
    <img
      className="avi"
      src={imageUrl}
      alt="Avatar"
      width={size}
      height={size}
    />
  );
}

export default function User() {
  return (
    <Avi/>
  );
}
```
There are defined props you can pass through the `<img>` tag, [See here](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element).
However, you can also pass props to your own components and customize them. For example:

```javascript
export default function User() {
  return (
    <div>
      <Avi
        size={150}
        imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      />
      <Avi
        size={100}
        imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      />
      <Avi
        size={80}
        imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      />
    </div>
  );
}
```

Think of Props like a switch you can adjust. They're similar to arguments you pass into functions. In React, components take props as their only input. So, when you define a component function, you're essentially creating a function that takes props as its argument.

# Passing JSX as children components

In React, when you place elements or components within a JSX tag, the parent component will automatically receive these nested elements or components as a special prop called `children`.
To illustrate, if you nest an `<Avatar />` component inside a `<Card>` component, like so:


