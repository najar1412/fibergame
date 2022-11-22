import { useState, useEffect } from "react";

const TimedButton = (props) => {
  const [counter, setCounter] = useState(props.timer / 1000);
  const [startCountdown, setStartCountDown] = useState(false);

  function runCounter() {
    setCounter(counter - 1);
    if (counter === 0) {
      setStartCountDown(false);
      setCounter(props.timer / 1000);
      props.setCharacterTask(false);
    }
  }

  useEffect(() => {
    if (startCountdown) {
      counter >= 0 && setTimeout(() => runCounter(), 1000);
    }
  }, [startCountdown, counter]);

  function handleAction(e) {
    e.target.classList.add("button-disabled");
    setStartCountDown(true);
    props.setCharacterTask(props.taskData);

    setTimeout(() => {
      e.target.classList.remove("button-disabled");
      props.clickFunc();
    }, props.timer);
  }

  return props.disabled ? (
    <div className="button button-fit button-disabled mb-4">
      {startCountdown ? props.taskData.verb : props.label} {counter}
      <span className="lowercase">s</span>
    </div>
  ) : (
    <div onClick={handleAction} className="button button-fit mb-4">
      {startCountdown ? props.taskData.verb : props.label} {counter}
      <span className="lowercase">s</span>
    </div>
  );
};

export default TimedButton;
