# WTF React 极简教程：11. 数据获取

WTF React 教程帮助新手快速入门 React。

**WTF Academy 社区**: [官方网站 wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | 编译者 [@Mofasasi](https://twitter.com/mofasasi)

---

通常，前端显示给用户的数据来自后端数据库。由于用户无法直接访问数据库，数据通过后端提供的接口进行传输。在 JavaScript 中，我们使用 Fetch API 来发出这些请求。

## 什么是 Fetch API？

Fetch API 是一种在网页浏览器中进行 HTTP 请求的现代接口。相比传统的 XMLHttpRequest 方法，它提供了更强大和灵活的方式来发送和接收数据。Fetch API 简化了网络请求的制作、响应的处理以及对不同数据格式的处理。它内置于现代浏览器中，因此你不需要任何额外的库来使用它。这意味着你可以直接使用 Fetch API 来获取数据，而无需依赖像 Axios 这样的外部库。它通常用于与 RESTful API 交互、获取资源以及向服务器发送数据。

Fetch API 使用 Promise，使得管理异步操作和链式调用多个请求变得更加容易。其语法简单易用。

下面是一个如何使用 Fetch API 的基本示例：

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

在提供的代码中，我们向 JSON Placeholder 的 posts 接口发出了请求，并期望得到一个响应。接着我们将此响应转换为 JSON 格式。最后，我们将数据记录到控制台，以便在渲染到用户界面之前检查其结构。

以下是一个完整的示例，演示如何使用 Fetch API 和 `useEffect` 在页面加载时从端点获取数据，并在前端渲染这些数据。

```javascript
import { useState, useEffect } from "react";

const Posts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("网络响应不正常");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  return (
    <div>
      {data?.map((post) => (
        <p key={post.id}>
          帖子编号 {post.id}, 标题是 {post.title}
        </p>
      ))}
    </div>
  );
};

export default Posts;
```

![11-1](./img/11-1.png)

上面的代码从端点获取数据，并遍历 posts 数组中的每个帖子对象，显示每个帖子的 ID 和标题。注意段落标签上的 `key` 属性吗？它的重要性如下：

1. **高效的协调**：React 使用协调机制在状态变化时更新 UI。提供唯一的键有助于 React 快速识别哪些元素发生了变化，从而只更新这些元素而不是重新渲染整个列表，提高性能。

2. **防止意外行为**：没有唯一的键，React 可能难以正确更新元素，导致不可预测的 UI 行为。例如，如果一个项目被删除，React 可能不会正确调整剩余的项目。唯一的键在更新期间维护列表的完整性。

3. **兄弟元素间唯一**：键必须在直接的兄弟元素之间唯一。虽然键可以在不同的列表中重复使用，但在单个列表中的每个键必须是独特的，以避免冲突。例如，如果两个对象具有相同的 ID，你将在控制台中收到关于重复键的警告。不传递 key 属性也会触发警告。

Fetch API 满足我们的基本需求，但也有局限性：它不会自动转换 JSON 数据，每次都需要我们手动转换响应。此外，它缺乏对请求取消的内置支持，使得中止正在进行的请求变得困难。错误处理也比较冗长，因为网络错误不会拒绝 Promise。

幸运的是，Axios 是一个可以解决这些限制并提供更强大功能的库。

## 什么是 Axios？

Axios 是一个流行的 JavaScript 库，用于在浏览器和 Node.js 中发起 HTTP 请求。它非常容易使用，并且相比内置方法如 Fetch，提供了多个优势。Axios 基于 Promise，使得异步操作变得简单直接。它的简洁直观的 api 对初学者也非常友好。更重要的是，Axios 会自动转换 JSON 数据，避免了手动解析的麻烦。

Axios 的一个重要功能是 **拦截器**，它允许你在请求或响应被 `then` 或 `catch` 处理之前对其进行修改。例如，如果请求返回了 401 未授权响应码，拦截器可以拦截并处理这种情况，避免后续请求的继续处理。

## 如何使用

要使用 Axios，首先需要安装它，因为它是一个外部库。在命令行中运行以下命令来安装：

```javascript
npm i axios
```

基本用法如下：

```javascript
import axios from "axios";

axios
  .get("https://api.example.com/data")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

这样，如果我们用以下代码替换之前的Posts页面组件，我们将得到相同的效果：

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {data?.map((post) => {
        return (
          <p key={post.id}>
            帖子编号 {post.id}，标题是 {post.title}
          </p>
        );
      })}
    </div>
  );
};

export default Posts;
```

不同之处在于，这种方法比之前的方法更有效率。当然，它还可以进一步优化，这就引导我们使用Axios实例。Axios实例是Axios HTTP客户端的自定义配置，允许你设置可重用的配置来进行HTTP请求。这提高了代码的可维护性和一致性，特别是在处理多个需要特定配置的API或端点时。例如，你可以创建一个名为`api.js`的文件，并按如下方式配置一个Axios实例：

```javascript
import axios from "axios";

// 创建Axios实例
export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// 设置请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log("发送请求:", config.url);
    // 根据需要在这里添加headers、tokens等，例如：
    config.headers.Authorization = `Bearer ${token}`; // token需要从你获取token的地方传递，否则会报错
    return config;
  },
  (error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 设置响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log("收到响应:", response.config.url);
    return response;
  },
  (error) => {
    console.error("响应错误:", error);
    return Promise.reject(error);
  }
);
```

我们可以设置帖子页面，使用Axios实例从提供的`baseURL`获取数据。通常，`baseURL`代表每次发送请求时访问的服务器，你只需指定具体的路由，如下所示：

```javascript
import { useState, useEffect } from "react";
import { api } from "../api";

const Posts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/posts") // 我们想要访问'https://jsonplaceholder.typicode.com/posts'，但因为我们已经设置了基础URL为jsonplaceholder.typicode，所以这里只需指定"/posts"。
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });

    setLoading(false);
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  return (
    <div>
      {data?.map((post) => (
        <p key={post.id}>
          帖子编号 {post.id}，标题是 {post.title}
        </p>
      ))}
    </div>
  );
};

export default Posts;
```

这种方法允许我们创建一个可重用的API配置，避免了重复代码。它简化了开发，使代码更易于维护和优化。

## 总结

虽然Fetch API是一个强大的内置工具，但Axios提供了许多优势，可以提高开发效率，特别是在大型应用程序中。自动JSON转换、改进的错误处理和拦截器等功能有助于编写更干净和更易维护的代码。

## 练习

理解提供的代码和使用实例的目的，然后尝试在应用程序中的不同页面上使用相同的`baseURL`向各种端点发出请求。通过添加加载动画和错误提示来增强你的网页用户体验。此外，随着技能的提升，尝试在不同场景中同时使用Fetch和Axios，以加深理解并有效地在未来项目中应用这些工具。
