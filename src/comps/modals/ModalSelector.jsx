import LocationModal from "./LocationModal";
import SelectableModal from "./SelectableModal";

import Shelter from "./Shelter";
import Fireplace from "./Fireplace";

const placeableModals = {
  shelter: <Shelter />,
  fireplace: <Fireplace />,
};

const ModalSelector = (props) => {
  let getModalType = () => {
    if (Object.hasOwn(props.selectedMesh, "locationData")) {
      return (
        <LocationModal
          selectedMesh={props.selectedMesh}
          handleTask={props.handleTask}
          characterTask={props.characterTask}
          setCharacterTask={props.setCharacterTask}
        />
      );
    } else if (Object.hasOwn(props.selectedMesh, "selectableData")) {
      return (
        <SelectableModal
          selectedMesh={props.selectedMesh}
          handleTask={props.handleTask}
          subModal={placeableModals[props.selectedMesh.selectableData.name]}
        />
      );
    }
  };

  return getModalType();
};

export default ModalSelector;
