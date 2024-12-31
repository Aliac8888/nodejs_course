import React, { useState } from "react";
import styles from "../assets/styles/Auth.module.css";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      alert("Logged in successfully!");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
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
    </form>
  );
};

export default Login;
