import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../assets/styles/EditPost.module.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    // Mock fetching post data by ID
    const fetchPost = async () => {
      const mockPost = {
        id,
        title: `Post ${id}`,
        content: `Content of post ${id}`,
      };
      setFormData(mockPost);
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited Post Data:", formData);
    navigate("/posts");
  };

  return (
    <div className={styles.container}>
      <h1>Edit Post</h1>
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
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPost;
