import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import styles from "../assets/styles/Posts.module.css";
import { fetchPosts, deletePost } from "../api/postApi";
import socket from "../utilities/socket";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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

    socket.on("newPost", (post) => {
      setPosts((prevPosts) => {        
        return [...prevPosts, post];
      });
    });

    return () => {
      socket.off("newPost");
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log("error while deleting post:" + error);
      setError("failed to delete post");
    }
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
            <Post key={post._id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className={styles["no-posts"]}>
          No posts available. Add a new post!
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Posts;
