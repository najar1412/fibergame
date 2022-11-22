import { Link } from 'react-router-dom';

const PlacementDisplay = (props) => {

    function handleClick(e) {
        props.setCanPlace(true)
        props.setSelectableToPlace(e.currentTarget.getAttribute('data-item-name'))
    }

    console.log(props.placeables)


    const listItems = props.placeables.map((item, index) =>
    
    <div onClick={handleClick} key={index} data-item-name={item.name} className='button button-secondary button-fit justify-between py-2 px-8 mb-4'>
        <div className="w-[150px]">{item.name}</div>
        <div>x{item.quantity}</div>
        
    </div>

    

);

    return <div id="action-menu" className="pointer-events-auto w-fit">
        {
            listItems.length ?
            <p className="text-xs font-bold">Placeable</p>
            :
            null
        }
        {listItems}
    
    
</div>
}

export default PlacementDisplay;