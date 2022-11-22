import { getLoot } from "./items";

function search() {
  let loot = getLoot();
  return loot;
}

function explore() {
  let loot = getLoot();
  return loot;
}

let allTasks = {
  search: search,
  explore: explore,
};

const getTask = (taskName) => {
  let task = allTasks[`${taskName}`];

  if (task) {
    return task;
  } else {
    console.log("function not found");
  }
};

export { getTask };
