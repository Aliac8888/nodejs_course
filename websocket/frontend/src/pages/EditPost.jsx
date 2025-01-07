import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../assets/styles/EditPost.module.css";
import { fetchSinglePost, updatePost } from "../api/postApi";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await fetchSinglePost(id);
        if (post) {
          setFormData(post);
        } else {
          setError("post not found");
        }
      } catch (error) {
        setError("error fetching post");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id,formData);
      navigate("/posts");
    } catch (error) {
      setError("failed to update the post")
    }
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditPost;
