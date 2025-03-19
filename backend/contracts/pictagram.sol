// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Pictagram {
    struct Post {
        address creator;
        string contentHash;
        uint256 timestamp;
    }

    Post[] public posts;

    event PostCreated(address indexed creator, string contentHash, uint256 timestamp);

    function createPost(string memory _contentHash) public {
        posts.push(Post(msg.sender, _contentHash, block.timestamp));
        emit PostCreated(msg.sender, _contentHash, block.timestamp);
    }

    function getPost(uint256 index) public view returns (address, string memory, uint256) {
        require(index < posts.length, "Invalid index");
        Post memory post = posts[index];
        return (post.creator, post.contentHash, post.timestamp);
    }

    function getTotalPosts() public view returns (uint256) {
        return posts.length;
    }
}
