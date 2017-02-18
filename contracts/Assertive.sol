pragma solidity ^0.4.7;

/// @title Assertive contract
/// @ Initial author / Modification : Srinivasan Swaminathan /
/// @notice Asserts function
contract Assertive {

  function assert(bool assertion) internal {
      if (!assertion) throw;
  }

}
