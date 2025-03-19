import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "../constants/contractABI";
import { contractAddress } from "../constants/contractAddress";

export const PictagramContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};

export const PictagramProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (content) => {
    try {
      const contract = getEthereumContract();
      const transaction = await contract.createPost(content);
      await transaction.wait();
      alert("Post created!");
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      const contract = getEthereumContract();
      const posts = await contract.getPosts();
      return posts;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <PictagramContext.Provider value={{ currentAccount, connectWallet, createPost, getPosts }}>
      {children}
    </PictagramContext.Provider>
  );
};
