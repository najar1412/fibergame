import { Fragment, useEffect, useState } from "react";

import * as THREE from "three";
import noise from "./perlin";

const ScatterInstance = (props) => {
  const [loaded, setLoaded] = useState(false);
  const mesh = props.mesh();
  console.log("**********");
  console.log(mesh);

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
      if (vertex.z >= props.threshold[0] && vertex.z <= props.threshold[1]) {
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
            <group
              key={`${mesh.userData.name}_${i}`}
              scale={props.flip ? -location.z : location.z}
              position={[location.x, location.y * location.z, 0]}
              rotation={[
                props.noRotation ? 0 : (location.y / location.x) * 2,
                props.noRotation ? 0 : (location.x / location.z) * 5,
                (location.z / location.y) * 10,
              ]}
            >
              {Object.keys(mesh.nodes).map((key) => {
                if (mesh.nodes[key].isObject3D) {
                  return (
                    <mesh
                      key={mesh.nodes[key].uuid}
                      geometry={mesh.nodes[key].geometry}
                      material={mesh.nodes[key].material}
                    ></mesh>
                  );
                }
              })}
            </group>
          );
        })}
    </Fragment>
  );
};

export default ScatterInstance;
