import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import styles from "../assets/styles/Posts.module.css";
import { fetchPosts } from "../api/postApi";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.log("error:" + error);
      }
    };
    getPosts();
  }, []);

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>All Posts</h1>
      <button
        className={styles["add-button"]}
        onClick={() => navigate("/add-post")}
      >
        Add New Post
      </button>
      {posts.length > 0 ? (
        <div className={styles["post-list"]}>
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={deletePost} />
          ))}
        </div>
      ) : (
        <p className={styles["no-posts"]}>
          No posts available. Add a new post!
        </p>
      )}
    </div>
  );
};

export default Posts;
