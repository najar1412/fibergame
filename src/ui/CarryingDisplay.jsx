import { Link } from 'react-router-dom';



const CarryingDisplay = (props) => {

    const inventoryItems = props.character.inventory().map((item) =>
    <div className='flex items-center' key={item.id}>
        <div className='w-[150px] max-w-[200px] w-full'>
            {item.name}
        </div>
        <div className='flex items-center'>
            <div className='mr-4'>
                <p className='flex items-center'>0 </p>
            </div>
            <div>
                <p className='flex items-center'><span className='text-2xl font-bold mr-4 opacity-50'>🠃</span> <span className='text-2xl font-bold'>🠁</span> </p>
            </div>
        </div>
    </div>
    );

    return <div id="ragdoll-menu" className="pointer-events-auto w-fit">
        <div className='flex'>
                <p className="text-xs font-bold mr-4">carrying</p> <p className="text-xs font-bold">0/4</p>
            </div>
        
        {inventoryItems}
</div>
}

export default CarryingDisplay;