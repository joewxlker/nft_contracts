// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BusinessCard is ERC721 {
    using Strings for uint256;

    uint256 public nextTokenId;
    string public baseTokenURI;

    /// @param _baseURI The prefix, e.g. "https://api.example.com/svg"
    constructor(string memory _baseURI) ERC721("IdentityNFT", "IDNFT") {
        baseTokenURI = _baseURI;
    }

    /// @dev Override to return something like:
    ///   https://api.example.com/api/metadata
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory q = string(abi.encodePacked("/api/metadata/", tokenId.toString()));

        return string(abi.encodePacked(baseTokenURI, q));
    }

    function mint(address to) external {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }
}