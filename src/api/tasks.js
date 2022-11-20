let GENERALLOOTTABLE = [
    {name: 'wood', quantity: 1, type: 'general', id: 1},
    {name: 'screw', quantity: 1, type: 'general', id: 2},
    {name: 'copper', quantity: 1, type: 'general', id: 3},
    {name: 'berries', quantity: 1, type: 'general', id: 4},
]

let PLACEABLELOOTTABLE = [
    {name: 'fireplace', quantity: 1, type: 'placeable', id: 5},
]

let WEAPONLOOTTABLE = [
    {name: 'sharp stick', quantity: 1, type: 'weapon', id: 6},
    {name: 'copper sword', quantity: 1, type: 'weapon', id: 7},
]

let ARMORLOOTTABLE = [
    {name: 'leather chest', quantity: 1, type: 'armor', id: 8},
]

let TOOLLOOTTABLE = [
    {name: 'pick', quantity: 1, type: 'weapon', id: 9},
]

let BAGLOOTTABLE = [
    {name: 'leather bag', quantity: 1, type: 'container', id: 10},
]

let NONGENERAL = PLACEABLELOOTTABLE.concat(WEAPONLOOTTABLE, ARMORLOOTTABLE, TOOLLOOTTABLE, BAGLOOTTABLE)

function getLoot(table=GENERALLOOTTABLE, amount=0, rareAmount=1) {
    if (!amount) {
        // get general items
        let itemsToReturn = Math.floor(Math.random() * 2) + 1;
        let items = []

        for (let i=0;i<itemsToReturn;i++) {
            items.push(table[Math.floor(Math.random()*table.length)])
        }

        // get rare items
        let extraLootChance = Math.random()
        if (extraLootChance < .2) {
            for (let i=0;i<rareAmount;i++) {
                items.push(NONGENERAL[Math.floor(Math.random()*table.length)])
            }
            
        }

        return items;
    }
}


function search () {
    return getLoot(GENERALLOOTTABLE);
}

function explore () {
    console.log('explore')
    return getLoot(GENERALLOOTTABLE);
}

let allTasks = {
    search: search,
    explore: explore
}

const getTask = (taskName) => {
    let task = allTasks[`${taskName}`]

    if (task) {
        return task
    } else {
        console.log('function not found')
    }
}


export {explore, getTask};