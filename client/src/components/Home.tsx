import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/components/Home.css";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/users/logout")
      .then((res) => {
        if (res.data.message === "Logout Success") {
          window.location.reload();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return auth ? (
    <div className="Home-main">
      <div className="Home-content">
        <h3>You are Authorized. Welcome {name} !</h3>
        <div className="Home-links-container">
          <button className="Botton-default" onClick={handleLogout}>
            Logout
          </button>
          <div className="Home-links">
            <h3>Want to update account?</h3>
            <Link className="Link-default" to={"/edit"}>
              Edit account
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="Home-main">
      <div className="Home-content">
        <h3>{message}</h3>
        <div className="Home-links-container">
          <div className="Home-links">
            <h3>Don't have an account?</h3>
            <Link className="Link-default" to={"/signup"}>
              Signup
            </Link>
          </div>
          <div className="Home-links">
            <h3>Already have an account?</h3>
            <Link className="Link-default" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
