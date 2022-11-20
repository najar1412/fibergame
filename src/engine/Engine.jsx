import { Fragment, useState, useEffect, Suspense } from "react"


import { Canvas} from '@react-three/fiber'
import Modal from 'react-modal';
import LocationDisplay from "../ui/LocationDisplay";
import ActionMenu from "../ui/ActionMenu";
import CharacterDisplay from "../ui/CharacterDisplay";
import CarryingDisplay from "../ui/CarryingDisplay";
import AwaitingPlacement from "../ui/AwaitingPlacement";

import House from '../scenes/House';
import Village from '../scenes/Village';
import World from '../scenes/World';
import Create from '../scenes/Create';
import { getTask } from "../api/tasks";

import ModalSelector from "../3dComps/ModalSelector";

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

const ITEMTYPES = ['general', 'drop']

const GENERAL = {
    name: 'a general item',
    quantity: 1,
    type: 'general',
    id: 1
}

const DROP = {
    name: 'a droppable item',
    quantity: 1,
    type: 'drop',
    id: 2
}

const CHARACTER = {
    name: 'kotch thrustwood',
    task: false,
    inventory: [],
    placement: [
        'fire place'
    ],
    craftables: [
        {   
            id: 1,
            name: 'fireplace',
            required: [
                {name: 'wood', quantity: 2}
            ],
            quantity: 1,
            type: 'drop',
            craftedId: 3
        }
    ],
    carrying: []
}

const HOUSE = {
    tasks: [
    ]
}

const SURROUNDING = {
    tasks: [
        {id: 1, name: 'search', verb: 'searching', location: 'surroundings', timer: 1000}
    ]
}

const WORLD = {
    tasks: []
}

const WORLDLOCATIONS = [
    {
        name: `${CHARACTER.name}'s camp`,
        type: 'camp',
        tasks: [],
        secrets: [],
        color: 'rgb(30, 94, 225)',
        latlong: [40.71761193411173, -74.00703590765514],
        description: 'This moderate-sized town is located in a valley and looks very old-fashioned.  It is best-known for its spring festival.  Also, rumor has it that many of the towns citizens are involved in some sort of secret project.'
    },
    {
        name: 'Ruined Factory',
        type: 'poi',
        tasks: [{id: 1, name: 'explore', timer: 100000, verb: 'exploring', location: 'Ruined Factory'}],
        secrets: [{id:1, description:'higher chance to find metal', known: false}],
        color: 'rgb(103, 58, 183)',
        latlong: [29.181634715509766, 101.15462958038809],
        description: 'This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.'
    },
    {
        name: "Choad Featherwings's camp",
        type: 'player camp',
        tasks: [{id: 2, name: 'explore', timer: 100000, verb: 'exploring', location: "Choad Featherwing's camp"}, {id: 3, name: 'raid', timer: 10000, verb: 'raiding', location: "Choad Featherwing's camp"}],
        secrets: [],
        color: 'rgb(169, 2, 2)',
        latlong: [-42.04538429340975, -69.61126993398138],
        description: 'This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.'
    },
    {
        name: 'supply crate',
        type: 'event',
        tasks: [{id: 4, name: 'explore', timer: 100000, verb: 'exploring', location: "supply crate"}],
        secrets: [{id:2, description:'superior source of general items', known: false}],
        color: 'rgb(225, 85, 40)',
        latlong: [67.86793861362021, -141.2839090245714],
        description: 'This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.'
    },
    {
        name: 'copper mine',
        type: 'resource',
        tasks: [{id: 5, name: 'explore', timer: 100000, verb: 'exploring', location: "copper mine"}],
        secrets: [{id:3, description:'superior chance to find copper', known: true}, {id:4, description:'higher chance to find metal', known: false}],
        color: 'rgb(76, 175, 80)',
        latlong: [20.149487391978546, 51.192195156767156],
        description: 'This large town is located in the mountains and looks very old-fashioned.  It is best-known for the produce it exports and its fishing spots.  Also, there is an old ceremonial site nearby.'
    }
]

const SELECTABLES = [
    {
        name: 'fireplace',
        type: 'selectable',
        tasks: [],
        // secrets: [],
        color: 'rgb(30, 94, 225)',
        description: 'A basic fire ring.'
    }
]

class ManageCharacter {
    constructor(data) {
      this.character = data;
    }
    character() {
      return this.character
    }
    name() {
    return this.character.name
    }
    inventory() {
        return this.character.inventory
      }
      carrying() {
        return this.character.carrying
      }
      craftables() {
        return this.character.craftables
      }
      getPlaceables() {
        let result = []
        this.character.inventory.forEach(invItem => {
            if (invItem.type === 'drop') {
                result.push(invItem)
            }
        })

        return result;

      }
      craftItem(craftableName) {
        let hasMaterials = false;
        this.character.craftables.forEach(craft => {
            if (craft.name === craftableName) {
                // check if craft is possible
                
                craft.required.forEach(reqItem => {
                    this.character.inventory.forEach(invItem => {
                        if (reqItem.name === invItem.name && invItem.quantity >= reqItem.quantity) {
                            hasMaterials = true
                        }
                    })
                })
                if (!hasMaterials) {
                    return false;
                }
                let craftedItem = {name: craft.name, quantity: craft.quantity, type: craft.type, id: craft.craftedId}
                // remove items from inventory
                craft.required.forEach(reqItem => {
                    this.character.inventory.forEach(invItem => {
                        if (reqItem.name === invItem.name) {
                            invItem.quantity -= reqItem.quantity
                        }
                    })
                })
                // add crafted item to inventory
                this.addToInv([craftedItem])
                
            }
        })
        if (!hasMaterials) {
            return false;
        }
        return true;
      }

