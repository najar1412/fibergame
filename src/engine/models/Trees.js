import { useGLTF } from "@react-three/drei";

import Tree01 from "../../engine/geometry/tree_01.glb";
import Tree02 from "../../engine/geometry/tree_02.glb";

const Tree01Model = () => {
  const gltf = useGLTF(Tree01);
  console.log("******");
  console.log(gltf);
  let mesh = gltf.nodes.Tree_01__1;
  return mesh;
};

const Tree02Model = () => {
  const gltf = useGLTF(Tree02);
  // console.log(gltf);
  let mesh = gltf.nodes.Tree_01_;
  return mesh;
};

export { Tree01Model };
