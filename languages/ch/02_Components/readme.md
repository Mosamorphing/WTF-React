# WTF React 極簡教學：2. 元件

WTF React 教學可以幫助新手快速入門 React。

**WTF Academy社群**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) **編譯者**：[@Mofasasi](https://twitter.com/mofasasi)

---

# 什么是组件？

在 React 中，组件是可重用的代码块，代表用户界面(UI)的一部分。组件是 React 应用程序的基本单元，通过将复杂的 UI 分解为更小、更易管理的部分，使创建、管理和维护复杂 UI 变得更为简单。

使用 React 组件的主要优势之一是它们促进了代码的重用。通过为 UI 的不同部分（如按钮、表单或导航栏）创建组件，开发人员可以在应用程序的多个部分重复使用这些组件。这不仅节省了时间和精力，还促进了应用程序外观和感觉的一致性。

# #組件分解

```javascript
function Contributors () {
  return (
    <img
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  )
}
```

1. `function` 前缀用于定义组件。例如，上述组件定义为 `Contributors`。

2. React 的 JSX 语法结合了 HTML 标签的简洁性和 JavaScript，使您能够轻松创建组件，例如包含属性的 `<img />` 标签。

```javascript
  return (
    <img
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  )
```
![2-2](./img/2-2.png) 

# 复用组件

1. 为了复用上述组件，我们使用 `export default` 关键字来导出该函数。这样我们就可以在其他组件中轻松地导入和使用它。

在下面的例子中，`Contributors` 组件在 `Catalogue` 组件中被复用了，共包含了4个 `Contributors` 组件。

```javascript
function Contributors() {
  return (
    <img
      src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      alt="Amazing Ang"
    />
  );
}

export default function Catalogue() {
  return (
    <section>
      <h1>WTF Academy Top Contributors</h1>
      <Contributors/>
      <Contributors/>
      <Contributors/>
      <Contributors/>
    </section>
  );
}
```
![2-1](./img/2-1.png) 

换句话说，`Catalogue` 是一个父组件，而 `Contributors` 是一个子组件。

# 导出和导入组件

假设你想重新设计应用程序的首页，使其显示 WTF Academy 提供的课程列表，而不是主要贡献者列表。将像 `Contributors` 和 `Catalogue` 这样的组件从主组件中分离出来是一个明智的选择。你可以通过以下步骤来完成这些组件的分离：

1. 创建一个新的 JSX 文件来存放现有的组件。
2. 从新文件中导出你的函数组件（可以使用 `default` 或 `named` 导出）。
3. 在需要使用该组件的文件中导入它（通常是你的根组件文件）。

![2-3](./img/2-3.png) 

注意：现在在 `Catalogue.jsx` 文件中定义的 `Contributors` 组件仅在该文件中使用，并且没有导出，而 `Catalogue` 组件则被导出了。
同时，`App.jsx` 从 `Catalogue.jsx` 中导入了 `Catalogue` 组件，并将根组件 `App` 作为默认导出。

但是，如果你想从同一个文件中导出和导入多个组件呢？这可以通过使用默认导出（default export）和命名导出（named export）来实现。不过，一个文件只能有一个默认导出，但可以有多个命名导出。让我们来看一下具体操作方法：

以上面的代码为例，假设我们想在 `App.jsx` 中导入 `Contributors` 组件。

1. 我们需要确保在 `Catalogue.jsx` 文件中导出 `Contributors` 组件（这将成为我们的命名导出，而 `Catalogue` 组件继续作为默认导出）。
2. 在 `App.jsx` 文件中，我们使用花括号来导入这个命名导出，如下所示：

```javascript
import { Contributors } from './Catalogue';
```

3. 在 App.jsx 组件中渲染 Contributors 组件

```javascript
export default function App() {
  return (
    <Contributors/>
  );
}
```
![2-4](./img/2-4.png) 

尝试在本地主机上渲染 `<Contributors/>` 和 `Catalogue`，对比它们的效果。

# 总结

在本次教程中，我们介绍了 React 的一个核心概念：组件。我们详细讨论了如何拆分组件以及如何重用它们。我们还介绍了如何导出、导入组件，并在其他组件中嵌套使用它们。