    addToInv(items) {
        let inv = this.character.inventory
        items.forEach(item => {
            let found = false;
            inv.forEach(invItem => {
                
                if (invItem.name === item.name) {
                    invItem.quantity += item.quantity
                    found = true
                } 
            })
            if (!found) {
                inv.push(item)
            }
        })
    }

    removeFromInv(items) {
        let inv = this.character.inventory
        items.forEach(item => {
            inv.forEach((invItem, index) => {
                
                if (invItem.name === item.name && invItem.quantity >= invItem.quantity) {
                    invItem.quantity -= item.quantity

                    if (!invItem.quantity) {
                        inv.splice(index, 1)
                    }
                }

                
            })
        })
    }

    addToCarrying(items) {
        let carrying = this.character.carrying
        items.forEach(item => {
            let found = false;
            carrying.forEach(carryingItem => {
                
                if (carryingItem.name === item.name) {
                    carryingItem.quantity += item.quantity
                    found = true
                } 
            })
            if (!found) {
                carrying.push(item)
            }
        })
    }

    removeFromCarrying(items) {
        let carrying = this.character.carrying
        items.forEach(item => {
            carrying.forEach((carryingItem, index) => {
                
                if (carryingItem.name === item.name && carryingItem.quantity >= carryingItem.quantity) {
                    carryingItem.quantity -= item.quantity

                    if (!carryingItem.quantity) {
                        carrying.splice(index, 1)
                    }
                }

                
            })
        })
    }
}

const Engine = (props) => {

    const [sceneName, setSceneName] = useState('create');
    const [character, setCharacter] = useState(new ManageCharacter(CHARACTER));
    const [characterTask, setCharacterTask] = useState(CHARACTER.task)
    const [placeables, setPlaceables] = useState([])
    const [canPlace, setCanPlace] = useState(false)
    const [placedItems, setPlacedItems] = useState([])
    const [selectedMesh, setSelectedMesh] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectableToPlace, setSelectableToPlace] = useState(null)
  
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
        setSceneName(sceneName)
    }
    
    function SceneSelector(sceneName) {
        switch (sceneName) {
            case 'create':
                return <Create data={HOUSE} character={character.character}/>
                break;
            case 'house':
                return <House data={HOUSE} character={character.character}/>
                break;
            case 'village':
                return <Village data={SURROUNDING} canPlace={canPlace} setCanPlace={setCanPlace} 
                placeables={placeables} setPlaceables={setPlaceables} character={character}
                placedItems={placedItems} setPlacedItems={setPlacedItems} selectables={SELECTABLES}
                openModal={openModal} selectedMesh={selectedMesh} setSelectedMesh={setSelectedMesh} selectableToPlace={selectableToPlace}
                />
                break;
            case 'world':
                return <World data={WORLD} locations={WORLDLOCATIONS} character={character.character} 
                openModal={openModal} selectedMesh={selectedMesh} setSelectedMesh={setSelectedMesh}
                />
                break;
            default:
                return <House data={HOUSE} character={character.character}/>
        }
    }

    function HandleUi(sceneName) {

        switch (sceneName) {
            case 'create':
                return (
                    <div className='absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none  p-8'>
            
                        <div className="pointer-events-auto">
                            <div onClick={() => ChangeScene('village')}>enter</div>
                        </div>
                        
                    </div>
                );
            break;
            /* case 'house':
                return (
                    <div className='absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none  p-8'>
                        <LocationDisplay ChangeScene={ChangeScene}/>
                        <CharacterDisplay character={character} setPlaceables={setPlaceables} characterTask={characterTask}/>
                        <ActionMenu location={HOUSE} character={character}/>
                    </div>
                );
                break; */
            case 'village':
                return (
                    <div className='absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none p-8'>
                        <CharacterDisplay character={character} setPlaceables={setPlaceables} characterTask={characterTask} />
                        <LocationDisplay ChangeScene={ChangeScene}/>
                        
                        <ActionMenu location={SURROUNDING} character={character} characterTask={characterTask} setCharacterTask={setCharacterTask}/>
                        <AwaitingPlacement character={character} placeables={placeables} setCanPlace={setCanPlace} setSelectableToPlace={setSelectableToPlace}/>
                    </div>
                );
                break;
            case 'world':
                return (
                    <div className='absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none p-8'>
                        <CharacterDisplay character={character} setPlaceables={setPlaceables} characterTask={characterTask}/>
                        <LocationDisplay ChangeScene={ChangeScene}/>
                        
                        <ActionMenu location={WORLD} character={character} characterTask={characterTask} setCharacterTask={setCharacterTask}/>
                        {/* <RagDollDisplay />
                        <CarryingDisplay character={character}/> */}

                    </div>
                );
                break;
            default:
                // return <House />
        }

    }

    function handleTask(taskName) {
        
        let task = getTask(taskName)
        let loot = task()
        character.addToInv(loot)
        setCharacterTask(false)

    }

    useEffect(() => {
    }, [])

    return <Fragment>

    {HandleUi(sceneName)}

    <div id="canvas-container" className="fixed top-0 h-full w-full">

    <Canvas>
        <Suspense fallback={<Loading />}>
            {SceneSelector(sceneName)}
        </Suspense>
    </Canvas>

    </div>

    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="location-modal"
    >
        <div onClick={closeModal} className="absolute top-0 right-0 mr-8 mt-8 cursor-pointer">close</div>

        <ModalSelector selectedMesh={selectedMesh} handleTask={handleTask} characterTask={characterTask} setCharacterTask={setCharacterTask} />


    </Modal>

    </Fragment>

}

export default Engine;