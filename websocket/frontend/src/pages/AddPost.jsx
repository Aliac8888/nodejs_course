import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/EditPost.module.css";
import { createPost } from "../api/postApi";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createPost(formData);
      navigate("/posts");
    } catch (error) {
      setError("failed to create post");
    }
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddPost;
