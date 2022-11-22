import TimedButton from "../comps/TimedButton";

const ActionDisplay = (props) => {
  return (
    <div id="action-menu" className="pointer-events-auto w-fit">
      <div className="flex flex-col">
        {props.location.tasks.map((item) => (
          <TimedButton
            key={item.id}
            disabled={props.characterTask}
            label={item.name}
            taskData={item}
            timer={item.timer}
            clickFunc={() => props.handleTask(item)}
            setCharacterTask={props.setCharacterTask}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionDisplay;
