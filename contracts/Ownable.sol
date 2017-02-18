pragma solidity ^0.4.7;

/* Ownable
* @Base Contract with an owner
* @which prevents function from running if it is called by anyone other than the owner.
* @ Initial author / Modification : Srinivasan Swaminathan /
*/

contract Ownable {
    address public owner;

    function Ownable() {
    owner = msg.sender;
    }

    modifier onlyOwner() {
    if (msg.sender == owner)
      _;
    }

    function transferOwnership(address newOwner) onlyOwner {
    if (newOwner != address(0)) owner = newOwner;
    }


}
