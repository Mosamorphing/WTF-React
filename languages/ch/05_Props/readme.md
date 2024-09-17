# WTF React 極簡教學：5. Props

《React初学者指南》帮助新手快速掌握React。 

**WTF Academy社群**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) **編譯者**：[@Mofasasi](https://twitter.com/mofasasi)

---

# 属性（Props）

在 React 中，属性（Props）是从父组件传递到子组件，用于使子组件具备自定义功能。它们是传递给 JSX 标签的参数。例如，`<img>` 标签接受的属性有 `className`、`src` 和 `alt`：

```javascript
import './App.css';

function Avi({ imageUrl, size }) {
  return (
    <img
      className="avi"
      src={imageUrl}
      alt="Avatar"
      width={size}
      height={size}
    />
  );
}

export default function User() {
  return (
    <Avi/>
  );
}
```

在 `<img>` 标签中，有一些标准的 props 可以传递，[详见这里](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)。
不过，你也可以将 props 传递给你自己的组件并进行自定义。例如：

```javascript
export default function User() {
  return (
    <div className="avi-container">
      <Avi
        size={150}
        imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      />
      <Avi
        size={100}
        imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      />
      <Avi
        size={80}
        imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
      />
    </div>
  );
}
```
将 Props 想象成你可以传递给组件的参数。在 React 中，组件通过接收 props 作为输入来工作。因此，当你定义一个函数组件时，实际上就是在创建一个以 props 作为参数的函数。

![2-2](./img/5-1.png) 

# 將 JSX 作為子元件傳遞

在 React 中，當您將元素或元件放置在 JSX 標記中時，父元件將自動接收這些巢狀元素或元件作為名為「children」的特殊 prop。
為了說明這一點，如果您將“<Avi />”元件嵌套在“<Card>”元件中，如下所示：

```javascript
import './App.css';

function Avi({ imageUrl, size }) {
  return (
    <img
      className="avi"
      src={imageUrl}
      alt="Avatar"
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function User() {
  return (
    <div className="avi-container">
      <Card>
        <Avi
          size={150}
          imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        />
      </Card>
      <Card>
        <Avi
          size={150}
          imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        />
      </Card>
      <Card>
        <Avi
          size={150}
          imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        />
      </Card>
    </div>
  );
}
```
![2-2](./img/5-2.png) 

在这里，Avi 组件作为 `children` 传递给了 Card 组件。Card 组件可以渲染通过 `children` 传递给它的任何内容。这种模式对于创建可重用的 UI 组件特别有用，因为它使组件能够灵活地处理不同的内容。

# 默认属性
有时候，你可能希望为 props 设置默认值，这样即使某个特定的 prop 没有提供，组件也能正常工作。这可以通过 `defaultProps` 属性来实现。

```javascript
// Setting default props for the Avi component
Avi.defaultProps = {
  imageUrl: 'https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg',
  size: 100,
};

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function User() {
  return (
    <div className="avi-container">
      {/* Using Card with Avi without passing props, will use default props */}
      <Card>
        <Avi />
      </Card>
      {/* Using Card with Avi and passing custom size, but using default imageUrl */}
      <Card>
        <Avi size={120} />
      </Card>
      {/* Using Card with Avi and passing both custom size and imageUrl */}
      <Card>
        <Avi
          size={150}
          imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        />
      </Card>
    </div>
  );
}
```

在上述示例中，如果没有提供 name prop，Greeting 组件将使用 'Guest' 作为默认值。

![2-2](./img/5-3.png)

# Prop Types
为了增强组件的健壮性，可以使用 PropTypes 来指定组件接收的 prop 类型。这样可以在开发时确保传递给组件的数据类型正确，从而及早发现错误。

```javascript
// Define PropTypes for the Avi component
Avi.propTypes = {
  imageUrl: PropTypes.string.isRequired,  // imageUrl must be a string and is required
  size: PropTypes.number.isRequired,      // size must be a number and is required
};

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Define PropTypes for the Card component
Card.propTypes = {
  children: PropTypes.node.isRequired,   // children must be a valid React node and is required
};

export default function User() {
  return (
    <div className="avi-container">
      <Card>
        <Avi
          size={150}
          imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        />
      </Card>
      <Card>
        <Avi
          size={120}
          imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        />
      </Card>
      <Card>
        <Avi
          size={100}
          imageUrl="https://pbs.twimg.com/profile_images/1463080286665666564/ubE1IWCT_400x400.jpg"
        />
      </Card>
    </div>
  );
}
```
![2-2](./img/5-4.png) 

在这个例子中，Avatar 组件期望接收的 imageUrl 应该是一个字符串，size 应该是一个数字。如果这些 props 没有提供或者类型错误，React 会在控制台发出警告。

# 总结

Props 是 React 中的一个核心概念，它允许你从一个组件向另一个组件传递数据，从而使你的组件更加灵活和可重用。通过理解如何使用 props、子组件、默认值和 PropTypes，你可以创建健壮且易于维护的 React 应用程序。

放心地尝试代码，修改示例，观察改变 props 如何影响你的组件行为吧！
