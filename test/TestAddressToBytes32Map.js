var Web3 = require('web3');

const AddressToBytes32Map = artifacts.require('./AddressToBytes32Map.sol');

contract('AddressToBytes32Map', function (accounts) {
    var contract;
    before('setup contract for each test', async () => {
        contract = await AddressToBytes32Map.new();
        console.log('AddressToBytes32Map is deployed: ' + contract.address);
    })

    it("Add first account", async () => {
        var account1 = accounts[0];
        await contract.add(account1, web3.sha3(account1));

        assert.equal(await contract.contains(account1), true);
        assert.equal(await contract.getByKey(account1), web3.sha3(account1));
    });
    it("Remove first account", async () => {
        var account1 = accounts[0];
        assert.equal(await contract.contains(account1), true);
        assert.equal(await contract.getByKey(account1), web3.sha3(account1));

        await contract.remove(account1);

        assert.equal(await contract.contains(account1), false);
        assert.equal(await contract.getByKey(account1), 0);
    });
    it("Add first & second accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];

        // add first account
        await contract.add(account1, web3.sha3(account1));

        assert.equal(await contract.contains(account1), true);
        assert.equal(await contract.getByKey(account1), web3.sha3(account1));

        // add second account
        await contract.add(account2, web3.sha3(account2));

        assert.equal(await contract.contains(account2), true);
        assert.equal(await contract.getByKey(account2), web3.sha3(account2));

        // add second account again
        await contract.add(account2, web3.sha3(account2));

        assert.equal(await contract.contains(account2), true);
        assert.equal(await contract.getByKey(account2), web3.sha3(account2));
    });
    it("Add third & fourth accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];
        var account3 = accounts[2];
        var account4 = accounts[3];

        // add third account
        await contract.add(account3, web3.sha3(account3));

        assert.equal(await contract.contains(account3), true);
        assert.equal(await contract.getByKey(account3), web3.sha3(account3));

        // add fourth account
        await contract.add(account4, web3.sha3(account4));

        assert.equal(await contract.contains(account4), true);
        assert.equal(await contract.getByKey(account4), web3.sha3(account4));
    });
    it("remove accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];
        var account3 = accounts[2];
        var account4 = accounts[3];

        // remove second account
        await contract.remove(account2);

        assert.equal(await contract.contains(account2), false);
        assert.equal(await contract.getByKey(account2), 0);

        // remove first account
        await contract.remove(account1);

        assert.equal(await contract.contains(account1), false);
        assert.equal(await contract.getByKey(account1), 0);
    });
})