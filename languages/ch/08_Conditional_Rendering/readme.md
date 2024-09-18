# WTF React 极简教程：8. 条件渲染

WTF React 教程帮助新手快速入门 React。

**WTF Academy 社区**: [官方网站 wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | 编译者 [@mofasasi](https://twitter.com/mofasasi)

---

# 条件渲染

条件渲染是一种技术，可以根据特定条件显示不同的内容。它类似于在 JavaScript 中使用 if-else 语句，但它应用于 JSX 中。以下是一些在用户界面中进行条件渲染的方法：

# 1. 使用三元运算符

三元運算子是編寫簡單 if-else 語句的另一種方法。它的工作原理如下：

```javascript
const Greeting = () => {
  const isLoggedIn = true;

  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}</div>
  );
};

export default Greeting;
```

在这个例子中，我们检查 `isLoggedIn` 是否为真。如果是，我们显示“欢迎回来！”；否则，我们显示“请登录。”逻辑是这样的：跟在 "?" 后面的元素在条件为真时显示，而 ":" 后面的元素在条件为假时显示。所以，你可以这样理解：如果 `isLoggedIn` 为真（?），显示“欢迎回来！”；但如果它为假（:），显示“请登录”。

# 2. 使用 && 运算符

对于更简单的条件，如果你想渲染某个元素或不渲染任何东西——这意味着你要么渲染一个元素，要么什么都不显示——你可以使用 `&&` 运算符。它的工作原理如下：

```javascript
const Notification = () => {
  const hasNewMessages = true;
  return <div>{hasNewMessages && <p>你有新消息！</p>}</div>;
};

export default Notification;
```

这段代码只有在 `hasNewMessages` 为真时才会渲染段落，否则界面上将没有任何显示。

# 3. 使用状态进行条件渲染

让我们结合之前学到的状态管理知识，来实现条件渲染：

```javascript
import { useState } from "react";
import "./App.css";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="container">
      <button onClick={toggle}>
        {isOn ? "Turn Off" : "Turn On"} the light
      </button>
      {isOn && <p>The light is currently ON!</p>}
    </div>
  );
};

export default ToggleButton;
```

![8-1](./img/8-1.png) ![8-2](./img/8-2.png)

在这个例子中，我们使用状态来跟踪按钮的开启或关闭状态，并根据状态来条件渲染按钮文本和附加消息。

另一个条件渲染的常见用例是从API获取数据时。你需要处理加载状态、错误状态，并在数据成功获取后渲染组件。条件渲染也可以应用于`className`属性，使你可以根据特定条件动态应用样式类。下面是一个示例：

```javascript
import React, { useState } from "react";
import "./App.css";

const ConditionalClassExample = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="container">
      <p
        className={`default ${isActive ? " active_bg" : "inactive_bg"}`}
        onClick={toggleActive}
      >
        {isActive ? "Active" : "Inactive"}
      </p>
    </div>
  );
};

export default ConditionalClassExample;
```

![8-3](./img/8-3.png) ![8-4](./img/8-4.png)

在这个例子中，我们根据状态动态应用不同的CSS类，使元素样式随状态改变。

### 解释

在上面的例子中，类名 `"default"` 被用作基础样式类，不论 `isActive` 状态如何，它都会一直存在。这个基础样式类提供了默认的样式。条件部分 `${isActive ? "active_bg" : "inactive_bg"}` 则负责动态样式修饰。它会根据 `isActive` 状态来决定应用 `"active_bg"` 还是 `"inactive_bg"`。这样，动态样式就可以在基础样式 `"default"` 的基础上进行补充，从而实现特定状态下的样式应用。

### 总结

在本次讲座中，我们介绍了 React 中几种常见的条件渲染方法，包括使用三元运算符、逻辑与运算符，以及将条件渲染与状态结合起来的方法。请记住，在实际项目中，你可能会遇到更复杂的场景。比如，在从接口获取数据后，你可能需要根据某个条件的真假来决定渲染哪个组件。

### 练习

创建一个显示项目列表的组件。当没有项目时，使用条件渲染显示消息“列表为空”；当有项目时，显示实际列表。使用 `useState` 钩子来管理项目列表。
