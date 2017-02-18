pragma solidity ^0.4.7;

/* tokenInterface
* @Interface for Token transmission
* @ Initial author / Modification : Srinivasan Swaminathan /
*/

contract tokenInterface {

  function transfer(address _to, uint256 _value) returns (bool success){}
  function transferFrom(address _from, address _to, uint256 _value) {}
  function balanceOf(address _owner){}
  function approve(address spender, uint value) returns (bool ok);
  function allowance(address owner, address spender) constant returns (uint);

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed owner, address indexed spender, uint value);
}
