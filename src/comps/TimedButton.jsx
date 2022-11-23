const TimedButton = (props) => {
  function handleAction(e) {
    console.log(props);
    e.target.classList.add("button-disabled");
    props.startTaskTimer(props.taskData.duration, props.handleTask);
    props.setCharacterTask(props.taskData);
  }

  return props.disabled ? (
    <div className="button button-fit button-disabled mb-4">
      {props.characterTask ? props.characterTask.verb : props.label}
    </div>
  ) : (
    <div onClick={handleAction} className="button button-fit mb-4">
      {props.characterTask ? props.characterTask.verb : props.label}
    </div>
  );
};

export default TimedButton;
