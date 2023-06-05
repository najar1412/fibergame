import { Fragment, useState, Suspense, useEffect, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import Modal from "react-modal";

import Narrator from "./Narrator";
import LocationDisplay from "../ui/LocationDisplay";
import ActionDisplay from "../ui/ActionDisplay";
import CharacterDisplay from "../ui/CharacterDisplay";
import PlacementDisplay from "../ui/PlacementDisplay";
import ModalSelector from "../comps/modals/ModalSelector";
import StatusBarDisplay from "../ui/StatusBarDisplay";
import ButtonDisplay from "../ui/ButtonDisplay";

import House from "../scenes/House";
import Village from "../scenes/Village";
import World from "../scenes/World";
import Create from "../scenes/Create";

import { getTask } from "../api/tasks";
import { ManageCharacter2 } from "../api/character";

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

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
    name: `players's camp`,
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
    name: "Choad Featherwing's camp using a longer name to test string lengths",
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

// clickable objects in 3d space
const SELECTABLES = [
  {
    name: "fireplace",
    type: "selectable",
    tasks: [],
    // secrets: [],
    color: "rgb(30, 94, 225)",
    description: "A basic fire ring.",
    quantity: 1,
  },
  {
    name: "shelter",
    type: "selectable",
    tasks: [],
    // secrets: [],
    color: "rgb(30, 94, 225)",
    description: "A Basic sleeping area and protection from the elements.",
    quantity: 1,
  },
];

let tempmessages = [
  {
    message:
      "tester tester tester tester tester tester tester tester tester tester tester tester tester tester tester",
    type: "general",
  },
  { message: "tester tester tester2", type: "general", id: 1 },
  { message: "tester tester tester3", type: "general", id: 2 },
  { message: "tester tester tester4", type: "general", id: 3 },
];

const Engine = (props) => {
  const [narratorTick, setNarratorTick] = useState(0);
  const narratorTickTimer = useRef(null); // we can save timer in useRef and pass it to child
  const narratorTickDelay = 10000;
  const taskTickTimer = useRef(null);

  const [sceneName, setSceneName] = useState("create");
  const [character, setCharacter] = useState(new ManageCharacter2());
  const [characterTask, setCharacterTask] = useState(character.task());
  const [health, setHealth] = useState(70);
  const [hunger, setHunger] = useState(70);
  const [thirst, setThirst] = useState(70);

  const [placeables, setPlaceables] = useState([]);
  const [canPlace, setCanPlace] = useState(false);
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedMesh, setSelectedMesh] = useState({});
  const [selectableToPlace, setSelectableToPlace] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [narratorMessage, setNarratorMessage] = useState([]);

  /* useEffect(() => {
    // useRef value stored in .current property
    narratorTickTimer.current = setInterval(
      () => setNarratorTick((v) => v + 1),
      1 * narratorTickDelay
    );

    // clear on component unmount
    return () => {
      clearInterval(narratorTickTimer.current);
    };
  }, []); */

  const startTaskTimer = (duration, func) => {
    taskTickTimer.current = setTimeout(() => {
      clearInterval(taskTickTimer.current);
      func();
    }, 1 * duration);
  };

  function sendMessageToNarrator(message) {
    const copyMessage = JSON.parse(JSON.stringify(message));
    setNarratorMessage((messages) => [copyMessage, ...messages]);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function ChangeScene(sceneName) {
    // handle ui
    // handle 3d
    setSceneName(sceneName);
  }

  function SceneSelector(sceneName) {
    switch (sceneName) {
      case "create":
        return <Create data={HOUSE} character={character.character} />;
      case "house":
        return <House data={HOUSE} character={character.character} />;
      case "village":
        return (
          <Village
            data={SURROUNDING}
            canPlace={canPlace}
            setCanPlace={setCanPlace}
            placeables={placeables}
            setPlaceables={setPlaceables}
            character={character}
            placedItems={placedItems}
            setPlacedItems={setPlacedItems}
            selectables={SELECTABLES}
            openModal={openModal}
            selectedMesh={selectedMesh}
            setSelectedMesh={setSelectedMesh}
            selectableToPlace={selectableToPlace}
          />
        );
      case "world":
        return (
          <World
            data={WORLD}
            locations={WORLDLOCATIONS}
            character={character.character}
            openModal={openModal}
            selectedMesh={selectedMesh}
            setSelectedMesh={setSelectedMesh}
          />
        );
      default:
        return <House data={HOUSE} character={character.character} />;
    }
  }

  function HandleUi(sceneName) {
    switch (sceneName) {
      case "create":
        return (
          <div className="absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none  p-8">
            <div className="pointer-events-auto">
              <div onClick={() => ChangeScene("village")}>enter</div>
            </div>
          </div>
        );
      /* case 'house':
                return (
                    <div className='absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none  p-8'>
                        <LocationDisplay ChangeScene={ChangeScene}/>
                        <CharacterDisplay character={character} setPlaceables={setPlaceables} characterTask={characterTask}/>
                        <ActionDisplay location={HOUSE} character={character}/>
                    </div>
                );
                break; */
      case "village":
        return (
          <div className="absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none p-8">
            <Narrator narratorMessage={narratorMessage} />

            <LocationDisplay ChangeScene={ChangeScene} />
            <ButtonDisplay
              character={character}
              setPlaceables={setPlaceables}
            />
            <CharacterDisplay
              character={character}
              characterTask={characterTask}
            />

            <StatusBarDisplay
              narratorTick={narratorTick}
              health={health}
              hunger={hunger}
              thirst={thirst}
              setHealth={setHealth}
              setHunger={setHunger}
              setThirst={setThirst}
            />

            <ActionDisplay
              handleTask={handleTask}
              setPlaceables={setPlaceables}
              sendMessageToNarrator={sendMessageToNarrator}
              location={SURROUNDING}
              character={character}
              characterTask={characterTask}
              setCharacterTask={setCharacterTask}
              startTaskTimer={startTaskTimer}
            />
            <PlacementDisplay
              character={character}
              placeables={placeables}
              setCanPlace={setCanPlace}
              setSelectableToPlace={setSelectableToPlace}
            />
          </div>
        );

      case "world":
        return (
          <div className="absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none p-8">
            <Narrator narratorMessage={narratorMessage} />

            <LocationDisplay ChangeScene={ChangeScene} />
            <ButtonDisplay
              character={character}
              setPlaceables={setPlaceables}
            />
            <CharacterDisplay
              character={character}
              characterTask={characterTask}
            />

            <StatusBarDisplay
              narratorTick={narratorTick}
              health={health}
              hunger={hunger}
              thirst={thirst}
              setHealth={setHealth}
              setHunger={setHunger}
              setThirst={setThirst}
            />
          </div>
        );
      default:
      // return <House />
    }
  }

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function handleTask(task) {
    let taskFunc = getTask(task.name);
    let loot = taskFunc();
    character.addToInv(loot);
    loot.forEach((item) => {
      if (item.type === "placeable") {
        setPlaceables((placeables) => [...placeables, item]);
      }
    });
    setCharacterTask(false);
    sendMessageToNarrator({
      type: "found",
      items: loot,
      activity: task.location,
      id: makeid(5),
    });
  }

  return (
    <Fragment>
      {HandleUi(sceneName)}

      <div id="canvas-container" className="fixed top-0 h-full w-full">
        <Canvas shadows>
          <Suspense fallback={<Loading />}>{SceneSelector(sceneName)}</Suspense>
        </Canvas>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="location-modal"
      >
        <div
          onClick={closeModal}
          className="absolute top-0 right-0 mr-8 mt-8 cursor-pointer"
        >
          close
        </div>

        <ModalSelector
          startTaskTimer={startTaskTimer}
          selectedMesh={selectedMesh}
          handleTask={handleTask}
          characterTask={characterTask}
          setCharacterTask={setCharacterTask}
        />
      </Modal>
    </Fragment>
  );
};

export default Engine;
