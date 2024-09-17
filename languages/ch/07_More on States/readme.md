下面我们将学习如何使用状态来存储输入字段的值——这是每个应用程序都需要的功能，无论是用于身份验证还是收集用户数据。让我们直接开始吧！

# 1. 导入和初始化状态

与前一讲一样，首先需要导入并初始化状态。

```javascript
import { useState } from "react";

import "./App.css";

const SimpleForm = () => {
  const [form, setForm] = useState({ firstName: "", email: "" });

  return <></>;
};

export default SimpleForm;
```

在这里，我们创建了一个名为 `form` 的状态，并使用一个名为 `setForm` 的设置函数来更新它。表单的初始值是一个包含 `firstName` 和 `email` 的对象。

# 2. 创建一个 Change 处理函数

如果你熟悉原生 JavaScript，你会知道处理表单可能会有点棘手。一个 change 处理函数可以简化状态变化的管理。看看它在这里是如何工作的：

```javascript
import { useState } from "react";

import "./App.css";

const SimpleForm = () => {
  const [form, setForm] = useState({ firstName: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log("当前表单的值是", form);

  return (
    <div className="body__container">
      <p>表单</p>
      <input
        placeholder="请输入你的名字"
        className="input__field"
        type="text"
        name="firstName"
        value={form?.firstName}
        onChange={handleChange}
      />
      <input
        placeholder="请输入你的邮箱地址"
        className="input__field"
        type="email"
        name="email"
        value={form?.email}
        onChange={handleChange}
      />
    </div>
  );
};
export default SimpleForm;
```

![7-1](./img/7-1.png)

![7-2](./img/7-2.png)

我们刚刚完成了以下步骤：

1. 编写了一个事件处理函数，用于跟踪用户在输入字段中键入的每个字符。我们通过使用扩展运算符 (`...`) 来展开当前表单值，从而实现这一点。

2. 由于需要管理多个值（如 `firstName` 和 `email`），我们使用 `e.target.name` 来获取输入字段的 `name` 属性（即 `firstName` 或 `email`），从而相应地更新状态对象。

```javascript
setForm({
  ...form, // 保留现有表单数据
  [e.target.name]: e.target.value // 更新键入的字段
});
```

_**Name**_ 是输入字段的一个属性，用于标识输入字段，并将其与状态对象中的对应属性关联起来。

_**Value**_ 表示输入字段的当前内容。在 React 中，输入值由状态控制，这意味着它源自状态变量，并随着状态变化而更新。例如，`firstName` 的初始值是一个空字符串，当用户键入时，该值通过 `handleChange` 函数更新，确保输入字段始终反映当前状态。

_**handleChange**_ 是一个事件处理函数，每当输入字段的值发生变化时触发。它用新的用户输入更新状态，并分配给输入字段的 `onChange` 事件，从而实现实时更新。

3. 我们通过在控制台记录表单数据，确保一切正常工作。

请注意，当 React 应用程序重新加载时，状态会重置为默认值，因为 React 在客户端运行。这意味着在页面重新加载后，React 会以新的状态信息重新启动，除非通过浏览器存储、服务端渲染或状态管理库等方法显式地持久化和恢复状态。

最后，让我们介绍如何使用状态更新数组。这很简单：

1. 导入并初始化状态（你现在应该已经熟悉这一点）。
2. 将状态的初始值设置为一个数组。这个数组可以是一个空数组，也可以包含字符串、数字或对象。为了简单起见，我们将使用字符串数组。

```javascript
import { useState } from "react";

import "./App.css";

const Example = () => {
  const [fruits, setFruits] = useState(["apple"]);

  <div className="body__container">
    <div className="fruit">
      {fruits.map((fruit, index) => (
        <p>
          {index + 1}. {fruit}
        </p>
      ))}
    </div>
    <button className="button">Add my favourite fruit</button>
  </div>;
};
```

![7-3](./img/7-3.png)

在这里，我们使用了 `map` 方法遍历 `fruits` 数组并返回其中所有水果的列表。如果你熟悉原生 JavaScript，那么你应该已经对 `map` 方法很了解了。

要更新 `fruits` 数组，我们使用 `setFruits` 这个设值函数。

```javascript
import { useState } from "react";

import "./App.css";

const Example = () => {
  const [fruits, setFruits] = useState(["apple"]);
  const updateFruits = () => {
    const myFavFruit = "pineapple";
    setFruits([...fruits, myFavFruit]);
  };

  return (
    <div className="body__container">
      <div className="fruit">
        {fruits.map((fruit, index) => (
          <p>
            {index + 1}. {fruit}
          </p>
        ))}
      </div>
      <button className="button" onClick={updateFruits}>
        Add my favourite fruit
      </button>
    </div>
  );
};
export default Example;
```

![7-4](./img/7-4.png)

在这里，我们通过在数组中添加我们最喜欢的水果来更新 `fruits` 列表。我们使用了 `updateFruits` 函数，它扩展了现有的水果数组，并将我们最喜欢的水果添加到列表的末尾。

状态的另一个常见用途是处理布尔值，比如根据用户偏好切换密码字段的显示或隐藏。你会发现自己在很多情况下都会频繁使用这种技术。

```javascript
import { useState } from "react";

import "./App.css";

const SimpleForm = () => {
  const [password, setPassword] = useState("");
  const [showField, setShowField] = useState(false);

  return (
    <div className="body__container">
      <div className="flex">
        <input
          placeholder="Enter your password"
          className="input__field"
          type={showField ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p onClick={() => setShowField(!showField)}>
          {showField ? "Hide" : "Show"}
        </p>
      </div>
    </div>
  );
};
export default SimpleForm;
```

![7-5](./img/7-5.png)

![7-6](./img/7-6.png)

![7-7](./img/7-7.png)

在上面的例子中，我们使用了两个状态：一个保存密码值，另一个控制密码的可见性。当点击“SHOW”或“HIDE”按钮时，`showField`状态在`true`和`false`之间切换。这个点击操作会将状态反转，然后我们根据当前的`showField`状态来渲染“SHOW”或“HIDE”按钮。

为了控制输入框的可见性，我们将输入框的`type`属性设置为“password”或“text”。`type="password"`用于隐藏输入值，而`type="text"`则显示输入值。这样可以在显示和隐藏密码之间自由切换。

这个概念虽然简单，但通过实践不同的场景，你会更好地理解它。

# 总结

在这节课中，我们探讨了如何使用状态来管理和更新复杂的值，并学习了状态 Hook 的实际应用。

# 练习

创建一个包含名、姓、电子邮件、密码和确认密码字段的表单。尝试运行它，观察其效果。接着，创建一个可以添加多个项目的列表——尝试添加两个甚至三个项目，看看它的运行情况。
