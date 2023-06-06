import { useGLTF } from "@react-three/drei";

import Tree01 from "../../engine/geometry/tree_01.glb";
import Tree02 from "../../engine/geometry/tree_02.glb";

const Tree01Model = () => {
  const gltf = useGLTF(Tree01);

  gltf.userData["name"] = "tree_01";
  return gltf;

};

const Tree02Model = () => {
  const gltf = useGLTF(Tree02);

  gltf.userData["name"] = "tree_02";
  return gltf;
};

export { Tree01Model, Tree02Model };

