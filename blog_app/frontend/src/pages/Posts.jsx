import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import styles from "../assets/styles/Posts.module.css";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Mock fetching data
    const fetchPosts = async () => {
      const mockPosts = [
        { id: 1, title: "First Post", content: "This is the first post." },
        { id: 2, title: "Second Post", content: "This is the second post." },
      ];
      setPosts(mockPosts);
    };

    fetchPosts();
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
