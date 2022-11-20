import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Character = (props) => {

    const [direction, setDirection] = useState(['x', false, true])

    let idleMovement = () => {
        const directions = ['x', 'z']
        let newDirection = directions[Math.floor(Math.random() * directions.length)]
        let isPositive = Math.random() >= .5 ? true : false;
        let isMoving = Math.random() >= .2 ? true : false;

        setDirection([newDirection, isPositive, isMoving]);
    }

    useEffect(() => {
        const interval = setInterval(() => {
          idleMovement()
        }, 3000);
        return () => clearInterval(interval);
      }, []);

    
    const group = useRef();

    useFrame(() => {
        if (direction[2]) {
            if (direction[1]) {
                group.current.position[direction[0]] += 0.006;
            } else {
                group.current.position[direction[0]] -= 0.006;
            }
        }
        
      
    });

    return <group ref={group} position={[-5, 0, 0]}>
    <mesh position={[0, .5, 0]}>
      <boxGeometry />
      <meshStandardMaterial/>
    </mesh>
  </group>
            
}

export default Character;