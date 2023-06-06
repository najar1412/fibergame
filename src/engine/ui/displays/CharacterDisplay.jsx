import { Fragment, useState } from "react";
import Modal from "react-modal";
const CharacterDisplay = (props) => {
  return (
    <Fragment>
      <div id="character-display" className="pointer-events-auto w-fit mb-2">
        <div>
          {props.characterTask ? (
            <p className="uppercase font-light">
              {props.character.name()} is {props.characterTask.verb}{" "}
              {props.characterTask.location}
            </p>
          ) : (
            <p className="uppercase font-light">
              {props.character.name()} is idling
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CharacterDisplay;
