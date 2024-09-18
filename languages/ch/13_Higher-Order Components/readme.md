# WTF React 极简教程：13. 高阶组件

WTF React 教程帮助新手快速入门 React。

**WTF 学院社区**: [官方网站 wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | 编译者 [@Mofasasi](https://twitter.com/mofasasi)

高阶组件（HOC）是一个函数，它接受一个组件并返回一个增强后的新组件。简而言之，HOC 就是一个函数 `HigherOrderComponent(OtherComponent)`，它会生成一个功能更强的组件。那么它是如何工作的，又为什么有用呢？

在 HOC 内部，会创建一个新组件，该组件可以向被包装的组件（也称为“低阶组件”）注入额外的 props、state 和其他特性。HOC 的主要目的是处理横切关注点（如身份验证、数据获取或状态管理），从而避免在各个组件中重复代码。例如，要保护需要用户身份验证的仪表板页面访问，可以使用 HOC 来管理授权。

设想一种情况，用户在未登录时访问 `/dashboard` 页面。为了保护此页面，您可能会在每个页面的 `useEffect` 中检查 token。但这样会导致代码重复。

HOC 可以简化这个过程。例如，您可以创建一个 `AuthenticatedRoute` 组件来保护所有需要认证的路由。

```javascript
import { useNavigate } from "react-router-dom";
import './App.css'

export const AuthenticatedRoute = (Component) => {
  return (props) => {
    // 获取加载状态、用户信息和注销操作
    // eslint-disable-next-line react/display-name, react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react/display-name, react-hooks/rules-of-hooks
    const { loading, user, logout } = useAuth(); // 这些信息需要保存在全局状态中，使用 useContext

    if (loading) {
      return (
        <div className="container">
          <div className="big_spinner" />
        </div>
      );
    }

    if (!user) {
      navigate("/");
      return null;
    }

    return <Component {...props} />;
  };
};
```

在这个例子中，`AuthenticatedRoute` 是一个高阶组件。它接收一个组件 `Component`，并返回一个新组件，这个新组件会在渲染 `Component` 之前检查用户的认证状态。这样，您就可以在不重复代码的情况下保护多个路由。

然后，要在受保护的路由中使用这个高阶组件，只需将受保护的页面包裹在 `AuthenticatedRoute` 组件中即可。请看下面的示例：

```javascript
import { Link } from "react-router-dom";
import { AuthenticatedRoute } from "../components/AuthenticatedRoute";
import './App.css'

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
      {users?.map((user) => (
        <Link to={`/profile/${user?.id}`} key={user.id}>
          我的名字是 {user?.name}
        </Link>
      ))}
    </div>
  );
}
export default AuthenticatedRoute(ProfilePage); // 我们将页面包裹在高阶组件内
```

因此，当用户试图通过修改 URL 来操作应用程序时，`AuthenticatedRoute` 高阶组件会在获取用户信息时显示加载状态。根据结果，要么渲染页面，要么将用户重定向到主页进行登录，从而获得授权访问。

# 总结

在本课中，我们探讨了高阶组件（HOC）及其在避免代码重复中的作用。HOC 包裹一个组件以添加功能并处理跨领域关注点（如认证），确保只有授权用户才能访问受保护的页面。

# 练习

创建一个类似的设置，但包含基于角色的访问控制。定义一个包含名称、ID 和角色等属性的用户列表。根据用户角色限制对某些页面的访问。可以参考提供的示例。
