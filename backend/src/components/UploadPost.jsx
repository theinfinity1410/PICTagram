import React, { useState } from "react";
import { uploadToIPFS } from "../services/ipfsService";
import { createPost } from "../services/contractService";

export default function UploadPost() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipfsUrl, setIpfsUrl] = useState("");

  const handleUpload = async () => {
    if (!content) {
      alert("Content cannot be empty");
      return;
    }

    setLoading(true);
    try {
      // Upload to IPFS and get the URL
      const ipfsUrl = await uploadToIPFS(content);
      setIpfsUrl(ipfsUrl);

      // Optionally, store the post URL in the smart contract
      await createPost(ipfsUrl);

      alert("Post uploaded successfully!");
      setContent("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
        rows="4"
        cols="50"
        style={{ marginBottom: "10px", padding: "10px", width: "80%", maxWidth: "500px" }}
      />
      <br />
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: loading ? "#ccc" : "#6200ea",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: "10px",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {ipfsUrl && (
        <div style={{ marginTop: "15px" }}>
          <p>IPFS URL:</p>
          <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
            {ipfsUrl}
          </a>
        </div>
      )}
    </div>
  );
}
