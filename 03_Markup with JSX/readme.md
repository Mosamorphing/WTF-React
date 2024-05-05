# WTF React minimalist tutorial: 3. Markup with JSX

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

# Markup with JSX

HTML is a markup language used to annotate and give structure to text or data in a way that computers can understand and process. `Tags` are used to define elements and their attributes. JSX is a syntax extension for Javascript that allows you to write HTML-like elements inside JavaScript code. So, basically, JSX is Javascript code written in the guise of HTML.

If you wonder why this is essential, it is because the web is built on HTML, styled in CSS and given responsivity with Javascript. So, HTML is the bedrock of the Web. It houses the content but as the Web developed and changed from being static to being dynamic with Javascript, more interactivity was required and this is why in React, both content (HTML) and interactivity (JavaScript) can be written in the same JSX file.

For example, below is a simple HTML code

```javascript
<h1> Amazing Ang's Todo List </h1>
<img
src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
alt="Amazing Ang"
class="photo"
>
<ul>
  <li> Retrieve hacked funds from the Dark Forest
  <li> Attend PKU Blockchain Fireside chat
  <li> Send an update to WTF Academy Discord
</ul>
```

To rewrite this in JSX, it becomes;

```javascript
import './App.css';

export default function TodoList() {
  return (
<div>
  <h1> Amazing Ang's Todo List </h1>
  <img
  src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
  alt="Amazing Ang"
  className="photo"
  />
  <ul>
    <li> Retrieve hacked funds from the Dark Forest </li>
    <li> Attend PKU Blockchain Fireside chat</li>
    <li> Send an update to WTF Academy Discord</li>
  </ul>
</div>
);
}
```
![3-1](./img/3-1.png) 

For HTML to be successfully written in JSX, the following conditions must be met:

1. JSX expressions must have one parent element.
This means that your HTML code must be wrapped in a single parent tag. From the example above, we see an opening tag `<div>` and its closing tag `</div>`. it can also be written as `<>` and `</>`.

2. The use of camelCase
"camelCase" is a naming style in programming where the first letter of each word (except the first word) is capitalized. 

The reason for using `className` instead of `class` in React has to do with JavaScript and the [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Element/className).

In JavaScript, `class` is a reserved keyword used for defining classes in object-oriented programming. However, in HTML, `class` is used to specify CSS classes for styling elements.

When React code gets compiled and transformed into JavaScript via JSX, using `class` directly would cause conflicts with JavaScript's `class` keyword. To avoid this conflict, React uses `className` instead of `class` for specifying CSS classes in JSX.

This is a necessity to avoid naming conflicts and maintain compatibility between JavaScript and HTML within the context of React applications.

_fun fact:  The name "camelCase" comes from the appearance of the "humps" created by the capital letters, resembling a camel's back._

# Summary 

In this lecture, we take a look at Markups with JSX and the conditions that need to be met to convert HTML into JavaScript

