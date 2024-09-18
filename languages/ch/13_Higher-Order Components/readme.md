# WTF React 极简教程：13. 高阶组件（HOC）

WTF React 教程旨在帮助新手快速入门 React。

**WTF Academy 社区**：[官方网站 wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**：[ @WTFAcademy_](https://twitter.com/WTFAcademy_) | 编译者 [@Mofasasi](https://twitter.com/mofasasi)

高阶组件（HOC）是一个函数，它接收一个组件并返回一个具有附加功能的新组件。简单来说，HOC 函数接收一个组件并生成它的增强版本，例如 `HigherOrderComponent(OtherComponent)`。但它是如何工作的呢？为什么它有用？

在 HOC 内部，会创建一个新组件，该组件可以向被“包装”的组件（WrappedComponent）注入额外的属性、状态和其他特性。HOC 主要用于处理跨组件的共性需求，例如身份验证、数据获取或状态管理，避免在多个组件中重复代码。比如，为了保护需要用户身份验证的仪表板页面访问，可以使用 HOC 来管理授权。

考虑一种情况，用户在未登录状态下访问 `/dashboard` 页面。为了保护此页面，你可以在每个页面的 `useEffect` 中检查令牌。然而，这种方法会导致代码重复。

HOC 可以简化这个过程。例如，你可以创建一个 `AuthenticatedRoute` 组件来保护所有受保护的路由。

```javascript
import { useNavigate } from "react-router-dom";
import './App.css'

export const AuthenticatedRoute = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const { loading, user, logout } = useAuth(); // 前提是你已经通过 useContext 将这些存储在全局状态中
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

要在受保护的路由中使用它，只需将受保护页面用 `AuthenticatedRoute` 组件包装一下即可，如下所示：

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
export default AuthenticatedRoute(ProfilePage); // 将页面包装在高阶组件内
```

因此，当用户试图通过更改 URL 来访问受保护的页面时，`AuthenticatedRoute` HOC 确保在获取用户信息时显示加载状态。根据结果，要么渲染页面，要么将用户重定向到主页进行登录以获得访问权限。

# 总结

在本课中，我们讲解了高阶组件（HOC）及其在避免代码重复中的作用。HOC 用于包装一个组件以添加功能，并处理跨组件的共性需求，如身份验证，确保受保护页面仅对授权用户可访问。

# 练习

创建一个类似的设置，但包括基于角色的访问控制。定义一个具有名称、ID 和角色属性的用户列表。基于用户角色限制对某些页面的访问。使用提供的示例作为灵感。祝你好运！
