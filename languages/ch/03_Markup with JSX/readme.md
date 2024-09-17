# WTF React 極簡教學：3. 使用 JSX 進行標記

《React初学者指南》帮助新手快速掌握React。 

**WTF Academy社群**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) **編譯者**：[@Mofasasi](https://twitter.com/mofasasi)

---

# 使用JSX标记

HTML是一种标记语言，用于描述和组织文本或数据，使计算机能够处理和显示。HTML通过`标签`来定义元素及其属性。JSX 是 JavaScript 的一种语法糖，允许你在 JavaScript 代码中编写类 HTML 元素。简而言之，JSX 就是可以在 JavaScript 中编写 HTML 的一种方式。

这为什么重要呢？因为 Web 是构建在 HTML 之上的，通过 CSS 进行样式化，并通过 JavaScript 赋予其动态行为。因此，HTML 是 Web 的基石，它承载了内容。而随着 Web 从静态发展到动态，JavaScript 的引入使得网页需要更多的交互性。React 正是应运而生，它允许你在同一个 JSX 文件中编写内容（HTML）和交互性（JavaScript）。

例如，下面是一段简单的 HTML 代码：

```javascript
<h1> Amazing Ang's Todo List </h1>
<img
src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
alt="Amazing Ang"
class="photo"
>
<ul>
  <li> Retrieve hacked funds from the Dark Forest
  <li> Attend PKU Blockchain Fireside chat
  <li> Send an update to WTF Academy Discord
</ul>
```
在 JSX 中重寫它，它變成：

```javascript
import './App.css';

export default function TodoList() {
  return (
<div>
  <h1> Amazing Ang's Todo List </h1>
  <img
  src="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
  alt="Amazing Ang"
  className="photo"
  />
  <ul>
    <li> Retrieve hacked funds from the Dark Forest </li>
    <li> Attend PKU Blockchain Fireside chat</li>
    <li> Send an update to WTF Academy Discord</li>
  </ul>
</div>
);
}
```
![3-1](./img/3-1.png) 

为了在JSX中正确编写HTML，需要满足以下条件：

1. JSX结构必须有一个父元素。
这意味着你的HTML代码必须包含在一个单一的父标签内。从上面的例子可以看到，我们使用了起始标签`<div>`和结束标签`</div>`。你也可以使用`<>`和`</>`来表示一个空的父元素。

2. 使用驼峰命名法
驼峰命名法是一种编程命名风格，在这种风格中，除了第一个单词之外，每个单词的首字母都大写。

在React中使用`className`而不是`class`，这是因为JavaScript和[文档对象模型（DOM）](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)的规定。

在JavaScript中，`class`是一个保留关键字，用于定义类。然而，在HTML中，`class`用于指定元素的CSS类。

当React代码通过JSX编译为JavaScript时，直接使用`class`会与JavaScript的`class`关键字冲突。为了避免这种冲突，React使用`className`来替代`class`。

这样做是为了避免命名冲突，并确保React应用中JavaScript和HTML能兼容。

_趣闻：驼峰命名法得名于大写字母像驼峰一样，类似于骆驼的背。_

# 总结

在本讲座中，我们讨论了在JSX中编写HTML时需要满足的条件，以及如何将HTML转换为JavaScript。
