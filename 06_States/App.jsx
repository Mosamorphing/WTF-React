import { useState } from "react";

import "./App.css";
const SimpleCounter = () => {
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({ firstName: "", email: "" });

  const increment = () => {
    setCount(count + 1);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);

  return (
    <>
      <p>Our count is {count}</p>
      <button onClick={increment}>Increment</button>

      <p>Form</p>
      <input
        className="input__field"
        type="text"
        name="firstName"
        value={form?.firstName}
        onChange={handleChange}
      />
      <input
        className="input__field"
        type="email"
        name="email"
        value={form?.email}
        onChange={handleChange}
      />
    </>
  );
};

export default SimpleCounter;
