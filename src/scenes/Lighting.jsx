import { Fragment } from "react"


const Lighting = (props) => {

    return <Fragment>

      <ambientLight intensity={0.1} />

      <directionalLight color="white" position={[0, 2, 5]} />
  

    </Fragment>
}

export default Lighting;