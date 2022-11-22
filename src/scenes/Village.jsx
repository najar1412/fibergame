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
  useEffect(() => {}, []);

  const handleRemoveItem = (itemName) => {
    props.setPlaceables(
      props.placeables.filter((item) => item.name !== itemName)
    );
  };

  function placeObject(e) {
    if (props.canPlace) {
      console.log(props.selectableToPlace);
      let selectableData = getSelectableData(props.selectableToPlace);

      selectableData.position = e.point;

      props.setPlacedItems((placedItems) => [...placedItems, selectableData]);
      props.setCanPlace(false);
      //remove item from nventory
      props.character.removeFromInv([selectableData]);
      handleRemoveItem(selectableData.name);
    }
  }

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

  const listItems = props.placedItems.map((item, index) => {
    switch (item.name) {
      case "fireplace":
        return <Fireplace item={item} key={index} selectMesh={selectMesh} />;
      case "shelter":
        return <Shelter item={item} key={index} selectMesh={selectMesh} />;
    }
  });

  // const group = useRef();
  const groundGroup = useRef();
  const groundPlane = useRef();
  const sunCtrl = useRef();
  let sunPosition = [0, 150, 0];
  // groundGroup.current.rotation.x= -Math.PI / 2

  useFrame(() => {
    // setup 3d objects
    groundGroup.current.rotation.x = deg2rad(-90);
    sunCtrl.current.rotation.z += 0.0001;

    // init idling
    // group.current.position.z += 0.006;
  });

  return (
    <Fragment>
      <group ref={sunCtrl}>
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

      <group ref={groundGroup}>
        <mesh ref={groundPlane} onClick={(e) => placeObject(e)} receiveShadow>
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
