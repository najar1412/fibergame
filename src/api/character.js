const CHARACTER = {
  name: "kotch thrustwood",
  task: false,
  inventory: [],
  placement: ["fire place"],
  recipes: [
    {
      id: 1,
      name: "fireplace",
      required: [{ name: "wood", quantity: 1 }],
      quantity: 1,
      type: "placeable",
      craftedId: 5,
    },
    {
      id: 2,
      name: "sharp stick",
      required: [{ name: "wood", quantity: 1 }],
      quantity: 1,
      type: "weapon",
      craftedId: 6,
    },
    {
      id: 3,
      name: "shelter",
      required: [{ name: "wood", quantity: 1 }],
      quantity: 1,
      type: "placeable",
      craftedId: 100,
    },
    {
      id: 4,
      name: "workbench",
      required: [{ name: "wood", quantity: 1 }],
      quantity: 1,
      type: "placeable",
      craftedId: 200,
    },
    {
      id: 5,
      name: "smokehouse",
      required: [{ name: "wood", quantity: 1 }],
      quantity: 1,
      type: "placeable",
      craftedId: 300,
    },
    {
      id: 6,
      name: "tannery",
      required: [{ name: "wood", quantity: 1 }],
      quantity: 1,
      type: "placeable",
      craftedId: 400,
    },
    {
      id: 7,
      name: "trading post",
      required: [{ name: "wood", quantity: 1 }],
      quantity: 1,
      type: "placeable",
      craftedId: 500,
    },
  ],
  carrying: [],
};

class ManageCharacter2 {
  constructor() {
    this.characterData = CHARACTER;
  }
  get character() {
    return this.parseCharacter();
  }
  parseCharacter() {
    return this.characterData;
  }

  task() {
    return this.characterData.task;
  }

  name() {
    return this.characterData.name;
  }
  inventory() {
    return this.characterData.inventory;
  }
  carrying() {
    return this.characterData.carrying;
  }
  recipes() {
    return this.characterData.recipes;
  }
  getPlaceables() {
    let result = [];
    this.characterData.inventory.forEach((invItem) => {
      if (invItem.type === "placeable") {
        result.push(invItem);
      }
    });

    return result;
  }
  craftItem(craftableName) {
    let hasMaterials = false;
    let craftedItem;
    this.characterData.recipes.forEach((craft) => {
      if (craft.name === craftableName) {
        // check if craft is possible
        craft.required.forEach((reqItem) => {
          this.characterData.inventory.forEach((invItem) => {
            if (
              reqItem.name === invItem.name &&
              invItem.quantity >= reqItem.quantity
            ) {
              hasMaterials = true;
            }
          });
        });
        if (!hasMaterials) {
          return false;
        }
        // craft item
        craftedItem = {
          name: craft.name,
          quantity: craft.quantity,
          type: craft.type,
          id: craft.craftedId,
        };
        // remove items from inventory
        craft.required.forEach((reqItem) => {
          this.characterData.inventory.forEach((invItem) => {
            if (reqItem.name === invItem.name) {
              invItem.quantity -= reqItem.quantity;
            }
          });
        });
        // add crafted item to inventory
        this.addToInv([craftedItem]);
      }
    });
    if (!hasMaterials) {
      return false;
    }
    return craftedItem;
  }

  addToInv(items) {
    items.forEach((item) => {
      let inv = this.inventory();

      let found = false;
      inv.forEach((invItem) => {
        if (invItem.name === item.name) {
          invItem.quantity += item.quantity;
          found = true;
        }
      });

      if (!found) {
        inv.push(item);
      }
    });
  }

  removeFromInv(items) {
    console.log(items);
    let inv = this.characterData.inventory;
    items.forEach((item) => {
      inv.forEach((invItem, index) => {
        if (invItem.name === item.name) {
          console.log("found" + invItem.name);
          console.log(invItem.quantity, item.quantity);
          if (invItem.quantity >= item.quantity) {
            console.log("reducing quantity");
            invItem.quantity -= item.quantity;

            if (invItem.quantity === 0) {
              console.log("removing from inv");
              inv.splice(index, 1);
            }
          }
        }
      });
    });
  }

  addToCarrying(items) {
    let carrying = this.characterData.carrying;
    items.forEach((item) => {
      let found = false;
      carrying.forEach((carryingItem) => {
        if (carryingItem.name === item.name) {
          carryingItem.quantity += item.quantity;
          found = true;
        }
      });
      if (!found) {
        carrying.push(item);
      }
    });
  }

  removeFromCarrying(items) {
    let carrying = this.characterData.carrying;
    items.forEach((item) => {
      carrying.forEach((carryingItem, index) => {
        if (
          carryingItem.name === item.name &&
          carryingItem.quantity >= carryingItem.quantity
        ) {
          carryingItem.quantity -= item.quantity;

          if (!carryingItem.quantity) {
            carrying.splice(index, 1);
          }
        }
      });
    });
  }
}

export { ManageCharacter2 };
