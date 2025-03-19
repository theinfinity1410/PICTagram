import { ethers } from "ethers";
import { contractABI } from "../constants/contractABI";
import { contractAddress } from "../constants/contractAddress";

// Get contract instance
async function getContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}

// Store content hash
export async function createPost(contentHash) {
  const contract = await getContract();
  const tx = await contract.createPost(contentHash);
  await tx.wait();
}

// Fetch total posts
export async function getTotalPosts() {
  const contract = await getContract();
  return await contract.getTotalPosts();
}

// Fetch a single post by index
export async function getPost(index) {
  const contract = await getContract();
  return await contract.getPost(index);
}
