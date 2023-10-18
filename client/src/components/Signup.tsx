import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css/components/Signup.css";

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
    <div className="main-box-lg main-default">
      <h2 className="form-header-default">Signup</h2>
      <form
        className="form-container-default Fornm-container"
        onSubmit={handleSubmit}
      >
        <div className="form-box-default">
          <label>Name:</label>
          <input
            className="input-form-default"
            type="text"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
        </div>
        <div className="form-box-default">
          <label>Email:</label>
          <input
            className="input-form-default"
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>
        <div className="form-box-default">
          <label>Password:</label>
          <input
            className="input-form-default"
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
        <button className="Botton-default" type="submit">
          Signup
        </button>
      </form>
      <div className="links-container-default">
        <div className="links-default">
          <h3>Already have an account?</h3>
          <Link className="Link-default" to={"/login"}>
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
