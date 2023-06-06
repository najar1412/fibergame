import { Fragment, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Shelter = (props) => {
  const [active, setActive] = useState(true);
  const [hasFuel, setHasFuel] = useState({});
  const [contents, setContents] = useState({});

  const lightRef = useRef();

  /* useFrame(({clock}) => {
      if (active) {
        let time = clock.getElapsedTime()
      lightRef.current.intensity = 2 + Math.sin(time * Math.PI * 2) * Math.cos(time * Math.PI * 1.5) * 0.25;
      lightRef.current.position.x += (Math.sin(time * Math.PI) * 0.25) / 30;
      lightRef.current.position.z += (Math.cos(time * Math.PI * 0.75) * 0.25) / 30;
      }
      
      
    }); */

  return (
    <group>
      {/*       <pointLight castShadow ref={lightRef} color="NavajoWhite" intensity={0} position={[props.item.position.x, props.item.position.y + 1, props.item.position.z]} distance={15} decay={1.2}/>
       */}{" "}
      <mesh
        key={props.key}
        name={props.item.name}
        selectableData={props.item}
        onClick={props.selectMesh}
        position={[
          props.item.position.x,
          props.item.position.y + 0.1,
          props.item.position.z,
        ]}
        castShadow
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
};

export default Shelter;
