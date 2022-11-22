import { getLoot } from "./items";

function search() {
  console.log("cearch");
  return getLoot();
}

function explore() {
  console.log("explore");
  return getLoot();
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
