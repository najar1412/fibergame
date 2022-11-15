import { Fragment, useState, useEffect, useRef } from "react"
import { OrbitControls } from '@react-three/drei'
import { Html } from "@react-three/drei";

import Lighting from "./Lighting";

function placeObjectOnWorld(object, lat, lon, radius) {
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
        Math.cos(latRad) * Math.sin(lonRad) * radius
    ]
}





const World = (props) => {

    const [worldSize, setWorldSize] = useState(2)

    useEffect(() => {
    }, [])

    function selectMesh(e) {
        props.openModal(true)
        props.setSelectedMesh(e.eventObject)
    }

    const listItems = props.locations.map((item, index) =>
    <mesh key={index} locationData={item} onClick={selectMesh} position={latLongTo3d(item.latlong[0], item.latlong[1], worldSize)}>
        <boxGeometry args={[.2, .2, .2]} />
        <meshStandardMaterial color={item.color} />
        <Html>
          <div className="capitalize w-[150px] pointer-events-none select-none">{item.name}</div>
        </Html>
    </mesh>

    );

    const group = useRef();
    
    return <Fragment>

        <Lighting />

        <OrbitControls />
    
    <group ref={group}>

      <mesh>
        <sphereGeometry args={[worldSize]} />
        <meshStandardMaterial color={'rgb(225, 249, 226)'}/>
      </mesh>


    {listItems}

    </group>

    </Fragment>
}

export default World;