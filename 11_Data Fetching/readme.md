# WTF React minimalist tutorial: 11. Data Fetching

WTF React tutorial helps newcomers get started with React quickly.

**WTF Academy Community**: [Official Website wtf.academy](https://wtf.academy) | [Discord](https://discord.gg/5akcruXrsk)

**Twitter**: [@WTFAcademy\_](https://twitter.com/WTFAcademy_) | Compiled by [@Mofasasi](https://twitter.com/mofasasi)

---

Typically, the data displayed to users on the frontend comes from a backend database. Since users can't access the database directly, data is transmitted via endpoints provided by the backend. In JavaScript, we use the Fetch API to make these requests.

## What is the Fetch API?

The Fetch API is a modern interface for making HTTP requests in web browsers. It offers a more robust and flexible method for sending and receiving data compared to older approaches like XMLHttpRequest. The Fetch API simplifies making network requests, handling responses, and processing data in different formats. It is built into modern browsers, so you don’t need any additional libraries to use it. This means you can fetch data using the Fetch API without relying on external libraries like Axios. It's commonly used for interacting with RESTful APIs, retrieving resources, and sending data to servers.

The Fetch API uses Promises, which makes it easier to manage asynchronous operations and chain multiple requests together. Its syntax is straightforward and user-friendly.

Here's a basic example of how to use the Fetch API:

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

In the code provided, we made a request to the JSON Placeholder's posts endpoint (which could be any endpoint) and anticipated receiving a response. This response was then converted into JSON format in the following line. Finally, we logged the data to the console to examine its structure before rendering it on the user interface.

Here's a complete example demonstrating how to use the Fetch API with `useEffect` to fetch data from an endpoint when the page loads, and then render that data on the frontend.

```javascript
import { useState, useEffect } from "react";

const Posts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {data?.map((post) => {
        return (
          <p key={post.id}>
            post number {post.id}, the title is {post.title}
          </p>
        );
      })}
    </div>
  );
};

export default Posts;
```

![11-1](./img/11-1.png)

The above code fetches data from the endpoint and maps over each post object in the posts array to display a paragraph showing the ID and title of each post. Notice the `key` attribute on the paragraph tag? Here’s why it's important:

1. **Efficient Reconciliation**: React uses reconciliation to update the UI when the state changes. Providing unique keys helps React quickly identify which elements have changed, improving performance by updating only those elements instead of re-rendering the entire list.

2. **Preventing Unexpected Behavior**: Without unique keys, React may struggle to update elements correctly, leading to unpredictable UI behavior. For example, if an item is removed, React might not adjust the remaining items properly. Unique keys maintain list integrity during updates.

3. **Unique Among Siblings**: Keys must be unique only among immediate siblings. While keys can be reused in different lists, each key in a single list must be distinct to avoid conflicts. For example, if two objects have the same ID, you’ll get a warning in the console about duplicate keys. Not passing the key prop at all also triggers warnings.

The Fetch API addresses our basic needs but has limitations: it doesn't automatically transform JSON data, requiring us to manually convert responses each time. Additionally, it lacks built-in support for request cancellation, posing challenges for aborting ongoing requests. Error handling is also verbose, as network errors do not reject promises.

Fortunately, Axios is a library that addresses these limitations and provides a more robust solution.

## What is Axios?

Axios is a popular JavaScript library for making HTTP requests from both browsers and Node.js. It’s designed to be user-friendly and offers several advantages over built-in methods like the Fetch API. Axios is Promise-based, making asynchronous operations straightforward. Its simple and intuitive API is easy for beginners to use. Importantly, Axios automatically transforms JSON data, eliminating the need for manual parsing of responses.

A key feature of Axios is **interceptors**, which allow you to modify requests or responses before they’re processed by `then` or `catch`. For example, if a request returns a 401 response code indicating that the user is unauthorized, the interceptor can cancel any subsequent requests that follow.

## Usage

To use Axios, you first need to install it, as it is an external library. Install it by running the following command in the terminal:

```javascript
npm i axios
```

The basic syntax looks like;

```javascript
import axios from "axios";

axios
  .get("https://api.example.com/data")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

Such that, if we replace the former Posts page with the following set of code, we are going to have the same thing;

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {data?.map((post) => {
        return (
          <p key={post.id}>
            post number {post.id}, the title is {post.title}
          </p>
        );
      })}
    </div>
  );
};

export default Posts;
```

The difference is that this approach is more efficient than the previous one. Although it can also be further optimized, which leads us to using instances. Axios instances are custom configurations of the Axios HTTP client that allow you to set reusable settings for making HTTP requests. This improves code maintainability and consistency, especially when working with multiple APIs or endpoints that require specific configurations. For example, you can create a file named `api.js` and configure an Axios instance as follows:

```javascript
import axios from "axios";

// Instance creation happens here
export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Interceptor is here
api.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config.url);
    // You could add headers, tokens, etc. here depending on what you need e.g.
    config.headers.Authorization = `Bearer ${token}`; // the token is to be passed into this from wherever you get your token from. otherwise, you get an error
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.config.url);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);
```

We can then set up our posts page to use the Axios instance to fetch data from the `baseURL` provided. Typically, the `baseURL` represents the server you access each time you send a request, and you only need to specify the specific route you want to hit as follows:

```javascript
import { useState, useEffect } from "react";
import { api } from "../api";

const Posts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/posts") // we want to go to 'https://jsonplaceholder.typicode.com/posts' but because we have set jsonplaceholder.typicode as our base URL, the instance only then find the "/POSTS" route for this request.
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });

    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {data?.map((post) => (
        <p key={post.id}>
          post number {post.id}, the title is {post.title}
        </p>
      ))}
    </div>
  );
};

export default Posts;
```

This approach allows us to create a reusable API configuration without duplicating code. It simplifies development, leading to more maintainable and optimized code in the long run.

## Summary

While the Fetch API is a robust built-in tool, Axios offers several advantages that can enhance development efficiency, particularly in larger applications. Features like automatic JSON transformation, improved error handling, and interceptors contribute to cleaner and more maintainable code.

## Exercise

Understand the provided code and the purpose of using instances, then experiment by making requests to various endpoints with the same `baseURL` across different pages in your application. Enhance your webpage with features such as a loading spinner and error toasts to improve user experience. Additionally, as you advance your skills, try using both Fetch and Axios in different scenarios to deepen your understanding and effectively apply these tools in future projects.
