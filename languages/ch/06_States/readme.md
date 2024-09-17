# WTF React 極簡教學：6. React 狀態

《React初学者指南》帮助新手快速掌握React。 

**WTF Academy社群**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) **編譯者**：[@adedigggba](https://twitter.com/adedigggba)

---

# React 状态管理

什么是 React 中的状态？状态是在组件内管理和跟踪动态数据的方式。可以将其视为组件随时间维护和更新的一种特殊数据。为了更好地理解，可以想象你在原生 JavaScript 中如何使用变量来保存会变化的值。

例如，如果您的計數從 0 開始，並且您希望在使用者點擊按鈕時將其更新為 1，那麼您通常會編寫以下內容：

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

這裡的increment函數每次觸發時都會將計數增加1。但是，它不會改變 UI。若要變更 UI，您必須透過以下方式更新 DOM：

```javascript
document.getElementById(
  "countDisplay"
).innerText = `You clicked ${count} times`;
document.getElementById("incrementButton").addEventListener("click", increment);
```
在 React 中，状态对高效更新 UI 组件至关重要。同样重要的是理解 **Hooks** 的概念。

Hooks 是一些特殊函数，允许你在函数组件中使用状态和其他 React 特性。在 Hooks 出现之前，这些特性只能在类组件中使用。Hooks 使得在函数组件中管理状态和副作用变得更容易，从而使代码更加简洁和易于维护。所有的 Hook 都以 "use" 开头，例如 `useState`、`useEffect`、`useContext` 等等。

以下是它们的工作原理：

# 1. 导入 `useState`

对于状态管理，我们使用 useState 这个最常用的 Hook。以下是导入它的方法：

```javascript
import { useState } from "react";
```

从 React 版本 17 开始，你在使用 JSX 的文件中不再需要显式从 'react' 导入 React。这意味着你可以直接使用 JSX 而无需导入 React。然而，如果你使用的是早于 17 的 React 版本，你仍然需要与 `useState` 一起导入 React，如下所示：

```javascript
import React, { useState } from "react";
```

到这里，你已经成功导入了 useState 了！这是一个很好的开始！

# 2. 初始化状态

我们可以如下初始化状态（以计数器为例）：

```javascript
const [count, setCount] = useState(0);
```

这里，我们将 `count` 的初始值设为 0。`count` 变量保存当前的状态值，而 `setCount` 是用于更新该状态的函数。这意味着如果我们想要增加 `count` 的值（从 0 开始），我们将使用 `setCount`。

接下来是更新状态：

### 3. 更新状态

这是我们在响应某个动作或事件时需要做的事情。例如，如果我们想要每次点击“Increment”按钮时将计数增加 1，我们会这样写：

```javascript
const increment = () => {
  setCount(count + 1);
};
```

通过这种方式，我们便可以在函数组件中高效地管理状态。

我们的代码现在看起来是这样的：

```javascript
import { useState } from "react";

const SimpleCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <p>当前计数为 {count}</p>
      <button onClick={increment}>递增</button>
    </>
  );
};

export default SimpleCounter;
```

![6-1](./img/6-1.png)

然后我们点击了按钮，结果如下：

![6-2](./img/6-2.png)

每次点击递增按钮时，屏幕上的计数会立即增加。使用 `setCount` 可以确保 React 感知到变化并相应地重新渲染组件。当调用 `setCount` 时，React 会自动重新渲染组件并更新 `<p>` 元素中显示的计数值。

就像我们在这里更新一个数字一样，状态设置函数也可以操作字符串、对象，甚至数组。

你可能会想，这如何应用于实际的应用程序，因为没有人愿意使用一个仅通过按钮点击来增加数字的应用程序。这将引导我们了解状态的更实际和强大的用途，我们将在下一课中探讨。

# 总结

在本课中，我们学习了什么是钩子以及最常用的钩子是什么。我们还研究了如何使用状态来存储和更新计数器。

# 练习

首先设置一个空字符串的状态。然后，通过将其赋值为你的名字来更新状态。动手试一试吧！
