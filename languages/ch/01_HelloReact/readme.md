# WTF React 极简教程：1. 初识 React

《React初学者指南》帮助新手快速掌握React。 

**WTF Academy社群**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) **編譯者**：[@Mofasasi](https://twitter.com/mofasasi)

---

## 什么是React？

React是一个用于构建用户界面的JavaScript库。由Facebook开发并维护，旨在帮助开发者创建大型的、数据变化频繁的Web应用，而无需重新加载页面。通过引入组件的概念，React使开发者可以将复杂的UI拆分成独立且可重用的小块，每个组件都可以独立处理其状态和逻辑。这不仅提高了代码的可维护性，还提升了开发效率。此外，React的虚拟DOM机制大大优化了网页性能，因为它只更新实际改变的部分，而不是整个页面。总之，React是现代前端开发中不可或缺的重要工具。

## React 的发展历史

React 的开发始于 2010 年，由 Facebook 的软件工程师 Jordan Walke 负责。他的目标是创建一个库，简化构建复杂用户界面（UI）的过程，使开发者能够创建可重用的 UI 组件。

Walke 的原型最初被称为“FaxJS”，灵感来源于 Facebook 的 XHP，这是一个用于 PHP 的 HTML 组件库。随着 Facebook 的不断发展及其网络应用变得日益复杂，对更高效的 UI 开发工具的需求变得越来越明显。

在 2011 年，Facebook 公开发布了 XHP，展示了使用基于组件的方法构建 UI 的潜在优势。这为 Walke 在 JavaScript 库上的工作提供了重要的概念验证，最终这个库演变成了 React。

2013 年，Facebook 将 React 作为开源项目首次发布在 GitHub 上。由于其易用性和高效管理复杂 UI 更新的方法，该库迅速在开发者中流行起来。React 的虚拟 DOM 技术使开发者能够构建动态 UI，而无需直接操作浏览器的实际 DOM，从而实现更快、更高效的渲染。

## 学习React的好处

学习React可以为开发人员提供广泛的机会，并为构建现代化、动态且高效的用户界面打下坚实基础，适用于各种平台和设备。以下是一些学习React的主要原因：

组件的重用性：React鼓励开发模块化和可复用的UI组件，这不仅能节省开发时间，还能使代码库更加有条理。

高效的DOM更新：React的虚拟DOM允许开发人员只渲染改变的UI部分，从而高效地更新组件。这种方式减少了DOM操作，使渲染速度更快，用户体验更流畅。

完善的生态系统：React由一个充满活力的社区支持，并拥有广泛的库、工具和框架生态系统。开发人员可以利用大量资源、教程和包，加快开发速度，提高开发效率。

市场需求量大：React是前端开发中最受欢迎的技术之一，市场需求量很大。掌握React技能的开发人员在公司中备受青睐，拥有众多工作机会和高薪潜力。

## 开发工具

[VS Code](https://code.visualstudio.com/) 是目前最受欢迎的代码编辑器之一。它非常灵活，用户可以添加 JSX 和 TypeScript 支持、语法高亮、自动补全等功能。

其他受欢迎的 React 开发工具还有 [WebStorm](https://www.jetbrains.com/webstorm/)、[Sublime Text](https://www.sublimetext.com/)、[Code Pen](https://codepen.io) 和 [Vim](https://www.vim.org/)。每款工具都有其独特的特点，能够帮助高效开发 JavaScript。

# 使用 [Code Pen](https://codepen.io) 进行演示

```javascript
<div id="root"></div>

<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

<script>
  const hello = React.createElement("h1", {}, "Hello React");
  ReactDOM.render(hello, document.getElementById("root"));
 </script>
```
![1-1](./img/1-3.png) 

通过在 CodePen 的 JS 设置中添加脚本，我们可以使代码更加简洁，从而获得更好的编码体验。

```javascript
<div id="root"></div>
const hello = React.createElement("h1", {}, "Hello React");
  ReactDOM.render(hello, document.getElementById("root"));
```
![1-1](./img/1-6.png) 

在接下来的步骤中，我们将使用 VS Code，但首先，你需要在电脑上安装 [Node.js](https://nodejs.org/zh-cn/download/)，这样才能确保后续的安装命令正常运行。

# 安装步骤

1. 打开终端，在电脑的某个文件夹内安装 Vite。（注意：这里我们把文件夹命名为 `wtf-react`）
```
npm create vite@latest wtf-react
```
2. 选择使用 `React` 框架
3. 选择 `JavaScript` 的变体

![1-1](./img/1-1.png)

4. 打开刚创建的新文件夹
```
cd wtf-react
```

5. 如何在VSCode中打开文件夹
```
code .
```
![1-1](./img/1-2.png)

6. Open your VS Code terminal and install the dependencies
```
npm install
```

7. Open up local host to preview your code
```
npm run dev
```
![1-1](./img/1-4.png)

复制并粘贴本地主机链接到浏览器中，您会看到以下页面: 

![1-1](./img/1-5.png)

# 概要

在第一节课中，我们先介绍了React是什么以及学习它的理由。随后，我们讲解了React的开发工具，并在一个在线网页编辑器中编写了我们的第一段React代码“Hello React”。最后，我们在VS Code中设置了开发环境。接下来，让我们继续我们的React学习之旅！
