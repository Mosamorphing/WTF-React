# WTF React 简明教程：9. React Hooks

WTF React 教程帮助新手快速入门 React。

**WTF 学院社区**: [官方网站 wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | 编译者 [@Mofasasi](https://twitter.com/mofasasi)

---

# 什么是 Hooks？

React Hooks 是一些特殊的函数，允许你在函数式组件中使用 state 和其他 React 功能。它们像是简化工具，帮助你在不使用类组件的情况下轻松添加各种功能。有了 Hooks，你可以仅通过函数创建出色的组件！相比使用类组件的繁琐逻辑，Hooks 让一切更加简洁明了——为什么不试试看呢？

常见的 React Hooks 包括 `useState`、`useEffect`、`useContext`、`useReducer`、`useMemo` 和 `useCallback`。注意所有的 Hooks 都以 "use" 开头，这是 React 的一个约定。即使是你自己创建的自定义 Hooks 也要遵循这个规则，以表明它们符合 Hooks 的使用规范。

# 1. useEffect

React 中的 `useEffect` Hook 是一个强大的工具，它允许你在函数式组件中执行副作用。副作用指的是那些会影响组件范围之外的操作，比如获取数据、更新 DOM、设置订阅或计时器等。

基本语法如下：

```javascript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // 在这里编写副作用代码
  }, [dependencies]);
  return (
    // 用于渲染组件的 JSX
  );
}
```

现在，让我们分解一下上面每个术语的含义：

- **副作用**：在 `useEffect` 的上下文中，副作用指的是在某些条件下执行的代码。例如，当你导航到应用中的某个页面时，从后端获取数据就是一个典型的副作用。这种数据获取通常放在 `useEffect` 钩子中，只会在你访问该页面时执行。我们很快会看到这一点的具体应用。

- **依赖项**：在 `useEffect` 中，依赖项是一个数组，用来控制副作用何时执行。以下是关于依赖项如何工作的简明解释：
  1. 如果不提供依赖项数组，副作用会在每次渲染后执行。
  2. 如果提供一个空数组 `[]`，副作用只会在初次渲染后执行一次。
  3. 如果依赖项数组中包含值（例如，`[prop1, state1]`），副作用会在初次渲染后以及这些依赖项在后续渲染中发生变化时执行。

请牢记这些要点，因为我们接下来会看到它们的实际应用。

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.example.com/users`);
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, []); // 注意这里的空依赖数组

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
export default Users;
```

在这里，我们实现了一个组件，当用户页面加载时，从 API 端点获取用户数据并显示在客户端。由于 useEffect 依赖数组为空，这个 effect 只会在页面加载时运行一次。如果我们传递了依赖数组，每当这些依赖项发生变化时，useEffect 就会重新运行。例如：

```javascript
function User({ id }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.example.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, [id]); // 注意这里的依赖项

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
export default User;
```

在第二个示例中，useEffect 依赖于 id，因此每当 id 发生变化时，useEffect 就会重新运行以获取新的用户数据。

在这里，每当 `id`（作为 prop 传递）发生变化时，都会调用获取数据的端点，通过 `setUser` 更新用户数据，或者如果出现问题则通过 `setError` 设置错误信息。请记住，这个 effect 会在页面第一次加载时运行，并且每次 `id` 变化时都会重新运行，而不仅仅是 `id` 变化时。

你可能会想，如果我们有多个依赖项——也就是说我们希望它基于两个或更多变量运行怎么办？这是完全可以实现的。在这种情况下，我们会将所有依赖项列在一个数组中，用逗号分隔。它看起来像这样：

```javascript
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://api.example.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      setError(error);
    }
  };
  fetchUser();
}, [id, something, anotherThing, anotherExtraThing]);
```

在我们探讨完 `useEffect` 之前，有一个重要的概念需要讨论：清理函数。React 的 `useEffect` 钩子中的清理函数用于在组件卸载之前停止不再需要的副作用。这有助于防止内存泄漏，并确保组件的行为保持一致和可预测。以下是如何使用清理函数的示例：

```javascript
import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    // 清理函数
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div>
      <h2>Timer</h2>
      <p>The count is: {count}</p>
    </div>
  );
}
```

简单来说，清除函数告诉 `useEffect` 钩子在不再需要时“停止”定时器，以防止不必要的渲染和内存泄漏。在上面的例子中，如果你在 `useEffect` 钩子中设置了一个定时器但没有提供清除函数，那么即使组件已经卸载，定时器仍会继续运行。这意味着即便组件已经从屏幕上移除，定时器中的回调函数仍会不断执行。

每次定时器的回调函数被调用时，它都会尝试更新组件的状态（在这个例子中是 `count` 状态）。然而，由于组件已经卸载，React 将无法更新 UI。相反，React 会尝试“重新渲染”组件，即便它已经不可见。这些不必要的重新渲染会导致性能问题，因为 React 需要处理这些多余的更新。这就像在再次使用餐具之前先清洗它们——这正是清除函数的作用。

# 2. `useReducer`

`useReducer` 钩子的工作方式类似于 `useState` 钩子，但更适合管理复杂的状态逻辑。`useReducer` 允许你跟踪多个状态，并以更有组织的方式处理状态变化。它让你定义一个封装了状态更新逻辑的 reducer 函数，使状态管理在你的 React 应用中变得更容易。以下是一个简单的例子，类似于 useState 教程中的计数器例子：

```javascript
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="body__container">
      <p> Count: {state.count}</p>
      <button
        className="button"
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </button>
      <button
        className="button"
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </button>
    </div>
  );
}
```

以下是它的工作原理：

首先，定义一个 reducer 函数，它接受当前状态（初始值）和一个 action 作为参数，并返回下一个状态。reducer 函数应为纯函数。

接着，在你的组件中调用 `useReducer`，传入 reducer 函数和初始状态。代码如下：

```javascript
const [state, dispatch] = useReducer(reducer, { count: 0 });
```

它返回一个包含两个元素的数组：当前状态和一个 dispatch 方法。这类似于 `useState` 返回状态和设置函数：

```javascript
const [counter, setCounter] = useState(0); //但我们这里不讨论 useState，所以不要混淆
```

要更新状态，你使用 dispatch 方法，传入一个具有 `type` 属性的 action 对象来标识要执行的操作。例如：

```javascript
<button className="button" onClick={() => dispatch({ type: "increment" })}>
  +
</button>
```

点击该按钮会触发 `count` 状态的递增。你也可以在 reducer 函数中定义其他操作，比如递减。

你可能会问，为什么要使用 `useReducer` 而不是 `useState`。虽然 `useState` 对于基本的状态管理更简单易懂，但在管理多个状态值或复杂状态逻辑时，`useReducer` 特别有用。它通过集中管理状态逻辑，有助于保持代码的组织性和可维护性。

# 3. `useContext`

在复杂的应用程序中，从祖父组件一层层传递属性到子组件可能会非常繁琐且难以管理。这时，`useContext` 钩子就能派上用场。`useContext` 钩子是 React Context API 的一部分，允许你在组件中读取和订阅上下文数据。通过这个 API，你可以在组件树中传递数据，而无需手动通过每个嵌套组件传递属性。

例如，如果你需要在整个应用中管理用户登录状态或实现明暗模式切换，直接传递属性会非常低效。相反，你可以使用 `useContext` 钩子来简化数据共享，避免“属性传递”。而且最棒的是，你不需要任何外部库就能实现这一点。是不是很棒？我们来看一个例子。

```javascript
// index.js
import React, { createContext, useContext, useState } from "react";

import "./App.css";

const AuthContext = createContext();

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = { isLoggedIn, setIsLoggedIn };
  return (
    <AuthContext.Provider value={value}>
      <App />
    </AuthContext.Provider>
  );
}

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p>用户目前{isLoggedIn ? "已登录" : "未登录"}</p>
      <button
        className="button"
        onClick={() => {
          setIsLoggedIn(!isLoggedIn); // 通常这会是某种登录或注销操作
        }}
      >
        切换状态
      </button>
    </div>
  );
}
export default Index;
```

<Meaning-Based Translation>

<Before Translation>
Here’s what we did:

1. We created a context by calling `createContext` outside of the components. This function returns a context object that represents the kind of information you can provide or read from components.

2. To use the values from the context, you need to wrap your app with the Context Provider. This is done by using the `Context.Provider` component, which allows components within its subtree to access the context. In this case, we used `AuthContext.Provider`, which is obtained from the `createContext` API. This results in something like:
   
```javascript
function Index() {
  const value = { isLoggedIn, setIsLoggedIn };
  return (
    <AuthContext.Provider value={value}>
      <LoginPage />
    </AuthContext.Provider>
  );
}
```

![9-1](./img/9-1.png)
![9-2](./img/9-2.png)

这是我们所做的：

1. 在组件外部调用 `createContext` 创建一个 Context。这个函数返回一个 Context 对象，代表你可以在组件中传递或读取的信息类型。

2. 要使用 Context 中的值，你需要用 Context 提供器包裹你的应用。这是通过使用 `Context.Provider` 组件来实现的，它允许其子树中的组件访问 Context。在这个例子中，我们使用了 `createContext` API 得到的 `AuthContext.Provider`。结果如下：

```javascript
function Index() {
  const value = { isLoggedIn, setIsLoggedIn };
  return (
    <AuthContext.Provider value={value}>
      <LoginPage />
    </AuthContext.Provider>
  );
}
```

![9-1](./img/9-1.png)
![9-2](./img/9-2.png)

`Provider` 组件接受一个名为 `value` 的属性，这个属性会传递给所有属于此 `Provider` 的子组件。这个 `value` 属性应该包含你希望在整个应用中共享的所有状态及其对应的设置函数。例如，在示例中，我创建了一个包含 `isLoggedIn` 和 `setIsLoggedIn` 的常量，使这些值在应用的任何地方都可用。

3. 要在应用的任何地方访问你的状态及其设置函数（例如，`isLoggedIn`, `setIsLoggedIn`），需要引入 `useContext` 和 `AuthContext`。然后，从 Context 中获取状态和设置函数，如下所示：

```javascript
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
```

在更复杂的场景中，你可能会使用 `localStorage` 持久化用户信息，并通过一个状态（例如，USER）来检索它，该状态可以在登录时使用 `setUser` 更新。这些用户数据可以通过引入 Context 在应用的任何地方访问。

# 总结

在这节课中，我们探讨了一些最受欢迎和常用的 React 钩子。虽然这些并不是 React 中所有可用的钩子，但它们涵盖了你在开发过程中会经常使用的核心钩子。

### 练习

尝试不参考提供的代码库来复现这些示例。然后，通过构建一个包含我们迄今为止所学内容的应用来挑战自己。考虑每个钩子的实际应用以及它们如何融入你的项目。如果遇到任何问题，请记住有很多资源可供你参考。
