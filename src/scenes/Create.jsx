import { Fragment, useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Lighting from "./Lighting";

const Create = (props) => {
  useEffect(() => {}, []);

  const group = useRef();
  useFrame(() => {
    group.current.rotation.y += 0.004;
  });

  return (
    <Fragment>
      <Lighting />

      <group ref={group}>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </group>
    </Fragment>
  );
};

export default Create;
