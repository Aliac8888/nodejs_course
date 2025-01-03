import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/Post.module.css";

const Post = ({ post, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => navigate(`/edit-post/${post._id}`)}
        >
          Edit
        </button>
        <button
          className={`${styles.button} ${styles.delete}`}
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Post;
