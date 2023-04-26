import {useState,useEffect} from "react";
import './EventTypeList.css';

const EventTypeList = () => {
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
            <h2 class='eventsTittle'>Tipos de eventos</h2>
            <ul class='eventList'>
                {eventTypes.map(eventType => (
                    <li key={eventType.id}>{eventType.nameEs} / {eventType.nameEu}</li>
                ))}
            </ul>
        </div>
    );
}

export default EventTypeList;