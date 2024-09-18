# WTF React 极简教程：12. React Router

WTF React 教程帮助新手快速入门 React。

**WTF Academy 社区**：[官方网站 wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**：[ @WTFAcademy\_](https://twitter.com/WTFAcademy_) | 编译者 [@Mofasasi](https://twitter.com/mofasasi)

---

React Router DOM 是一个流行的 JavaScript 库，用于管理 React 应用中的客户端路由。它使得单页应用（SPA）可以拥有多个路由，用户能够在不同页面之间导航而无需重新加载整个页面。与传统的服务器端路由不同，服务器端每次都会发送新的 HTML 页面，而客户端路由则保持初始的 HTML 加载，根据用户操作动态更新内容。这种方法通常更适合现代 Web 应用。

首先，通过以下命令安装 React Router DOM：

```javascript
npm i react-router-dom
```

接下来，可以在你的 `src` 目录下创建一个 `pages` 文件夹。这不是强制的，但有助于组织代码库，尤其是协作项目。建议将不同功能模块放在不同的目录中，如 `pages`、`components` 等。

例如，在 `src` 文件夹中创建一个名为 `pages` 的文件夹，并在其中为应用的每个页面创建对应的组件文件。例如，结构可能是 `src > pages > ProfilePage`。

在你的主文件（常见为 `index` 文件）中，按以下步骤进行设置：

1. 配置 `BrowserRouter` 并定义初始路由。这将为你的应用启用客户端路由。

```javascript
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />, // 这里的 element 表示我们希望在页面上显示的内容，即我们之前创建的 Profile Page。
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

![12-1](./img/12-1.png)

![12-2](./img/12-2.png)

默认情况下，斜杠 (`/`) 代表主页，你可以为不同的路由定义组件，比如主页和 `ProfilePage`（对应 `/profile` 路径）。

我们在 `ReactDOM.render` 内部包裹的 `RouterProvider` 说明我们已经将路由逻辑交给了 React Router。这个设置让 React Router 来决定每个 URL 应该渲染哪个组件。

```javascript
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} /> -- 注意这一行，我们现在已经
    将应用程序的入口控制权交给了 React Router。很酷吧？
  </React.StrictMode>
);
```

`RouterProvider` 是基于我们在上一课讨论的上下文 API 构建的。

通过这种设置，你已经成功为你的 web 应用实现了一个路由系统。你可以通过手动更改 URL 来导航到 `/profile` 并查看个人资料页面。你还可以通过创建具有各自路径和组件的新路由来添加更多页面。

如果你手动输入一个不存在的 URL，比如 `/users`，这时 `errorElement` 就会生效。你应该创建一个 404 页面（如果你设计了的话），并在路由配置中将其指定为 `errorElement`。像这样更新你的路由配置：

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>哎呀，你访问了一个不存在的页面</div>,
  },
]);
```

添加错误元素之前：
![12-3](./img/12-3.png)

添加错误元素之后：
![12-4](./img/12-4.png)

你应该在这里添加自己的组件，而不仅仅是一个 `div`（为了关注点分离）。建议包含一个按钮，指引用户到平台上存在的页面，通常是主页。为此，我们使用 React Router 提供的 `Link` 组件。

你可能会问为什么不使用 HTML 的锚标签 (`<a>`)。原因是点击 `Link` 不会触发整个页面刷新，而锚标签会。使用 `Link` 可以确保只更新必要的内容，而不重新加载整个页面。以下是如何使用 `Link` 的示例：

```javascript
import { Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: (
      <div className="container">
        <p>哎呀，你访问了一个不存在的页面</p>
        <Link to="/">返回首页</Link>
      </div>
    ),
  },
]);
```

![12-5](./img/12-5.png)

点击 `Link` 后，用户将被重定向到主页或 `to` 属性中指定的页面。`to` 属性的功能类似于锚标签中的 `href`。

# 动态路由

有时候，你可能需要为不同的数据集渲染同一个视图。例如，一个个人资料页面可能会显示用户列表，点击一个用户会进入该用户信息的详细视图。要实现这一点，你可以使用动态路由。

在 React Router 中，动态路由允许你创建匹配 URL 中特定段变量值的路由。这是通过在路径模式中使用冒号 (`:`) 来表示动态段来实现的。

这是一个例子：

```javascript
import { Link } from "react-router-dom";

function ProfilePage() {
  const users = [
    {
      id: 1,
      name: "User One",
    },
    {
      id: 2,
      name: "User Two",
    },
    {
      id: 3,
      name: "User Three",
    },
  ];

  return (
    <div className="container">
      {users.map((user) => (
        <Link to={`/profile/${user.id}`} key={user.id}>
          我的名字是 {user.name}
        </Link>
      ))}
    </div>
  );
}
export default ProfilePage;
```

在 `main.jsx` 中，你需要在路由器中创建一个新路由来处理每个用户的个人资料。这个路由将使用动态路径来匹配基于用户 ID 的个人用户资料。

```javascript
import UserDetails from './pages/UserDetails'
const router = createBrowserRouter([
    // 其他路径在这里
  {
    path: "/profile/:userId", // 注意，这里的 userId 可以是任何名称，例如 profileId 或 id，只要能解释嵌套路径的含义即可。
    element: <UserDetails />, // 你链接到的页面。
  },
```

![12-6](./img/12-6.png)

通过这种设置，访问用户的个人资料并获取该用户的特定数据变得更加简单。你现在可以直接使用 `useParams` 钩子从 URL 中获取 `id`，这简化了基于动态 URL 段获取和显示用户特定数据的过程。

```javascript
// 显示详细用户信息并被链接到的页面。
import { useParams } from "react-router-dom";
function UserDetails() {
  const params = useParams();
  console.log("params are", params); // 这样做是为了查看 params 返回的内容
  return (
    <div className="container">
      欢迎来到我的个人资料，我的 ID 是 {params.userId}
    </div>
  );
}
export default UserDetails;
```

对于你尝试匹配的每一个路径，路由都会起作用。例如，访问 `/profile/28` 或 `/profile/avshaudgadhadagdgadgad` 都是有效的。`useParams` hook 会返回 `id`，这允许你进行数据获取，比如对 API 端点进行 GET 请求。你可以使用 `useEffect` 实现这一点，或者使用像 React Query 这样的外部库来简化数据获取和管理。

请看以下 URL 是如何与 UI 上渲染的内容进行匹配的：

![12-7](./img/12-7.png)

```javascript
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const { userId } = useParams(); // 这里我们从 useParams 解构出 userId，等同于 const params = useParams() 然后使用 params?.userId
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{user?.name}</h2>
        </div>
      )}
    </div>
  );
}
export default UserDetails;
```

这是一个在 Web 应用程序中使用动态路径的典型示例。

# 总结

在本课中，我们介绍了如何创建路由、在路由间导航以及处理动态路径。我们讨论了为什么 `Link` 比锚标签更优，以及如何使用 `useParams` 根据 URL 中的动态部分来获取数据。

# 练习

在不参考提供代码库的情况下复现这些示例。实现一个交易页面，列出各种交易，并在点击交易后导航到显示所选交易详细信息的页面。这是一个有趣的练习。祝你好运！
