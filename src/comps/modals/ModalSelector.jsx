import LocationModal from "./LocationModal";
import SelectableModal from "./SelectableModal";

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
        />
      );
    }
  };

  return getModalType();
};

export default ModalSelector;
