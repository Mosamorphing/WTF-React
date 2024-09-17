# WTF React 極簡教學：4. JSX 表達式

《React初学者指南》帮助新手快速掌握React。 

**WTF Academy社群**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) **編譯者**：[@Mofasasi](https://twitter.com/mofasasi)

---

# JSX 表达式

在 React 的 JSX 中，你可以在大括号 {} 内使用 JavaScript 代码，以便在 JSX 元素中嵌入动态值或执行 JavaScript 逻辑。

# 1. 使用引号传递字符串

到目前为止，你应该已经熟悉这一点了，因为我们在之前的课程中已经用过了。只需将字符串属性放在单引号或双引号中传递给 JSX 元素，如下所示：

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

在这里，我们将 `"https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"` 和 `"Amazing Ang"` 作为字符串传入。

但是如果我们想要动态指定 `src` 或 `alt` 文本呢？我们就需要先将它们声明为变量，然后用 `{}` 包裹变量名，像这样

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

注意 `className="avi"` 和 `src={avatar}` 之间的区别。前者指定了一个使图像变为圆形的 CSS 类名 `"avi"`，而后者读取了变量 `avatar` 的值。这之所以可行，是因为花括号允许我们在 JSX 中嵌入 JavaScript 表达式。

# 2: 使用花括号的表达式

花括号允许我们在 JSX 中使用 JavaScript 表达式。在下面的示例中，我们声明了一个变量 `name`，然后在 `<h1></h1>` 标签内用花括号嵌入它。 

```javascript
export default function TodoList() {
  const name = 'Amazing Ang';
  return (
    <h1>{name}'s Todo List</h1>
);
}
```
![4-2](./img/4-2.png) 

你可以在 JSX 中使用花括号 `{}` 来嵌入 JavaScript 表达式，例如调用 `formatDate()` 函数：

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

注意：可以使用大括号的两种方式有：
1. 在JSX标签内，例如：`<h1>{name}的待办事项列表</h1>`
2. 作为属性值跟在`=`号后，例如：`alt={description}`

# 3: 使用双层大括号表达式

在JSX中，双层大括号用于传递对象。因为对象本身就用大括号表示，所以需要将它们包裹在另一对大括号中。

一个对象可能是这样的：
```javascript
{name: "Amazing Ang", contributions: 23}
```
在JSX中，它会这样使用：
```javascript
contributor={{name: "Amazing Ang", contributions: 23}}
```
此外，双层大括号通常用于在JSX元素中传递内联样式（CSS），这些样式以JavaScript对象的形式表示。例如：

```javascript
<div style={{color: 'red', fontSize: '14px'}}>样式化文本</div>
```
此外，在 JSX 元素中將內嵌樣式 (CSS) 作為 JavaScript 物件傳遞時，通常會使用雙大括號。例如：

```javascript
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'white',
      color: 'black'
    }}>
      <li>Retrieve hacked funds from the Dark Forest</li>
      <li>Attend PKU Blockchain Fireside chat</li>
      <li>Send an update to WTF Academy Discord</li>
    </ul>
  );
}
```
![4-4](./img/4-4.png) 

# 還有什麼？

您也可以將一個物件放在另一個物件中，並使用大括號來引用它們，如下所示：

```javascript
import './App.css';

const avatar = {
  name: "Amazing Ang",
  theme: {
    backgroundColor: "black",
    color: "white"
  }
};

export default function TodoList () {
  return (
    <div style={avatar.theme}>
      <h1>{avatar.name}&apos;s Todos</h1>
      <img
className="avi"
        src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        alt="Amazing Ang"
        />
        <ul>
      <li>Retrieve hacked funds from the Dark Forest</li>
      <li>Attend PKU Blockchain Fireside chat</li>
      <li>Send an update to WTF Academy Discord</li>
    </ul>
  </div>
);
}
```
![4-5](./img/4-5.png) 

在上面的例子中，`avatar` 对象包含一个 `name` 字符串和一个 `theme` 对象。

# 总结

在本次讲座中，我们探讨了 JSX 语法；如何传递字符串，使用单大括号和双大括号，以及如何将一个对象嵌套在另一个对象中。

# 练习

花一些时间来拆解代码，看看哪些部分能正常工作以及为什么能正常工作。如果你遇到了问题，不要气馁，这正是学习的过程。继续加油！
