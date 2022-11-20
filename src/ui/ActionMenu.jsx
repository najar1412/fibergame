import TimedButton from '../comps/TimedButton';
import { getTask } from "../api/tasks";



const ActionMenu = (props) => {

    function handleTask(taskName) {
        
        let task = getTask(taskName)
        let loot = task()
        props.character.addToInv(loot)
        props.setCharacterTask(false)

    }


    return <div id="action-menu" className="pointer-events-auto w-fit">
        <div className='flex flex-col'>


        {
            props.location.tasks.map((item) =>
                <TimedButton key={item.id} disabled={props.characterTask} label={item.name} taskData={item} timer={item.timer} clickFunc={() => handleTask(item.name)} setCharacterTask={props.setCharacterTask}/>
            )
        }



            
        </div>
</div>
}

export default ActionMenu;