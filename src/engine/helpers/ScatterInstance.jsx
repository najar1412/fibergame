import { Fragment, useEffect, useState } from "react";

import * as THREE from "three";
import noise from "./perlin";

const ScatterInstance = (props) => {
  const [loaded, setLoaded] = useState(false);
  const mesh = props.mesh();

  const placeGeometry = () => {
    let locations = [];

    let newNoise = noise.noise;

    newNoise.seed(props.SEED);

    const positionAttribute = props.groundPlane.current
      .clone()
      .geometry.getAttribute("position");
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);

      vertex.z += newNoise.simplex2(vertex.x, vertex.y);
      if (vertex.z > props.threshold[0] && vertex.z < props.threshold[1]) {
        locations.push({ x: vertex.x, y: vertex.y, z: vertex.z });
      }
    }

    return locations;
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      {loaded &&
        props.groundPlane.current &&
        placeGeometry().map((location, i) => {
          return (
            <mesh
              key={`lgRock_${i}`}
              scale={location.z}
              position={[location.x, location.y * location.z, 0]}
              rotation={[
                (location.y / location.x) * 2,
                (location.x / location.z) * 5,
                (location.z / location.y) * 10,
              ]}
              geometry={mesh.geometry}
              material={mesh.material}
            ></mesh>
          );
        })}
    </Fragment>
  );
};

export default ScatterInstance;
