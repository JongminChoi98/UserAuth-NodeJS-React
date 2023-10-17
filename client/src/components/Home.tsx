import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h3>You are Authorized. Welcome {name} !</h3>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <Link to={"/edit"}>Edit account</Link>
      </div>
    </div>
  ) : (
    <div>
      <h3>{message}</h3>
      <div>
        <h3>Don't have an account?</h3>
        <Link to={"/signup"}>Signup Now</Link>
      </div>
      <div>
        <h3>Already have an account?</h3>
        <Link to={"/login"}>Login Now</Link>
      </div>
    </div>
  );
};

export default Home;
