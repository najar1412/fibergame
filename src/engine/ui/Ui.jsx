import { Fragment, useState, Suspense, useEffect, useRef } from "react";

import LocationDisplay from "./displays/LocationDisplay";
import ActionDisplay from "./displays/ActionDisplay";
import CharacterDisplay from "./displays/CharacterDisplay";
import PlacementDisplay from "./displays/PlacementDisplay";
import StatusBarDisplay from "./displays/StatusBarDisplay";
import ButtonDisplay from "./displays/ButtonDisplay";

const Ui = (props) => {
  switch (props.sceneName) {
    case "create":
      return (
        <div className="absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none  p-8">
          <div className="pointer-events-auto">
            <div onClick={() => props.changeScene("village")}>enter</div>
          </div>
        </div>
      );
    /* case 'house':
                      return (
                          <div className='absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none  p-8'>
                              <LocationDisplay ChangeScene={props.changeScene}/>
                              <CharacterDisplay character={props.character} setPlaceables={props.setPlaceables} characterTask={props.characterTask}/>
                              <ActionDisplay location={HOUSE} character={props.character}/>
                          </div>
                      );
                      break; */
    case "village":
      return (
        <div className="absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none">
          <div className="h-full w-full p-8">
            <LocationDisplay ChangeScene={props.changeScene} />
            <ButtonDisplay
              character={props.character}
              setPlaceables={props.setPlaceables}
            />
            <CharacterDisplay
              character={props.character}
              characterTask={props.characterTask}
            />

            <StatusBarDisplay
              narratorTick={props.narratorTick}
              health={props.health}
              hunger={props.hunger}
              thirst={props.thirst}
              setHealth={props.setHealth}
              setHunger={props.setHunger}
              setThirst={props.setThirst}
            />

            <ActionDisplay
              handleTask={props.handleTask}
              setPlaceables={props.setPlaceables}
              sendMessageToNarrator={props.sendMessageToNarrator}
              location={props.SURROUNDING}
              character={props.character}
              characterTask={props.characterTask}
              setCharacterTask={props.setCharacterTask}
              startTaskTimer={props.startTaskTimer}
            />
            <PlacementDisplay
              character={props.character}
              placeables={props.placeables}
              setCanPlace={props.setCanPlace}
              setSelectableToPlace={props.setSelectableToPlace}
            />
          </div>
        </div>
      );

    case "world":
      return (
        <div className="absolute top-0 z-10 flex flex-col h-screen w-screen pointer-events-none p-8">
          <LocationDisplay ChangeScene={props.changeScene} />
          <ButtonDisplay
            character={props.character}
            setPlaceables={props.setPlaceables}
          />
          <CharacterDisplay
            character={props.character}
            characterTask={props.characterTask}
          />

          <StatusBarDisplay
            narratorTick={props.narratorTick}
            health={props.health}
            hunger={props.hunger}
            thirst={props.thirst}
            setHealth={props.setHealth}
            setHunger={props.setHunger}
            setThirst={props.setThirst}
          />
        </div>
      );
    default:
    // return <House />
  }
};

export default Ui;
