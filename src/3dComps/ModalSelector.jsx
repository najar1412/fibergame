import LocationModal from "./modals/LocationModal";
import SelectableModal from "./modals/SelectableModal";

const ModalSelector = (props) => {

    let getModalType = () => {
        if (props.selectedMesh.hasOwnProperty('locationData')) {
            return <LocationModal selectedMesh={props.selectedMesh} handleTask={props.handleTask} characterTask={props.characterTask} setCharacterTask={props.setCharacterTask} />
        } else if (props.selectedMesh.hasOwnProperty('selectableData')) {
            return <SelectableModal selectedMesh={props.selectedMesh} handleTask={props.handleTask} />
        }
    }

    return getModalType()
}

export default ModalSelector;