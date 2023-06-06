import { useRef, Fragment } from "react";

import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";

const EnvironmentLighting = (props) => {
  const sunGroup = useRef();
  const sunRef = useRef();
  let initialSunPosition = [0, 150, 0];

  if (props.debug) {
    useHelper(sunRef, THREE.DirectionalLightHelper, 1, "red");
  }

  useFrame(() => {
    sunGroup.current.rotation.z += 0.001;
  });

  return (
    <Fragment>
      <group ref={sunGroup}>
        <directionalLight
          ref={sunRef}
          /* castShadow */
          intensity={0.3}
          position={initialSunPosition}
          shadow-mapSize-height={256}
          shadow-mapSize-width={256}
        />
      </group>

      <ambientLight color="rgb(76, 64, 142)" intensity={0.05} />
      <ambientLight color="white" intensity={0.001} />
    </Fragment>
  );
};

export default EnvironmentLighting;
