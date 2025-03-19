import React, { useEffect, useState } from "react";
import { getTotalPosts, getPost } from "../services/contractService";

export default function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const totalPosts = await getTotalPosts();
      const fetchedPosts = [];
      for (let i = 0; i < totalPosts; i++) {
        const post = await getPost(i);
        fetchedPosts.push({
          creator: post[0],
          contentHash: post[1],
          timestamp: new Date(post[2] * 1000).toLocaleString(),
        });
      }
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  return (
    <div>
      <h2>Post Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <p><strong>Creator:</strong> {post.creator}</p>
            <p><strong>Content:</strong> <a href={`https://ipfs.io/ipfs/${post.contentHash}`} target="_blank" rel="noopener noreferrer">View Post</a></p>
            <p><strong>Timestamp:</strong> {post.timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}
