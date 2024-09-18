# WTF React 极简教程：10. 更多 Hook

WTF React 教程帮助新手快速入门 React。

**WTF Academy 社区**: [官方网站 wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | 编译者 [@mofasasi](https://twitter.com/mofasasi)

---

正如我们在之前的课程中讨论的那样，钩子函数（Hook）彻底改变了 React 开发，尤其是对函数组件而言。它们使我们能够在函数组件中管理状态、生命周期方法和其他 React 特性，而这些特性以前只能在类组件中使用。

在本课中，我们将探索更多的 Hook。

# 1. `useRef`

React 中的 `useRef` Hook 允许你创建一个可变的 ref 对象，该对象在组件的整个生命周期内保持不变。与状态不同，更改 ref 对象的值不会触发组件的重新渲染。这使得 ref 非常适合存储一些不直接影响 UI 但需要在组件中访问的值。

以下是使用 `useRef` 的基本语法：

```javascript
import { useRef } from "react";

function MyComponent() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}
```

在这个例子中，我们使用 `useRef(null)` 创建了一个名为 `inputRef` 的 ref 对象。然后我们通过 `ref` 属性将这个 ref 分配给 input 元素。这允许我们在组件中直接访问 input 元素的 DOM。如图所示，`useRef` 可以用于直接操作 DOM 元素，适用于手动聚焦元素、测量元素大小或执行其他直接操作 DOM 的任务。

`useRef` 相较于 `useState` 的另一个优势是，虽然状态更新会触发组件重新渲染，但 `useRef` 允许你存储不会导致重新渲染的值。这使得 `useRef` 非常适合存储需要在渲染之间保持但不影响 UI 的数据，例如之前的值或对象引用。此外，很多第三方库通常需要 DOM 元素的引用作为 props，而 `useRef` 是创建这些引用的理想工具。


例如：
```javascript
import React, { useRef, useEffect } from "react";
import Chart from "third-party-chart-library"; // 这是一个假设的库

function MyChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {});

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: "400px", height: "300px" }} />;
}

export default MyChart;
```

你可以看到，计划是初始化一个 ref，进行必要的操作，然后在需要时将 ref 作为 prop 传递。`useRef` 在一些场景中也很有用，比如当某些状态变化时，你希望滚动到顶部。例如，在多步骤表单中切换不同阶段时，你可能希望滚动到模态框的顶部。可以使用如下函数实现：

```javascript
export const handleScrollToTop = (div) => {
  div.current.scrollTop = 0;
};

//然后在你的组件中使用它
useEffect(() => {
  handleScrollToTop(modalRef);
}, [showModal]); // 或者根据你的依赖数组。

return (
  <ModalContainer showModal={showModal} closeModal={closeModal}>
    <div ref={modalRef}>你的多步骤模态框内容在这里</div>
  </ModalContainer>
);
```

在上面的示例中，我们创建了一个可复用的函数 `handleScrollToTop`，它接收一个 `div` 作为参数。然后在组件挂载时使用这个函数。具体来说，每当 `showModal` 变化时，我们希望模态框的内容滚动到顶部。这样可以确保每次打开模态框时都从顶部开始，而不是保留之前的滚动位置，这样用户体验会更好——想象一下，当用户向下滚动后关闭模态框，再次打开时从顶部开始，这通常更直观。

# 2. useMemo

`useMemo` 是一个 React Hook，用于记住计算结果。也就是说，它会记住函数的返回值，只有当依赖项变化时才重新计算。这对于处理不需要每次渲染都重新计算的耗时操作时非常有用，可以优化性能。

以下是 `useMemo` 的简单用法：

```javascript
import { useMemo, useState } from "react";

function ExpensiveComponent({ data }) {
  const [count, setCount] = useState(0);

  // 耗时的计算放在这里
  const filteredData = useMemo(() => {
    return data.filter((item) => item.value > count);
  }, [data, count]);

  return <div>{/* 渲染过滤后的数据 */}</div>;
}
```
在这个例子中，我们确保 `filteredData` 不会在每次渲染时都重新计算。相反，只有当 `data` 或 `count` 发生变化时，才会重新计算。这是通过使用 `useMemo` 钩子函数实现的。通过缓存 `filteredData`，React 避免了不必要的重新计算，从而优化了性能，尤其是在处理高计算开销的情况下。

`useMemo` 和 `useCallback`（我们将在下一部分讨论）都用于优化 React 应用的性能。`useMemo` 缓存计算结果，而 `useCallback` 缓存回调函数。这防止了依赖这些值或函数的组件发生不必要的重新渲染。

# 3. useCallback

`useCallback` 与 `useMemo` 类似，但它缓存的是回调函数而不是值。这对于避免传递回调函数作为属性的子组件发生不必要的重新渲染非常有用。

这里有一个简单的例子：

```javascript
import { useCallback, useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存 handleClick 函数
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>点击我</button>;
}
```

在这个例子中，`handleClick` 函数只会在 `count` 发生变化时重新创建，从而避免了 `Child` 组件的无谓重新渲染。

在这个例子中，使用 `useCallback` 对 `handleClick` 进行了缓存。这意味着只有当 `Child` 组件自身的 props 或 state 发生变化时，才会重新渲染，而不是在父组件的 state 更新时重新渲染。这样可以通过避免不必要的重新渲染来提升性能。本质上，`useCallback` 确保函数不会在每次渲染时重新创建，类似于 `useEffect` 依赖项的工作方式。只有在指定的依赖项变化时，`useCallback` 内的函数才会更新。

`useMemo` 和 `useCallback` 都是用于提升 React 性能的工具。`useMemo` 用于缓存耗时计算的结果，防止重复计算，而 `useCallback` 用于缓存函数，防止它们在每次渲染时重新创建。这在将函数作为 props 传递给子组件时特别有用，因为它有助于避免不必要的重新渲染。简而言之，`useMemo` 优化计算结果，`useCallback` 优化函数。

然而，合理使用这些 hooks 很重要。过度使用 `useMemo` 和 `useCallback` 可能会导致性能问题。过度优化实际可能会降低性能，且错误管理依赖项可能导致数据过时或行为异常。在性能优化和代码简洁性之间找到平衡是关键。

# 总结

在本课中，我们探讨了其他 React hooks 及其基本用法。我们还讨论了过度优化如何对性能产生负面影响并导致代码复杂化。

# 练习

识别应用中可以应用这些 hooks 的场景。谨慎地实现这些 hooks 以观察其效果。记住要避免过度设计和过度优化，这样做往往适得其反。
