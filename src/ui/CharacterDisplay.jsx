import { Fragment, useState } from "react";
import Modal from "react-modal";
const CharacterDisplay = (props) => {
  return (
    <Fragment>
      <div id="character-display" className="pointer-events-auto w-fit mb-8">
        <div>
          {props.characterTask ? (
            <p className="mb-4 uppercase">
              {props.character.name()} is {props.characterTask.verb}{" "}
              {props.characterTask.location}
            </p>
          ) : (
            <p className="uppercase">{props.character.name()} is idling</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CharacterDisplay;
