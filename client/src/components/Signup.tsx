import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users/signup/", values)
      .then((res) => {
        if (res.data.message === "Signup Success!") {
          navigate("/login");
        } else {
          alert("Hey!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <div>
        <h3>Already have an account?</h3>
        <Link to={"/login"}>Login Now</Link>
      </div>
    </div>
  );
};

export default Signup;
