import { useGLTF } from "@react-three/drei";

import rockLg from "../../models/rock_lg.glb"
import rockMd from "../../models/rock_md.glb"
import rockSm from "../../models/rock_sm.glb"

const RockLgModel = () => {
    const gltf = useGLTF(rockLg);
    let mesh = gltf.nodes.Object001;
    return (
        mesh
    );
};

const RockMdModel = () => {
    const gltf = useGLTF(rockMd);
    let mesh = gltf.nodes.Object002;
    return (
        mesh
    );
};

const RockSmModel = () => {
    const gltf = useGLTF(rockSm);
    let mesh = gltf.nodes.RockSm;
    return (
        mesh
    );
};

export {
    RockLgModel, RockMdModel, RockSmModel
}