import { Fragment, useState, useEffect, useRef } from "react"
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei'
import IsoControls from "../engine/controls/IsoControls";

import Lighting from "./Lighting";

const deg2rad = degrees => degrees * (Math.PI / 180);

const Village = (props) => {


    useEffect(() => {
    }, [])

    const handleRemoveItem = (itemName) => {
       props.setPlaceables(props.placeables.filter(item => item.name !== itemName));
     };

    function placeObject(e) {
      if (props.canPlace) {
        let item = {name: 'fireplace', position: e.point}
        props.setPlacedItems(placedItems => [...placedItems, item])
        props.setCanPlace(false)
        //remove item from nventory
        props.character.removeFromInv([item])
        handleRemoveItem(item.name)
      }
      
    }

    const listItems = props.placedItems.map((item, index) =>
    <mesh key={index} position={[item.position.x, item.position.y + 0.1, item.position.z]}>
        <boxGeometry args={[.2, .2, .2]} />
        <meshStandardMaterial color="red"/>
      </mesh>
    );

    const group = useRef();
  
    return <Fragment>

      <Lighting />
      <PerspectiveCamera makeDefault />
      <IsoControls screenSpacePanning={false} />
      
      <group ref={group}>
      <mesh position={[0, .5, 0]}>
        <boxGeometry />
        <meshStandardMaterial/>
      </mesh>
    </group>

    <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => placeObject(e)}>
        <planeGeometry args={[20, 20]}/>
        <meshStandardMaterial color="rgb(225, 249, 226)"  />
      </mesh>


      {listItems}

    </Fragment>
}

export default Village;