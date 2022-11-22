import TimedButton from "../comps/TimedButton";
import { getTask } from "../api/tasks";

const ActionDisplay = (props) => {
  /* function handleTask(task) {
        
        const taskFunc = getTask(task.name)
        const loot = [...taskFunc()]

        
        loot.forEach(item => {
            if (item.type === 'placeable') {
                props.setPlaceables(placeables => [...placeables, item])
                
            }
            item.quantity = 1
        })

        

        props.setCharacterTask(false)
        props.sendMessageToNarrator({type: 'found', items:loot, activity: task.location})
        props.character.addToInv(loot)

    } */

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
