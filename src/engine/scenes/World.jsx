import { Fragment, useState, useRef } from "react";
import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useEnvironment,
  Html,
} from "@react-three/drei";

import hdriImage from "../hdri/hdr_half.hdr";
import planetTexture from "../../images/planet/01/2k_mars.jpg";

/* import Lighting from "./Lighting"; */
import EnvironmentLighting from "./EnvironmentLighting";

function handlePlacePlaceableOnWorld(object, lat, lon, radius) {
  var latRad = lat * (Math.PI / 180);
  var lonRad = -lon * (Math.PI / 180);
  object.position.set(
    Math.cos(latRad) * Math.cos(lonRad) * radius,
    Math.sin(latRad) * radius,
    Math.cos(latRad) * Math.sin(lonRad) * radius
  );
  object.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
}

function latLongTo3d(lat, lon, radius) {
  var latRad = lat * (Math.PI / 180);
  var lonRad = -lon * (Math.PI / 180);

  return [
    Math.cos(latRad) * Math.cos(lonRad) * radius,
    Math.sin(latRad) * radius,
    Math.cos(latRad) * Math.sin(lonRad) * radius,
  ];
}

const World = (props) => {
  const [worldSize, setWorldSize] = useState(2);
  const group = useRef();
  const texture = new THREE.TextureLoader().load(planetTexture);

  useFrame(() => {
    group.current.rotation.z += 0.001;
  });

  function selectMesh(e) {
    props.openModal(true);
    props.setSelectedMesh(e.eventObject);
  }

  const listItems = props.locations.map((item, index) => (
    <mesh
      key={index}
      locationData={item}
      onClick={selectMesh}
      position={latLongTo3d(item.latlong[0], item.latlong[1], worldSize)}
    >
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshPhysicalMaterial color={item.color} envMapIntensity={30} />
      <Html>
        <div className="text-xs bg-white rounded capitalize w-fit pointer-events-none select-none py-2 px-4 whitespace-nowrap">
          {item.name}
        </div>
      </Html>
    </mesh>
  ));

  //useEnvironment({ preset: "city" });

  return (
    <Fragment>
      {/* <Lighting /> */}
      {/* <EnvironmentLighting /> */}

      <Environment background files={hdriImage} />

      <OrbitControls />

      <group ref={group}>
        <mesh>
          <sphereGeometry args={[worldSize]} />
          <meshPhysicalMaterial
            /* color={"rgb(225, 249, 226)"} */
            map={texture}
            envMapIntensity={30}
          />
        </mesh>

        {listItems}
      </group>
    </Fragment>
  );
};

export default World;
