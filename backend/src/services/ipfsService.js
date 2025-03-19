import { create } from "ipfs-http-client";

// Connect to Infura IPFS node (or your own)
const projectId = "864e4829ed91482ba9a077f7ac401d26";
const projectSecret = "0zX6Mg4W6e2AgY0DbngSN/020HOUVofBLrpO/sr5AfbILEJtJ3bZzQ";
const auth = "Basic " + btoa(projectId + ":" + projectSecret);

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

// Upload Function for Text
export async function uploadToIPFS(content) {
  try {
    const added = await ipfs.add({ content });
    console.log("IPFS Result:", added);
    return `https://ipfs.io/ipfs/${added.path}`;
  } catch (error) {
    console.error("IPFS Upload Failed:", error);
    throw new Error("Failed to upload content to IPFS");
  }
}
