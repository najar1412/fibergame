import { Fragment, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import IsoControls from "../controls/IsoControls";

import { RockLgModel, RockMdModel } from "../models/Rocks";
import { Tree01Model } from "../models/Trees";
import EnvironmentLighting from "./EnvironmentLighting";
import Character from "../models/Character";
import Fireplace from "../models/Fireplace";
import Shelter from "../models/Shelter";
import ScatterInstance from "../helpers/ScatterInstance";
import { deg2rad } from "../helpers/helpers";

const Village = (props) => {
  // global
  const WORLDSIZE = [100, 100];
  const environmentGroup = useRef();
  const groundPlane = useRef();

  // helpers
  const handleRemovePlaceable = (item) => {
    let newPlaceables = JSON.parse(JSON.stringify(props.placeables));
    newPlaceables.every((placeable, index) => {
      if (placeable.name === item.name) {
        newPlaceables.splice(index, 1);
        return false;
      }
    });
    props.setPlaceables(newPlaceables);
  };

  function handlePlacePlaceable(e) {
    if (props.canPlace) {
      let selectableData = getSelectableData(props.selectableToPlace);

      selectableData.position = e.point;

      props.setPlacedItems((placedItems) => [...placedItems, selectableData]);
      props.setCanPlace(false);
      //remove item from nventory
      props.character.removeFromInv([selectableData]);
      handleRemovePlaceable(selectableData);
    }
  }

  function selectMesh(e) {
    props.setSelectedMesh(e.eventObject);
    props.openModal(true);
  }

  function getSelectableData(name) {
    let item;
    props.selectables.forEach((selectable) => {
      if (selectable.name === name) {
        item = selectable;
      }
    });

    return item;
  }

  // placeable comp
  const listItems = props.placedItems.map((item, index) => {
    switch (item.name) {
      case "fireplace":
        return <Fireplace item={item} key={index} selectMesh={selectMesh} />;
      case "shelter":
        return <Shelter item={item} key={index} selectMesh={selectMesh} />;
    }
  });

  useFrame(() => {
    // setup 3d objects
    environmentGroup.current.rotation.x = deg2rad(-90);
  });

  return (
    <Fragment>
      <EnvironmentLighting />

      <PerspectiveCamera makeDefault />
      <IsoControls screenSpacePanning={true} />

      <group ref={environmentGroup}>
        <mesh
          ref={groundPlane}
          onClick={(e) => handlePlacePlaceable(e)}
          receiveShadow
        >
          <planeGeometry
            args={[WORLDSIZE[0] * 2, WORLDSIZE[1] * 2, 100, 100]}
          />
          <meshPhysicalMaterial color="rgb(225, 249, 226)" />
        </mesh>

        <ScatterInstance
          bounds={WORLDSIZE}
          SEED={props.SEED}
          mesh={RockLgModel}
          groundPlane={groundPlane}
          threshold={[0.95, 1.0]}
        />

        <ScatterInstance
          bounds={WORLDSIZE}
          SEED={props.SEED}
          mesh={RockMdModel}
          groundPlane={groundPlane}
          threshold={[0.85, 0.95]}
        />

        <ScatterInstance
          bounds={WORLDSIZE}
          SEED={props.SEED}
          mesh={Tree01Model}
          groundPlane={groundPlane}
          threshold={[0.6, 0.8]}
          noRotation
          flip
        />
      </group>

      <Character />

      {listItems}
    </Fragment>
  );
};

export default Village;
