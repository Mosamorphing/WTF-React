# WTF React minimalist tutorial: 13. Higher-Order Components

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

A Higher-Order Component (HOC) is a function that takes a component and returns a new component with added functionality. Essentially, the HOC function accepts a component and produces an enhanced version of it, like `HigherOrderComponent(OtherComponent)`. But how does it work, and why is it useful?

Inside the HOC, a new component is created that can inject additional props, state, and other component features into the "WrappedComponent" (or "Lower-Order Component"). The primary purpose of an HOC is to handle cross-cutting concerns—such as authentication, data fetching, or state management—without duplicating code across various components. For example, to protect access to a dashboard, which requires user authentication, you can use an HOC to manage authorization.

Consider a scenario where users can access the `/dashboard` page without being logged in. To protect this page, you could check for a token in `useEffect` on each page. However, this approach leads to repetitive code.

An HOC can simplify this process. For instance, you can create an `AuthenticatedRoute` component that guards all protected routes.

```javascript
import { useNavigate } from "react-router-dom";
import './App.css'

export const AuthenticatedRoute = (Component) => {
  return (props) => {
    //grab your loading state, user and logout depending on whatever action you want to perform here
    // eslint-disable-next-line react/display-name, react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react/display-name, react-hooks/rules-of-hooks
    const { loading, user, logout } = useAuth(); //you must have previously stored these in your global state using useContext
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

Then to use it in your protected routes, all you have to do is wrap the protected page in the AuthenticatedRoute component. See it here;

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
          My name is {user?.name}
        </Link>
      ))}
    </div>
  );
}
export default AuthenticatedRoute(ProfilePage); // we wrapped the page inside of the higer-one component
```

So, when a user tries to manipulate the application by changing the URL, the `AuthenticatedRoute` HOC ensures that a loading state is shown while fetching the user's information. Based on the result, either the page is rendered, or the user is redirected to the homepage to log in and gain authorized access.

# Summary

In this lesson, we explored Higher-Order Components (HOCs) and their role in avoiding code repetition. The HOC wraps a component to add functionality and handle cross-cutting concerns like authentication, ensuring that protected pages are only accessible to authorized users.

# Exercise

Create a similar setup but include role-based access. Define a list of users with properties such as name, id, and role. Restrict access to certain pages based on user roles. Use the example provided as inspiration. Good luck!
