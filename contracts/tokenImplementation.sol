pragma solidity ^0.4.7;

import "./tokenInterface.sol";
import "./SafeMath.sol";

/* tokenImplementation
* @definition for tokenInterface
* @ Initial author / Modification : Srinivasan Swaminathan /
*/

contract tokenImplementation is tokenInterface, SafeMath {

  uint256 public totalSupply;
  string public name; //fancy name:
  uint8 public decimals; //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
  string public symbol; //An identifier eg MLG
  string public version; //arbitrary versioning scheme.
  bool public confirmSignal; //Check for status
  uint256 public balance;

  function tokenImplementation() {
        balances[msg.sender] = 100000000000000000000000;
        totalSupply = 0;
        name = 'ETH Token';
        decimals = 18;
        symbol = 'MLG';
        version = '0.1';

}



  mapping (address => uint256) balances;
  mapping (address => mapping (address => uint256)) allowed;

  uint256 oneWei = 1 wei;

      /// @notice send `_value` token to `_to` from `msg.sender`
      /// @param _to The address of the recipient
      /// @param _value The amount of token to be transferred
      /// @return Whether the transfer was successful or not

  function transfer(address _to, uint256 _value) returns (bool success) {
        if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
            balances[msg.sender] = safeSub(balances[msg.sender], _value);
            balances[_to] = safeAdd(balances[_to], _value);
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

        /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
        /// @param _from The address of the sender
        /// @param _to The address of the recipient
        /// @param _value The amount of token to be transferred
        /// @return Whether the transfer was successful or not

  function transferFrom(address _from, address _to, uint256 _value) {
    _value = _value * oneWei;
        if (balances[_from] >= _value && balances[_to] + _value > balances[_to]) {
            balances[_to] = safeAdd(balances[_to], _value);
            balances[_from] = safeSub(balances[_from], _value);
            confirmSignal = true;
            Transfer(_from, _to, _value);
        } else { confirmSignal = false; }
    }

    function balanceOf(address _owner)  {
            balance = balances[_owner];
    }

        /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
        /// @param _spender The address of the account able to transfer the tokens
        /// @param _value The amount of wei to be approved for transfer
        /// @return Whether the approval was successful or not

    function approve(address _spender, uint _value) returns (bool success) {
            allowed[msg.sender][_spender] = _value;
            Approval(msg.sender, _spender, _value);
            return true;
    }

        /// @param _owner The address of the account owning tokens
        /// @param _spender The address of the account able to transfer the tokens
        /// @return Amount of remaining tokens allowed to spent

    function allowance(address _owner, address _spender) constant returns (uint remaining) {
            return allowed[_owner][_spender];
    }


}
