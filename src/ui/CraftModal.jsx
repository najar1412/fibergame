import { Fragment } from 'react';

const CraftModal = (props) => {

    let handleAction = (craftableName) => {
        let crafted = props.character.craftItem(craftableName)
        // add to placeables
        if (crafted) {
            props.setPlaceables(placeables => [...placeables, {name: craftableName}])
        }
        
    }

    const listItems = props.craftables.map((item, index) =>
    <div className='flex' key={index}>
        <div onClick={() => handleAction(item.name)} className='button button-long mb-4'>
            {item.name}
        </div>
    </div>
    );

    return <Fragment>
        <div onClick={props.closeModal} className="absolute top-0 right-0 mr-8 mt-8 cursor-pointer">close</div>
        <p className="text-xs font-bold">craft</p>
        {listItems}
</Fragment>
}

export default CraftModal;