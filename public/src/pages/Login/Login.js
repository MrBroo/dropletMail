import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../utils/APIRoutes";
import "./Login.css";
export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username } = values;
    if (username === "") {
      toast.error("User is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        console.log(
          "get",
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="login">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="login__inner">
            <h1>Welcome to the Chat</h1>
            <p>Please enter your name</p>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <button>Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
