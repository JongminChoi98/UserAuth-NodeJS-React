import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/components/Signup.css";

function Edit() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      if (res.data.message === "Success") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.message);
      }
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/users/edit/", values)
      .then((res) => {
        if (res.data.message === "Update Success!") {
          navigate("/login");
        } else {
          alert("Hey!");
          navigate("/edit");
        }
      })
      .catch((err) => console.log(err));
  };

  return auth ? (
    <div className="main-box-lg main-default">
      <h3 className="form-header-default">Welcome {name} !</h3>
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
          />
        </div>
        <div className="form-box-default">
          <label>Email:</label>
          <input
            className="input-form-default"
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="form-box-default">
          <label>Password:</label>
          <input
            className="input-form-default"
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button className="Botton-default" type="submit">
          Update
        </button>
      </form>
      <div className="links-container-default">
        <div className="links-default">
          <h3>Go back to home?</h3>
          <Link className="Link-default" to={"/"}>
            Home
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="main-default ">
      <div className="content-default">
        <h3>{message}</h3>
        <div className="links-container-default">
          <div className="links-default">
            <h3>Don't have an account?</h3>
            <Link className="Link-default" to={"/signup"}>
              Signup
            </Link>
          </div>
          <div className="links-default">
            <h3>Already have an account?</h3>
            <Link className="Link-default" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
