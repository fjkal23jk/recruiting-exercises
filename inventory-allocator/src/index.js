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
           res: the result output, initialized to be an empty object at first.
           inventoryItem: the item set.
           inventoryWarehouse: the inventory set.
        */
        let res = {};
        let inventoryItem = this.items;
        let inventoryWarehouse = this.warehouse;

        // for every item in the item set.
        for (let property in inventoryItem) {

            // created constant amount to check if there's any inventory has amount of item over the current required amount.
            const amount = inventoryItem[property];
            let exceedIndex = -1;

            // created a variable, itemSize, to keep track of the remaining amount needed to fulfill current item.
            let itemSize = inventoryItem[property];

            // if itemSize is already 0, then this item doesn't require anything from warehouse, so move onto next item.
            if (itemSize <= 0) continue;

            // for every inventory in the warehouse.
            for (let i = 0; i < inventoryWarehouse.length; i++) {

                // if the amount of given item this inventory has is greater or equal to the amount required, check exceedIndex to given index.
                if(inventoryWarehouse[i].inventory[property] >= amount){
                    exceedIndex = i;
                }

                // if current item is not in the inventory OR if the inventory has 0 amount of the item, then move onto the next inventory.
                if (!(property in inventoryWarehouse[i].inventory) || inventoryWarehouse[i].inventory[property] <= 0) continue;

                
                // decrement itemSize by the amount of current inventory has on the item,
                itemSize -= inventoryWarehouse[i].inventory[property];

                /*
                    if itemSize is already 0 or less, meaning that previous itemSize is less than the amount of current inventory has on the item,
                    we will only take whatever it's left, aka the previous itemSize.

                    if itemSize is still more than 0, meaning we still have to go to the next inventory, then take how many there is for current inventory.
                */
                let amountProvided = itemSize < 0 ? inventoryWarehouse[i].inventory[property] + itemSize : inventoryWarehouse[i].inventory[property];

                /*
                    if the current inventory is already in res, meaning res already has the inventory, then we update res at specific index.

                    else, we will create a new object for the inventory and push it onto res, finally we will add it into res,
                    with key being the name of the inventory and value being the index of the inventory in res.
                */
                if(inventoryWarehouse[i].name in res){
                    res[inventoryWarehouse[i].name][property] = exceedIndex !== -1 ? amount : amountProvided;
                } else {
                    res[inventoryWarehouse[i].name] = {};
                    res[inventoryWarehouse[i].name][property] = exceedIndex !== -1 ? amount : amountProvided;
                }

                
                // if itemSize is less than 0, meaning we have fulfilled required amount, break out the loop since we do not need to go to the next inventory.
                // or exceedIndex not -1, meaning this inventory can fulfill the amount required already
                if (itemSize <= 0 || exceedIndex !== -1) {
                    break;
                }

            }


            /*
                In this stage, we are handeling the case when there is an inventory at any point, where the amount for given item,
                is larger or equal to the amount required, we will take that inventory instead of spliting among other inventories.
                The variable exceedIndex holds the index of the warehouse that can fulfill the amount.
                We will loop down and if res has such inventory with item previously added in, we will
                    delete the whole key, if the item is the only item in the object,
                    delete the item, if there are other items ind the object.

            */
            if(exceedIndex !== -1){
                for(let i = exceedIndex - 1; i >= 0; i--){
                    if(!(inventoryWarehouse[i].name in res)) continue;
                    
                    let objectLength = Object.keys(res[inventoryWarehouse[i].name]).length;
                    
                    if (objectLength == 1 && property in res[inventoryWarehouse[i].name]) {
                        delete res[inventoryWarehouse[i].name];
                    } else {
                        delete res[inventoryWarehouse[i].name][property];
                    }
                }
                continue;
            }




            /*
                In this stage, we are handeling the case when even with all inventory, the required amount is still not fulfilled,
                we will iterate over res and
                    if current item is the only item in the inventory, then we delete the whole object in res
                    else, we simply delete the specific item in the object.

                an example would be
                itemSize: 2
                property: apple
                BEFORE res: [{omw: {apple: 5}}, {gg: {apple: 5, orange: 10}}]
                AFTER res: [{gg: {orange: 10}}]

            */
            if (itemSize > 0) {
                for (var key in res) {
                    let objectLength = Object.keys(res[key]).length;
                    if (objectLength == 1 && property in res[key]) {
                        delete res[key];
                    } else {
                        delete res[key][property];
                    }
                }
            }
        }

        // create output based on res.
        let resArr = []
        for(var key in res){
            let tempObj = {};
            tempObj[key] = res[key];
            resArr.push(tempObj);
        }


        return resArr;
    }

}


// exporting the class for testing purposes.
module.exports.InventoryAllocator = InventoryAllocator;