import React, { useState, useEffect } from "react";
import { uploadToIPFS } from "../services/ipfsService";
import { createPost } from "../services/contractService";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [content, setContent] = useState("");
  const [account, setAccount] = useState("");

  // Check if MetaMask is installed and connect
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Auto-connect wallet when component mounts
  useEffect(() => {
    connectWallet();
  }, []);

  const handleUpload = async () => {
    if (!content) return alert("Enter content!");

    try {
      const ipfsUrl = await uploadToIPFS(content);
      await createPost(ipfsUrl);
      alert(`Content uploaded! IPFS URL: ${ipfsUrl}`);
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Failed to upload content.");
    }
  };

  return (
    <div>
      <h1>Pictagram</h1>
      <div>
        {account ? (
          <p>Connected as: {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
}
