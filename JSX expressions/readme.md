# WTF React minimalist tutorial: 4. JSX expressions

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

# JSX expressions

In React's JSX, you can use JavaScript code inside curly brackets {} to embed dynamic values or execute JavaScript logic within JSX elements. 

# Expression 01: Passing strings with quotes

By now, you should be familiar with this because we've used this in previous lessons. This is simply when you pass a string attribute to JSX, putting it in single or double quotes like below:

```javascript
export default function Avi() {
  return (
    <img
      className="avi"
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  );
}
```
Here, we pass `"https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"` and `"Amazing Ang"` as strings.

But what if we want to specify `src` or the `alt` text? We then have to declare them as variables and replace `" "` with `{ }` like below:

```javascript
import './App.css';
export default function Avi() {
  const avi = "https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg";
  const description = "Amazing Ang";
  return (
    <img
      className="avi"
      src={avi}
      alt={description}
      
    />
  );
}
```
![4-1](./img/4-1.png) 

Notice the difference between `className="avi"`, which specifies an `"avi"` CSS class name that makes the image round, and `src={avatar}` which reads the value of our variable `avi`. That is possible because curly brackets allow us to work with JavaScript within our markup!

# Expression 02: Expressions with curly brackets 

Curly brackets allow us to pass JavaScript expressions in JSX. In the illustration below, we declare a variable `name` and then embed it with curly braces inside the `<h1></h1>` tag.

```javascript
export default function TodoList() {
  const name = 'Amazing Ang';
  return (
    <h1>{name}'s Todo List</h1>
);
}
```
![4-2](./img/4-2.png) 

The curly bracket expression allows Javascript logic, including function calls like `formatDate():`

```javascript
import './App.css';
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
  'en-US',
{ weekday: 'long' }
).format(date);
}

export default function TodoList() {
  return (
  <h1> Todo List for { formatDate(today)}</h1>
);
}
```
![4-3](./img/4-3.png) 

