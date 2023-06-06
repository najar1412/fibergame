// location task data
const HOUSE = {
  tasks: [],
};

const SURROUNDING = {
  tasks: [
    {
      id: 1,
      name: "search",
      verb: "searching",
      location: "surroundings",
      duration: 3000,
    },
  ],
};

const WORLD = {
  tasks: [],
};

const WORLDLOCATIONS = [
  {
    name: `kotch's village`,
    type: "camp",
    tasks: [],
    secrets: [],
    color: "rgb(30, 94, 225)",
    latlong: [40.71761193411173, -74.00703590765514],
    description:
      "This moderate-sized town is located in a valley and looks very old-fashioned.  It is best-known for its spring festival.  Also, rumor has it that many of the towns citizens are involved in some sort of secret project.",
  },
  {
    name: "Ruined Factory",
    type: "poi",
    tasks: [
      {
        id: 1,
        name: "explore",
        duration: 3000,
        verb: "exploring",
        location: "Ruined Factory",
      },
    ],
    secrets: [
      { id: 1, description: "higher chance to find metal", known: false },
    ],
    color: "rgb(103, 58, 183)",
    latlong: [29.181634715509766, 101.15462958038809],
    description:
      "This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.",
  },
  {
    name: "Choad Featherwing's village",
    type: "player camp",
    tasks: [
      {
        id: 2,
        name: "explore",
        duration: 3000,
        verb: "exploring",
        location: "Choad Featherwing's camp",
      },
      {
        id: 3,
        name: "raid",
        duration: 10000,
        verb: "raiding",
        location: "Choad Featherwing's camp",
      },
    ],
    secrets: [],
    color: "rgb(169, 2, 2)",
    latlong: [-42.04538429340975, -69.61126993398138],
    description:
      "This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.",
  },
  {
    name: "supply crate",
    type: "event",
    tasks: [
      {
        id: 4,
        name: "explore",
        duration: 3000,
        verb: "exploring",
        location: "supply crate",
      },
    ],
    secrets: [
      { id: 2, description: "superior source of general items", known: false },
    ],
    color: "rgb(225, 85, 40)",
    latlong: [67.86793861362021, -141.2839090245714],
    description:
      "This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.",
  },
  {
    name: "copper mine",
    type: "resource",
    tasks: [
      {
        id: 5,
        name: "explore",
        duration: 3000,
        verb: "exploring",
        location: "copper mine",
      },
    ],
    secrets: [
      { id: 3, description: "superior chance to find copper", known: true },
      { id: 4, description: "higher chance to find metal", known: false },
    ],
    color: "rgb(76, 175, 80)",
    latlong: [20.149487391978546, 51.192195156767156],
    description:
      "This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.",
  },
];

export { HOUSE, SURROUNDING, WORLD, WORLDLOCATIONS };
