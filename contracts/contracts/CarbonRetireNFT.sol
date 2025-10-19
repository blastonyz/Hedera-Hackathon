//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract CarbonRetireNFT is ERC721URIStorage, AccessControl, ReentrancyGuard {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public tokenId;
    bool private _initialized;
    string private _baseURIextended;
    bool private noReesale;

    mapping(address => uint256[]) private _holderTokens;
    mapping(uint256 => uint256) private _tokenIndexInOwnerArray;

    event Retire(address indexed account, uint256 indexed tokenId);

    constructor(string memory baseURI_) ERC721("CarbonRetireCert", "CRCERT") {
        address admin = msg.sender;
        require(admin != address(0), "admin=0");
        require(bytes(baseURI_).length > 0, "baseURI empty");
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _baseURIextended = baseURI_;
        _initialized = true;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIextended;
    }

    function getBaseURI() external view returns (string memory) {
        return _baseURIextended;
    }

    function mintCert(
        address to,
        string calldata tokenURI_
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 id = ++tokenId;
        _safeMint(to, id);
        if (bytes(tokenURI_).length > 0) _setTokenURI(id, tokenURI_);
        _holderTokens[to].push(id);
        _tokenIndexInOwnerArray[id] = _holderTokens[to].length - 1;
        emit Retire(to, id);
        return id;
    }

    function getTokensOfOwner(
        address owner
    ) external view returns (uint256[] memory) {
        return _holderTokens[owner];
    }

    function transferFrom(
        address from,
        address to,
        uint256 _tokenId
    ) public override(ERC721, IERC721) {
        require(!noReesale, "no resale");
        super.transferFrom(from, to, _tokenId);
    }

    function totalMinted() external view returns (uint256) {
        return tokenId;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(AccessControl, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
