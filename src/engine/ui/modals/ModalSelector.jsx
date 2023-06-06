import LocationModal from "./LocationModal";
import SelectableModal from "./SelectableModal";

import Shelter from "../../models/ShelterModal";
import Fireplace from "../../models/FireplaceModal";

const placeableModals = {
  shelter: <Shelter />,
  fireplace: <Fireplace />,
};

const ModalSelector = (props) => {
  let getModalType = () => {
    if (Object.hasOwn(props.selectedMesh, "locationData")) {
      return (
        <LocationModal
          startTaskTimer={props.startTaskTimer}
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
