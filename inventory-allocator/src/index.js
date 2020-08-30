/*
InventoryAllocator Class with one get method, which calls calcShipment() to calculate the lowest cost shipment.
*/
class InventoryAllocator {

    /* constructor which takes in two inputs,
       items: the item and its corresponding amount required
       warehouse: a set of inventory where each inventory consists of items available, sorted based on shipment cost.
    */
    constructor(items, warehouse) {
        this.items = items;
        this.warehouse = warehouse;
    }
    get cheapestShipment() {
        return this.calcShipment();
    }

    // main method for producing cheapest shipment. 
    calcShipment() {
        
        /* initialize some required variables
           res: the result output, initialized to be an empty list at first.
           inventoryItem: the item set.
           inventoryWarehouse: the inventory set.
           map: a map that maps inventory's name to their corresponding index in res.
        */
        let res = [];
        let inventoryItem = this.items;
        let inventoryWarehouse = this.warehouse;
        let map = {};



        // for every item in the item set.
        for (let property in inventoryItem) {

            // created a variable, itemSize, to keep track of the remaining amount needed to fulfill current item.
            let itemSize = inventoryItem[property];

            // if itemSize is already 0, then this item doesn't require anything from warehouse, so move onto next item.
            if (itemSize <= 0) continue;

            // for every inventory in the warehouse.
            for (let i = 0; i < inventoryWarehouse.length; i++) {

                // if current item is not in the inventory OR if the inventory has 0 amount of the item, then move onto the next inventory.
                if (!(property in inventoryWarehouse[i].inventory) || inventoryWarehouse[i].inventory[property] <= 0) continue;

                let warehouseResult = {};
                
                // decrement itemSize by the amount of current inventory has on the item,
                itemSize -= inventoryWarehouse[i].inventory[property];

                /*
                    if itemSize is already 0 or less, meaning that previous itemSize is less than the amount of current inventory has on the item,
                    we will only take whatever it's left, aka the previous itemSize.

                    if itemSize is still more than 0, meaning we still have to go to the next inventory, then take how many there is for current inventory.
                */
                let amountProvided = itemSize < 0 ? inventoryWarehouse[i].inventory[property] + itemSize : inventoryWarehouse[i].inventory[property];

                /*
                    if the current inventory is already in map, meaning res already has the inventory, then we update res at specific index.

                    else, we will create a new object for the inventory and push it onto res, finally we will add it into map,
                    with key being the name of the inventory and value being the index of the inventory in res.
                */
                if (inventoryWarehouse[i].name in map) {
                    let inventoryIndex = map[inventoryWarehouse[i].name];
                    res[inventoryIndex][inventoryWarehouse[i].name][property] = amountProvided;

                } else {
                    warehouseResult[inventoryWarehouse[i].name] = {};
                    warehouseResult[inventoryWarehouse[i].name][property] = amountProvided;
                    res.push(warehouseResult);
                    map[inventoryWarehouse[i].name] = res.length - 1;
                }


                // if itemSize is less than 0, meaning we have fulfilled required amount, break out the loop since we do not need to go to the next inventory.
                if (itemSize <= 0) {
                    break;
                }

            }


            /*
                In this stage, we are handeling the case when even with all inventory, the required amount is still not fulfilled,
                we will iterate over res and
                    if current item is the only item in the inventory, then we delete the whole object at given index, along with key and value in map.
                    else, we simply delete the specific item in the object.

                an example would be
                itemSize: 2
                property: apple
                BEFORE res: [{omw: {apple: 5}}, {gg: {apple: 5, orange: 10}}]
                AFTER res: [{gg: {orange: 10}}]

            */
            if (itemSize > 0) {
                for (let i = res.length - 1; i >= 0; i--) {
                    let inventoryName = Object.keys(res[i])[0];
                    let objectLength = Object.keys(res[i][inventoryName]).length;
                    
                    if (objectLength == 1 && property in res[i][inventoryName]) {
                        delete map[inventoryName];
                        res.splice(i, 1);
                    } else {
                        delete res[i][inventoryName][property];
                    }
                }
            }
        }

        // at very last, return res.
        return res;
    }

}



// exporting the class for testing purposes.
module.exports.InventoryAllocator = InventoryAllocator;