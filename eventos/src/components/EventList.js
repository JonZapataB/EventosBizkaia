import {useState,useEffect} from "react";
import './EventList.css';
import EventModal from "./EventModal";

const EventList = ({eventType}) => {
    const [events, setEvents] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const [selectedEvent,setSelectedEvent] = useState(null);

    useEffect(()=> {
        setPage(1);
    }, [eventType]);

    useEffect(()=> {
        const type = eventType !== 0 ? `&type=${eventType}` : "";
        fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}`)
        .then(response => response.json())
        .then(data => {
            setEvents(data.items);
            setTotalPages(data.totalPages);
        });
    }, [page,eventType]);

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };
    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };


    return (
        <section className="event-list">
            <h2 className='eventTittle'>Eventos</h2>
            
            <h3 className='listPage'>Página {page}/{totalPages}</h3>
            {page >1 && <button className='botonPrevious' onClick={previousPage}>Anterior</button>} {page < totalPages && <button class='botonNext' onClick={nextPage}>Siguiente</button>}
            <ul className='eventContainer'>
                {events.map(event => (
                    <li className='infoEvent'key={event.id} onClick={()=>setSelectedEvent(event.id)}>
                        {event.images.length > 0 ? <img className='imagenes'src={event.images[0].imageUrl} alt={event.images[0].imageFileName} /> : <img className='imagenes' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png' alt='Imagen no disponible'/>}
                        <h3>{event.nameEs}</h3>
                        <p>{event.startDate.split("T")[0]} - {event.endDate.split("T")[0]}</p>
                        <p>{event.openingHoursEs}</p>
                        <EventModal event={event} className={selectedEvent == event.id ? 'show':''} close={()=> setSelectedEvent(null)}/>
                        
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default EventList;