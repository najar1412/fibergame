import { Fragment, useState, useEffect, useRef } from "react"
import { useFrame, useThree } from '@react-three/fiber';
import { Sampler, PerspectiveCamera, useGLTF } from '@react-three/drei'
import IsoControls from "../engine/controls/IsoControls";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import rockLg from '../models/rock_lg.glb'
import rockMd from '../models/rock_md.glb'
import rockSm from '../models/rock_sm.glb'

import Character from "../3dComps/Character";


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
        let selectableData = getSelectableData(props.selectableToPlace)
        selectableData.position = e.point

        props.setPlacedItems(placedItems => [...placedItems, selectableData])
        props.setCanPlace(false)
        //remove item from nventory
        props.character.removeFromInv([selectableData])
        handleRemoveItem(selectableData.name)
      }
      
    }

    const RockLgModel = () => {
      const gltf = useGLTF(rockLg);
      let mesh = gltf.nodes.Object001
      return (
        <>
          <primitive object={mesh.geometry}/>
        </>
      );
    };

    const RockMdModel = () => {
      const gltf = useGLTF(rockMd);
      let mesh = gltf.nodes.Object002
      return (
        <>
          <primitive object={mesh.geometry}/>
        </>
      );
    };

    const RockSmModel = () => {
      const gltf = useGLTF(rockSm);
      let mesh = gltf.nodes.RockSm
      return (
        <>
          <primitive object={mesh.geometry}/>
        </>
      );
    };

    function selectMesh(e) {
      props.setSelectedMesh(e.eventObject)
      props.openModal(true)
  }


  function getSelectableData(name) {
    let item;
    props.selectables.forEach(selectable => {
      
      if (selectable.name === name) {
        item = selectable
      }
    })

    return item
  }

    const listItems = props.placedItems.map((item, index) =>
    <mesh key={index} name={item.name} selectableData={item} onClick={selectMesh} position={[item.position.x, item.position.y + 0.1, item.position.z]}>
        <boxGeometry args={[.2, .2, .2]} />
        <meshStandardMaterial color="red"/>
      </mesh>
    );

    // const group = useRef();
    const groundGroup = useRef();
    // groundGroup.current.rotation.x= -Math.PI / 2

    useFrame(() => {
      // setup 3d objects
      groundGroup.current.rotation.x = deg2rad(-90);

      // init idling
      // group.current.position.z += 0.006;
    });
  
    return <Fragment>

      <Lighting />
      <PerspectiveCamera makeDefault />
      <IsoControls screenSpacePanning={true} />

    <group ref={groundGroup}>
      <Sampler
        count={20} // Number of samples
        >
        <mesh onClick={(e) => placeObject(e)}>
          <planeGeometry args={[100, 100]}/>
          <meshStandardMaterial color="rgb(225, 249, 226)"  />
        </mesh>

      

      <instancedMesh args={[null, null, 1_000]}>
        <RockLgModel />
        <meshStandardMaterial/>
      </instancedMesh>
    </Sampler>

    <Sampler
      count={100} // Number of samples
      >
      <mesh>
        <planeGeometry args={[100, 100]}/>
        <meshStandardMaterial color="rgb(225, 249, 226)"  />
      </mesh>

      <instancedMesh args={[null, null, 1_000]}>
        <RockMdModel />
        <meshStandardMaterial/>
      </instancedMesh>
    </Sampler>

    <Sampler
      count={200} // Number of samples
      >
      <mesh>
        <planeGeometry args={[100, 100]}/>
        <meshStandardMaterial color="rgb(225, 249, 226)"  />
      </mesh>

      <instancedMesh args={[null, null, 1_000]}>
        <RockSmModel />
        <meshStandardMaterial/>
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
}

export default Village;