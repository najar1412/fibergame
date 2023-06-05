import { Fragment } from "react";

import { generateRandomInteger, generateRandomFloat } from "./helpers/helpers";

const ScatterInstance = (props) => {
  const mesh = props.mesh();

  return (
    <Fragment>
      {[...Array(props.amount)].map((_, i) => {
        return (
          <mesh
            key={`lgRock_${i}`}
            scale={generateRandomFloat(0.5, 1.2)}
            position={[
              generateRandomInteger(-props.bounds[0], props.bounds[1]),
              generateRandomInteger(-props.bounds[0], props.bounds[1]),
              0,
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
