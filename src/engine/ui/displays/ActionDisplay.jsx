import TimedButton from "../components/TimedButton";

const ActionDisplay = (props) => {
  return (
    <div id="action-menu" className="pointer-events-auto w-fit">
      <div className="flex flex-col">
        {props.location.tasks.map((item) => (
          <TimedButton
            characterTask={props.characterTask}
            startTaskTimer={props.startTaskTimer}
            key={item.id}
            disabled={props.characterTask}
            label={item.name}
            taskData={item}
            handleTask={() => props.handleTask(item)}
            setCharacterTask={props.setCharacterTask}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionDisplay;
