import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css/components/Login.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users/login/", values)
      .then((res) => {
        if (res.data.message === "Login Success!") {
          navigate("/");
        } else {
          alert("Hey!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main-default">
      <h2 className="form-header-default">Login</h2>
      <form className="form-container-default" onSubmit={handleSubmit}>
        <div className="form-box-default">
          <label>Email:</label>
          <input
            className="input-form"
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>
        <div className="form-box-default">
          <label>Password:</label>
          <input
            className="input-form"
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
        <button className="Botton-default" type="submit">
          Login
        </button>
      </form>
      <div className="links-container-default ">
        <div className="links-default">
          <h3>Don't have an account?</h3>
          <Link className="Link-default" to={"/signup"}>
            Signup Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
