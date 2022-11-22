import { Fragment, useEffect, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Sampler, PerspectiveCamera, useGLTF } from "@react-three/drei";
import IsoControls from "../engine/controls/IsoControls";

import rockLg from "../models/rock_lg.glb";
import rockMd from "../models/rock_md.glb";
import rockSm from "../models/rock_sm.glb";

import Character from "../comps/models/Character";
import Fireplace from "../comps/models/Fireplace";
import Shelter from "../comps/models/Shelter";

const deg2rad = (degrees) => degrees * (Math.PI / 180);

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

  // environment mesh imports
  const RockLgModel = () => {
    const gltf = useGLTF(rockLg);
    let mesh = gltf.nodes.Object001;
    return (
      <>
        <primitive object={mesh.geometry} receiveShadow castShadow />
      </>
    );
  };

  const RockMdModel = () => {
    const gltf = useGLTF(rockMd);
    let mesh = gltf.nodes.Object002;
    return (
      <>
        <primitive object={mesh.geometry} receiveShadow castShadow />
      </>
    );
  };

  const RockSmModel = () => {
    const gltf = useGLTF(rockSm);
    let mesh = gltf.nodes.RockSm;
    return (
      <>
        <primitive object={mesh.geometry} receiveShadow castShadow />
      </>
    );
  };

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
          castShadow
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
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="rgb(225, 249, 226)" />
        </mesh>

        <Sampler
          count={10} // Number of samples
          mesh={groundPlane}
        >
          <instancedMesh args={[null, null, 1_000]} castShadow>
            <RockLgModel />
            <meshStandardMaterial />
          </instancedMesh>
        </Sampler>

        <Sampler
          count={100} // Number of samples
          mesh={groundPlane}
        >
          <instancedMesh args={[null, null, 1_000]} castShadow>
            <RockMdModel />
            <meshStandardMaterial />
          </instancedMesh>
        </Sampler>

        <Sampler
          count={300} // Number of samples
          mesh={groundPlane}
        >
          <instancedMesh args={[null, null, 1_000]} castShadow>
            <RockSmModel />
            <meshStandardMaterial />
          </instancedMesh>
        </Sampler>
      </group>

      {/* <group ref={group} position={[-5, 0, 0]}>
      <mesh position={[0, .5, 0]}>
        <boxGeometry />
        <meshStandardMaterial/>
      </mesh>
    </group> */}

      <Character />

      {listItems}
    </Fragment>
  );
};

export default Village;
