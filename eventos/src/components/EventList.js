import {useState,useEffect} from "react";
import './EventList.css';

const EventList = ({eventType}) => {
    const [events, setEvents] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

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
            <h2 class='eventTittle'>Eventos</h2>
            {page >1 && <button class='botonPrevious' onClick={previousPage}>Anterior</button>}
            <h3 class='listPage'>Página {page}/{totalPages}</h3>
            {page < totalPages && <button class='botonNext' onClick={nextPage}>Siguiente</button>}
            <ul class='eventContainer'>
                {events.map(event => (
                    <li class='infoEvent'key={event.id}>
                        {event.images.length > 0 ? <img class='imagenes'src={event.images[0].imageUrl} alt={event.images[0].imageFileName} /> : null}
                        <h3>{event.nameEs}</h3>
                        <p>{event.startDate.split("T")[0]} - {event.endDate.split("T")[0]}</p>
                        <p>{event.openingHoursEs}</p>
                        
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default EventList;