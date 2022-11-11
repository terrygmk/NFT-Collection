// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {

  string _baseTokenURI;
  uint256 public _price = 0.001 ether;
  bool public _paused ; 
  uint256 public maxTokenIds = 20;
  
  // total number of tokenIds minted
  uint256 public tokenIds;
  IWhitelist whitelist;   
  bool public presaleStarted;
  uint256 public presaleEnded;

  modifier onlyWhenNotPaused{
    require(!_paused, "Contract is paused");
    _;
  }

  constructor(string memory baseURI, address whitelistContract) ERC721("CryptoDevs", "DEV") {
    _baseTokenURI = baseURI ;
    whitelist = IWhitelist(whitelistContract);
  }

  function startPresale() public onlyOwner {
    presaleStarted = true;
    presaleEnded = block.timestamp + 60 minutes;
  }

  function presaleMint() public payable onlyWhenNotPaused {
    require(whitelist.whitelistedAddresses(msg.sender), "You are not whitelisted");
    require(presaleStarted, "Presale has not started");
    require(block.timestamp < presaleEnded, "Presale has ended");
    require(tokenIds < maxTokenIds, "All tokens have been minted");
    require(_price == msg.value, "Incorrect amount sent");
    tokenIds++;
    _safeMint(msg.sender, tokenIds);
    
  }

  function mint() public payable onlyWhenNotPaused {
    require(presaleStarted && block.timestamp > presaleEnded, "Presale has not ended");
    require(tokenIds < maxTokenIds, "All tokens have been minted");
    require(_price == msg.value, "Incorrect amount sent");
    tokenIds++;
    _safeMint(msg.sender, tokenIds);
    
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function setPaused(bool paused) public onlyOwner {
    _paused = paused;
  }
  function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    payable(msg.sender).transfer(balance);
  }

  receive() external payable {}
  fallback() external payable {}
}