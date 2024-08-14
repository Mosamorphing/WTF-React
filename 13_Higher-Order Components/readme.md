# WTF React minimalist tutorial: 13. Higher-Order Components

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

A Higher-Order Component (HOC) is a function that takes a component and returns a new component with enhanced functionality. The function that takes a component, meaning the HOC itself is a function that accepts a component as an argument, making it look something like HigherOrderComponent(OtherComponent). But how does this work? and why do we need it?

Inside the Higher-Order Component, a new component is created. This new component can add props, state, and other normal component features to the WrappedComponent or "Lower-Order Component" (if you'd permit me to call the other component that name).

For the most part, the purpose of the Higher-Order Component is to provide cross-cutting or simply put universal or general concerns such as authentication, data fetching, or state management without duplicating code across different components. For example, to have access to a dashboard, it is required that you are an authenticated user and this is done via a successful login. Considering that users can manually access the /dashboard page without logging in, you will see the importance of authorization. Now, to safeguard your dashboard page from being accessed by an unauthorized user, what do you do? You block such access.
How do you do this without having to duplicate code?
For instance, you have a dashboard page, a transactions page, a settings page and several other pages you want only authorized access to, you can then check in a useEffect on every page if the user has a token the moment they open the page. If they do, you allow them to proceed, else you send them back to login page. Now, this works but it is not efficient.
This is a typical example of a use case for a higher-order component.
How does it work? Let's see in this example:
we can have a component called AuthenticatedRoute in our application, which guards all protected routes.

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

So, whenever a clever user tries to manipulate the application by manually setting the URL, if we have wrapped such a page with AuthenticatedRoute, we first get a loading state while fetching the user's info(whether it exists or not) and then an action is taken based on the result, either the page is rendered or the application navigates the user back to the homepage and then they get to perform the normal act of logging in and becoming an authorized user.

# Summary

In this lesson, we learnt about HOC and how it is a very vital and integral part of any application, especially if we are looking to avoid code repetition. The wrapped component acts as the Higher-Order component and then goes ahead to render (as shown in the example).

# Exercise

Make something similar to this, but for a user with a particular access. Hardcode a user's list that is an array of objects, the object should have name, id and role. Users with certain roles should not be able to access certain pages. All you need to draw inspiration from is already in the above example. Good luck and see you in the next lesson.
