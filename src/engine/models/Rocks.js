import { useGLTF } from "@react-three/drei";

import rockLg from "../../engine/geometry/rock_lg.glb";
import rockMd from "../../engine/geometry/rock_md.glb";
import rockSm from "../../engine/geometry/rock_sm.glb";

const RockLgModel = () => {
  const gltf = useGLTF(rockLg);
  console.log(gltf);
  gltf.userData["name"] = "rockLg";
  return gltf;
};

const RockMdModel = () => {
  const gltf = useGLTF(rockMd);
  gltf.userData["name"] = "rockMd";
  return gltf;
};

const RockSmModel = () => {
  const gltf = useGLTF(rockSm);
  gltf.userData["name"] = "rockSm";
  return gltf;
};

export { RockLgModel, RockMdModel, RockSmModel };
