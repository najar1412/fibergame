import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const InventoryModal = (props) => {

    const listItems = props.inventory.map((item) =>
    <div className='flex' key={item.id}>
        <div className='w-[200px]'>
            {item.name}
        </div>
        <div>
            x{item.quantity}
        </div>
    </div>
    );

    return <Fragment>
        <div onClick={props.closeModal} className="absolute top-0 right-0 mr-8 mt-8 cursor-pointer">close</div>

        <p className="text-xs font-bold">inventory</p>
        {listItems}


        
    </Fragment>
}

export default InventoryModal;