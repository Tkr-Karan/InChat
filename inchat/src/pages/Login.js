import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/login.module.css";
import { useAuth } from "../hooks";

import { login } from "../api";
import { Navigate } from "react-router";
// import { toast } from 'react-toastify/dist/components';

const clicked = () => {
  toast("clicked hain bhai");
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  // console.log("auth", auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    if (!email || !password) {
      return toast("Please Enter both email and password", {
        appearance: "error",
        autoDismiss: true,
      });
    }

    const response = await auth.login(email, password);

    if (response.success) {
      toast("succeessFully logged in", {
        appearance: "success",
      });
    } else {
      toast.warn(response.message, {
        appearance: "error",
      });
    }

    setLoggingIn(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log in</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button onClick={clicked} disabled={loggingIn}>
          {loggingIn ? "logging In....." : "Log In"}

          <ToastContainer />
        </button>
      </div>
    </form>
  );
};

export default Login;
