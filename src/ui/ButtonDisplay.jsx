import { Fragment, useState } from "react";
import Modal from "react-modal";

import InventoryModal from "./InventoryModal";
import CraftModal from "./CraftModal";
import BuildModal from "./BuildModal";

const ButtonDisplay = (props) => {
  const [modalName, setModalName] = useState("inventory");

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(newModalName) {
    setModalName(newModalName);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function ModalSelector(sceneName) {
    switch (sceneName) {
      case "inventory":
        return (
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <InventoryModal
              closeModal={closeModal}
              inventory={props.character.inventory()}
            />
          </Modal>
        );
      case "craft":
        return (
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <CraftModal
              closeModal={closeModal}
              character={props.character}
              recipes={props.character.recipes()}
              setPlaceables={props.setPlaceables}
            />
          </Modal>
        );
      case "build":
        return (
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <BuildModal closeModal={closeModal} />
          </Modal>
        );
      default:
    }
  }

  return (
    <Fragment>
      <div id="button-display" className="pointer-events-auto w-fit mb-8">
        <div className="flex">
          <div
            onClick={() => openModal("inventory")}
            className="button text-xs sm:text-base px-4 py-2 pointer-events-auto w-fit cursor-pointer mr-4"
          >
            i
          </div>
          <div
            onClick={() => openModal("craft")}
            className="button text-xs sm:text-base px-4 py-2 pointer-events-auto w-fit cursor-pointer mr-4"
          >
            c
          </div>
          <div
            onClick={() => openModal("build")}
            className="button text-xs sm:text-base px-4 py-2 pointer-events-auto w-fit cursor-pointer"
          >
            b
          </div>
        </div>
      </div>

      {ModalSelector(modalName)}
    </Fragment>
  );
};

export default ButtonDisplay;
