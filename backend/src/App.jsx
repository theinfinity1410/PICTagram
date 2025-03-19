import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import PostFeed from "./components/PostFeed";
import UploadPost from "./components/UploadPost";

export default function App() {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnected(true);
    } else {
      alert("MetaMask not detected!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>PICTAGRAM</h1>
      {!connected ? (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            background: "#6200ea",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <WalletConnect />
          <UploadPost />
          <PostFeed />
        </>
      )}
    </div>
  );
}
