import { Fragment } from "react";
import TimedButton from "../components/TimedButton";

const LocationModal = (props) => {
  return (
    <Fragment>
      <h1 className="text-3xl capitalize">
        {props.selectedMesh.locationData
          ? props.selectedMesh.locationData.name
          : null}
      </h1>
      <p className="uppercase mb-8">
        {props.selectedMesh.locationData
          ? props.selectedMesh.locationData.type
          : null}
      </p>
      <div className="mb-8">
        <p>
          {props.selectedMesh.locationData
            ? props.selectedMesh.locationData.description
            : null}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col w-2/4">
          {props.selectedMesh.locationData &&
          props.selectedMesh.locationData.tasks.length ? (
            <div className="flex flex-col">
              {props.selectedMesh.locationData.tasks.map((task) => (
                <TimedButton
                  startTaskTimer={props.startTaskTimer}
                  characterTask={props.characterTask}
                  key={task.id}
                  disabled={props.characterTask}
                  label={task.name}
                  taskData={task}
                  handleTask={() => props.handleTask(task)}
                  setCharacterTask={props.setCharacterTask}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="w-2/4">
          {props.selectedMesh.locationData &&
          props.selectedMesh.locationData.secrets.length ? (
            <Fragment>
              <h2 className="text-2xl capitalize mb-4">secrets found (0/0)</h2>
              <div className="flex flex-col">
                {props.selectedMesh.locationData.secrets.map((secret) =>
                  secret.known ? (
                    <div key={secret.id}>{secret.description}</div>
                  ) : (
                    <div key={secret.id}>???</div>
                  )
                )}
              </div>
            </Fragment>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col">
        <p>Trade</p>
        <div>item 01</div>
      </div>
    </Fragment>
  );
};

export default LocationModal;
