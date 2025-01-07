import React, { useState } from "react";
import styles from "../assets/styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/posts");
    } catch (error) {
      setError("login failed");
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
