# WTF React minimalist tutorial: 5. Props

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

# Props

Props in React are properties passed from parent components to child components, allowing the child components to be customizable. They are the information that you pass to a JSX tag. For example, the `<img>` tag contain the props `className`, `src`, `alt`:

```javascript
import './App.css';
function Avi() {
  return (
  <img
  className="Avi"
  src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
  alt="Amazing Ang"
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
  <Avi
    person={{ name: 'Amazing Ang', imageId: '1bX5QH6' }}
    size={100}
    />
);
}
