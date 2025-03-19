import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

// Connect Wallet
export async function connectWallet() {
  const provider = await detectEthereumProvider();
  if (!provider) throw new Error("MetaMask not detected");

  const accounts = await provider.request({ method: "eth_requestAccounts" });
  return accounts[0]; // Return user's Ethereum address
}

// Sign Message
export async function signMessage(address) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const message = `Sign this message to authenticate with PICTagram. Timestamp: ${Date.now()}`;
  const signature = await signer.signMessage(message);
  return { address, signature };
}
