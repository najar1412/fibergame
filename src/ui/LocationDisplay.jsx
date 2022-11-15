import { Link } from 'react-router-dom';

const LocationDisplay = (props) => {

    let handleClick = (e) => {
        let sceneName = e.target.dataset.sceneName
        props.ChangeScene(sceneName)

        let menuItems = document.querySelectorAll('.location-button')
        menuItems.forEach(item => {
            if (item.dataset.sceneName === sceneName) {
                item.classList.remove('opacity-50')
            } else {
                item.classList.add('opacity-50')
            }
            
        })
    }


    return <div className="main-menu flex pointer-events-auto w-fit mb-8">
        <div onClick={handleClick} data-scene-name="village" className="location-button mr-4 sm:mr-12  cursor-pointer"><h1 className='pointer-events-none text-2xl uppercase'>surroundings</h1></div>
        <div onClick={handleClick} data-scene-name="world" className="location-button cursor-pointer opacity-50"><h1 className='pointer-events-none text-2xl uppercase'>world</h1></div>
    </div>
}

export default LocationDisplay;