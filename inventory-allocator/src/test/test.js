const InventoryAllocator = require('../index').InventoryAllocator;
var assert = require('assert');


/*
I am using Mocha Unit Test to do testing on InventoryAllocator.

First part of the tests is from the Examples provided on GitHub.
Second part of the tests involve in more board cases.
Third part of the tests involve in more edge cases. 

(P.S.) I am using stringify to compare the expected result and the real result,
just because I found that being a easy way to compare array of objects. 
I personally do not think the order of objects in the output matters, but just for comparision purposes,
I will have it ordered the way my algorithm wanted. If you were to compare the all items in the output accordingly, there are the same.
Details on running the test in [README.md]
*/


// Given cases
describe('Given tests for InventoryAllocator', function () {
    describe('Example Test 1', function () {
        it('Happy Case, exact inventory match!', function () {
            let itemSet = {};
            itemSet.apple = 1;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 1;

            const expectedResult = [{ 'owd': { 'apple': 1 } }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
    describe('Example Test 2', function () {
        it('Not enough inventory -> no allocations!', function () {
            let itemSet = {};
            itemSet.apple = 1;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 0;

            const expectedResult = [];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
    describe('Example Test 3', function () {
        it('Should split an item across warehouses if that is the only way to completely ship an item', function () {
            let itemSet = {};
            itemSet.apple = 10;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 5;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.apple = 5;

            const expectedResult = [{ 'owd': { 'apple': 5 } }, { 'dm': { 'apple': 5 } }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
});

// Board cases
describe('Board Cases Testing for InventoryAllocator', function () {
    describe('Board Test 1', function () {
        it('Will always choose the lower cost inventory first', function () {
            let itemSet = {};
            itemSet.apple = 10;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 9;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.apple = 10;

            const expectedResult = [{ 'owd': { 'apple': 9 } }, { 'dm': { 'apple': 1 } }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });

    describe('Board Test 2', function () {
        it('Multiple items required', function () {
            let itemSet = {};
            itemSet.apple = 5;
            itemSet.banana = 5;
            itemSet.orange = 5;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 5;
            inventorySet[0].inventory.orange = 10;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.banana = 5;
            inventorySet[1].inventory.orange = 10;

            const expectedResult = [{ 'owd': { 'apple': 5, 'orange': 5 } }, { 'dm': { 'banana': 5 } }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
    describe('Board Test 3', function () {
        it('When the first inventory has all the items required', function () {
            let itemSet = {};
            itemSet.apple = 10;
            itemSet.banana = 10;
            itemSet.orange = 10;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 100;
            inventorySet[0].inventory.orange = 100;
            inventorySet[0].inventory.banana = 100;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.apple = 100;
            inventorySet[0].inventory.orange = 100;
            inventorySet[0].inventory.banana = 100;

            const expectedResult = [{ 'owd': { 'apple': 10, 'banana': 10, 'orange': 10 } }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
    describe('Board Test 4', function () {
        it('More board case testing with multiple items and mutliple inventory', function () {
            let itemSet = {};
            itemSet.apple = 10;
            itemSet.banana = 10;
            itemSet.orange = 10;
            itemSet.pineapple = 10;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 2;
            inventorySet[0].inventory.orange = 0;
            inventorySet[0].inventory.banana = 0;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.orange = 5;
            inventorySet[1].inventory.pineapple = 2;
            inventorySet[1].inventory.banana = 8;
            
            inventorySet[2] = {};
            inventorySet[2].name = "cc";
            inventorySet[2].inventory = {};
            inventorySet[2].inventory.apple = 15;
            inventorySet[2].inventory.orange = 15;
            inventorySet[2].inventory.banana = 20;

            inventorySet[3] = {};
            inventorySet[3].name = "gg";
            inventorySet[3].inventory = {};
            inventorySet[3].inventory.pineapple = 10;

            const expectedResult = [{ 'owd': { 'apple': 2} }, { 'cc': { 'apple': 8, 'banana': 2, 'orange': 5} }, { 'dm': { 'banana': 8, 'orange': 5, 'pineapple': 2} }, { 'gg': { 'pineapple': 8} }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
});

// Edge cases
describe('Edge Cases Testing for InventoryAllocator', function () {
    describe('Edge Test 1', function () {
        it('No inventory has the item', function () {
            let itemSet = {};
            itemSet.apple = 10;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.orange = 9;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.pineapple = 10;

            const expectedResult = [];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });

    describe('Edge Test 2', function () {
        it('Multiple inventory but not enough supply for multiple items', function () {
            let itemSet = {};
            itemSet.apple = 100;
            itemSet.banana = 100;
            itemSet.orange = 100;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 5;
            inventorySet[0].inventory.orange = 10;
            inventorySet[0].inventory.banana = 25;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.apple = 5;
            inventorySet[1].inventory.orange = 10;
            inventorySet[1].inventory.banana = 25;

            inventorySet[2] = {};
            inventorySet[2].name = "pp";
            inventorySet[2].inventory = {};
            inventorySet[2].inventory.apple = 5;
            inventorySet[2].inventory.orange = 10;
            inventorySet[2].inventory.banana = 25;

            inventorySet[3] = {};
            inventorySet[3].name = "zz";
            inventorySet[3].inventory = {};
            inventorySet[3].inventory.apple = 100;
            inventorySet[3].inventory.orange = 10;
            inventorySet[3].inventory.banana = 24;

            const expectedResult = [{ 'owd': { 'apple': 5 } }, { 'dm': { 'apple': 5 } }, { 'pp': { 'apple': 5 } }, { 'zz': { 'apple': 85 } }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
    describe('Edge Test 3', function () {
        it('Every inventory only has one item', function () {
            let itemSet = {};
            itemSet.apple = 10;
            itemSet.banana = 10;
            itemSet.orange = 10;
            itemSet.pineapple = 10;
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 1000;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.banana = 5;

            inventorySet[2] = {};
            inventorySet[2].name = "caw";
            inventorySet[2].inventory = {};
            inventorySet[2].inventory.orange = 11;

            inventorySet[3] = {};
            inventorySet[3].name = "gg";
            inventorySet[3].inventory = {};
            inventorySet[3].inventory.pineapple = 0;

            const expectedResult = [{ 'owd': { 'apple': 10 } }, { 'caw': { 'orange': 10 } }];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
    describe('Edge Test 4', function () {
        it('No item required', function () {
            let itemSet = {};
            let inventorySet = [];
            inventorySet[0] = {};
            inventorySet[0].name = "owd";
            inventorySet[0].inventory = {};
            inventorySet[0].inventory.apple = 1000;

            inventorySet[1] = {};
            inventorySet[1].name = "dm";
            inventorySet[1].inventory = {};
            inventorySet[1].inventory.banana = 5;

            inventorySet[2] = {};
            inventorySet[2].name = "caw";
            inventorySet[2].inventory = {};
            inventorySet[2].inventory.orange = 11;

            inventorySet[3] = {};
            inventorySet[3].name = "gg";
            inventorySet[3].inventory = {};
            inventorySet[3].inventory.pineapple = 0;

            const expectedResult = [];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
    describe('Edge Test 5', function () {
        it('Empty warehouse', function () {
            let itemSet = {};
            itemSet.apple = 5;
            itemSet.pineapple = 5;
            let inventorySet = [];

            const expectedResult = [];
            const inventoryClass = new InventoryAllocator(itemSet, inventorySet);
            const result = inventoryClass.cheapestShipment;
            assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
        });
    });
});