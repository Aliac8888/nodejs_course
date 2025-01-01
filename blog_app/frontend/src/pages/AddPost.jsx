import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/EditPost.module.css";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Post Data:", formData);
    navigate("/posts");
  };

  return (
    <div className={styles.container}>
      <h1>Add New Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          className={styles.input}
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <button className={styles.button} type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
