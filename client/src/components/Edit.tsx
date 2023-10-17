import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h3>Welcome {name} !</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  ) : (
    <div>
      <h3>{message}</h3>
    </div>
  );
}

export default Edit;
