const TimedButton = (props) => {
  function handleAction(e) {
    e.target.classList.add("button-disabled");
    props.startTaskTimer(props.taskData.duration, props.handleTask);
    props.setCharacterTask(props.taskData);
  }

  return (
    <div
      onClick={handleAction}
      className={`button button-fit mb-4 ${
        props.disabled && "button-disabled"
      }`}
    >
      {props.characterTask ? props.characterTask.verb : props.label}
    </div>
  );
};

export default TimedButton;
