import "./register.css";
import { useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="registerin">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Hello</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Hello.
          </span>
        </div>
        <div className="loginRight">
          <form className="registerinBox" onSubmit={handleClick}>
            <input
              placeholder="user name"
              ref={username}
              className="loginInput"
              required
            />

            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              required
              type="email"
            />
            <input
              placeholder="Password"
              ref={password}
              className="loginInput"
              required
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              className="loginInput"
              required
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
