pragma solidity ^0.4.19;

contract AddressToBytes32Map {
    mapping(address => bytes32) internal map;

    function add(address _key, bytes32 _value) public {
        map[_key] = _value;
    }

    function remove(address _key) public {
        require(contains(_key));
        delete map[_key];
    }
    
    function contains(address _key) public view returns (bool) {
        return map[_key] != 0;
    }
    
    function getByKey(address _key) public view returns (bytes32) {
        return map[_key];
    }
}