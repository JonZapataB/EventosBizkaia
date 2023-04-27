import {useState,useEffect} from "react";
import './EventTypeList.css';

const EventTypeList = ({handleClick,selectedType}) => {
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(()=> {
        fetch("https://api.euskadi.eus/culture/events/v1.0/eventType")
        .then(response => response.json())
        .then(data => {
            setEventTypes(data);
        });
    }, []);

    return (
        <div>
            <h2 className='eventsTittle'>Tipos de eventos</h2>
            <ul className='eventList'>
                <li className={selectedType === 0 ? 'selected':''} onClick={()=>handleClick(0)}>Todos</li>
                {eventTypes.map(eventType => (
                    <li className={selectedType === eventType.id ?'selected':''}key={eventType.id} onClick={()=>handleClick(eventType.id)}>{eventType.nameEs}</li>
                ))}
            </ul>
        </div>
    );
}

export default EventTypeList;