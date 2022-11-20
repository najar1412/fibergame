import React, { useRef } from 'react'
import { extend, useFrame, useThree  } from '@react-three/fiber';
import { MapControls } from '@react-three/drei'

extend({ MapControls })

function IsoControls(props) {
  const controls = useRef()
  const { camera, gl } = useThree()
  useFrame(() => {
    controls.current.update()
  })
  return (
    <MapControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={20}
      maxDistance={20}
      // maxPolarAngle={0}
      {...props}
    />
  )
}

export default IsoControls
