import { Fragment, useState, Suspense, useEffect, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import Modal from "react-modal";

import Narrator from "./Narrator";
import Toast from "./Toast";
import Ui from "./ui/Ui";
import ModalSelector from "./ui/modals/ModalSelector";

import House from "./scenes/House";
import Village from "./scenes/Village";
import World from "./scenes/World";
import Create from "./scenes/Create";

import { getTask } from "../api/tasks";
import { ManageCharacter2 } from "../api/character";
import { makeId } from "./helpers/helpers";
import { HOUSE, SURROUNDING, WORLD, WORLDLOCATIONS } from "../api/locations";

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

let getNarratorMessage = () => {
  return tempmessages[Math.floor(Math.random() * tempmessages.length)];
};

const Engine = (props) => {
  const SEED = 20;
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

  useEffect(() => {
    // useRef value stored in .current property
    narratorTickTimer.current = setInterval(
      () => setNarratorTick((v) => v + 1),
      1 * narratorTickDelay
    );

    // clear on component unmount
    return () => {
      clearInterval(narratorTickTimer.current);
    };
  }, []);

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

  function changeScene(sceneName) {
    // handle ui
    // handle 3d
    setSceneName(sceneName);
  }

  function sceneSelector(sceneName) {
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
            SEED={SEED}
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
      id: makeId(5),
    });
  }

  return (
    <Fragment>
      <div id="canvas-container" className="fixed top-0 h-full w-full">
        <Canvas shadows>
          <Suspense fallback={<Loading />}>{sceneSelector(sceneName)}</Suspense>
        </Canvas>
      </div>

      <Toast narratorMessage={narratorMessage} />

      <Narrator
        narratorTick={narratorTick}
        getNarratorMessage={getNarratorMessage}
      />

      <Ui
        setHealth={setHealth}
        setHunger={setHunger}
        setThirst={setThirst}
        health={health}
        hunger={hunger}
        thirst={thirst}
        characterTask={characterTask}
        setPlaceables={setPlaceables}
        sceneName={sceneName}
        character={character}
        tempmessages={tempmessages}
        changeScene={changeScene}
        narratorTick={narratorTick}
        narratorMessage={narratorMessage}
        handleTask={handleTask}
        sendMessageToNarrator={sendMessageToNarrator}
        SURROUNDING={SURROUNDING}
        setCharacterTask={setCharacterTask}
        startTaskTimer={startTaskTimer}
        placeables={placeables}
        setCanPlace={setCanPlace}
        setSelectableToPlace={setSelectableToPlace}
      />

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
