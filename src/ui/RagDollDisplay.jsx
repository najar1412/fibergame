import { Link } from 'react-router-dom';



const RagDollDisplay = (props) => {

    return <div id="ragdoll-menu" className="pointer-events-auto w-fit mb-4">
        <div className='flex flex-col'>
            <p className="text-xs font-bold mr-4">ragdoll</p>

            <div className='flex items-center'>
                <div className='w-[150px] max-w-[200px] w-full'>
                    chest
                </div>
                <div className='flex'>
                    <p>nothing</p>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='w-[150px] max-w-[200px] w-full'>
                    weapon
                </div>
                <div className='flex'>
                    <p>nothing</p>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='w-[150px] max-w-[200px] w-full'>
                    tool
                </div>
                <div className='flex'>
                    <p>nothing</p>
                </div>
            </div>
        </div>
    </div>
}

export default RagDollDisplay;