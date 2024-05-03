# WTF React minimalist tutorial: 2. Components

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

# What are Components?

In React, Components are reusable pieces of code that represent a part of a user interface (UI). Components are the building blocks of a React application, and they make it easier to create, manage, and maintain complex UIs by breaking them down into smaller, manageable pieces.

#Building a Component

1. To build a component, we use the `export default` prefix to identify the function we want to reuse. The prefix allows us to import it whenever we want to reuse it.

2. With the `function` prefix, we can name the function we want to build into a component.

```
function Biography() {}
```
Note: we have just defined the function here as 'Biography', it could be anything. 

3. It is important to markup the function to avoid syntax errors.

```
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
  </div>
);
```



