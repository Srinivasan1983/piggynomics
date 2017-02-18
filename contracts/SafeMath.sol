pragma solidity ^0.4.7;

import "./Assertive.sol";


/**
 * Math operations with safety checks
 */
contract SafeMath {
  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function safeDiv(uint a, uint b) internal returns (uint) {
    uint c = a / b;
    assert(b != 0 && (( a % b == 0 && c * b == a ) || ( a % b != 0 && c * (b + a % b) == a )));
    return c;
  }

  function assert(bool assertion) internal {
    if (!assertion) throw;
  }
}
