import { Fragment, useEffect, useRef } from "react";
import noise from "../engine/helpers/perlin";

import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import IsoControls from "../engine/controls/IsoControls";

import { RockLgModel, RockMdModel, RockSmModel } from "../comps/modals/Rocks";

import Character from "../comps/models/Character";
import Fireplace from "../comps/models/Fireplace";
import Shelter from "../comps/models/Shelter";
import ScatterInstance from "../engine/ScatterInstance";

const deg2rad = (degrees) => degrees * (Math.PI / 180);
const WORLDSIZE = [100, 100];

const Village = (props) => {
  // global
  const environmentGroup = useRef();
  const groundPlane = useRef();
  const sunGroup = useRef();
  let sunPosition = [0, 150, 0];

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
    sunGroup.current.rotation.z += 0.0001;
  });

  return (
    <Fragment>
      <group ref={sunGroup}>
        <directionalLight
          /* castShadow */
          intensity={0.3}
          position={sunPosition}
          shadow-mapSize-height={256}
          shadow-mapSize-width={256}
        />
      </group>

      <ambientLight intensity={0.02} />

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
          <meshStandardMaterial color="rgb(225, 249, 226)" />
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
          threshold={[0.8, 0.9]}
        />

        {/* <ScatterInstance
          bounds={WORLDSIZE}
          SEED={props.SEED}
          mesh={RockSmModel}
          groundPlane={groundPlane}
          threshold={0.2}
        /> */}
      </group>

      <Character />

      {listItems}
    </Fragment>
  );
};

export default Village;
