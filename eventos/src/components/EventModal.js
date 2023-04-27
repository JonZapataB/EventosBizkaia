import './EventModal.css'
import { useState, useEffect } from 'react';

const EventModal = ({ event,className,close}) => {
    const [currentClassName, setCurrentClassName] = useState(null);

    useEffect(() => {
        setCurrentClassName(className);
    }, [className]);

    const closeModal = () => {
        setCurrentClassName(null);
        close();
    }

    return (
        <div>
            <section className={"modal-background " + currentClassName} onClick={closeModal}></section>
            <article className={'modal ' + currentClassName}>
                <section className='horizontal'>
                    <article className='horizontal-container'>
                        <h1>{event.nameEs}</h1>
                        <p>{event.municipalityEs}</p>
                        <p>{event.startDate.split("T")[0]} - {event.endDate.split("T")[0]}</p>
                        <p>{event.openingHoursEs}</p>
                        <p>{event.priceEs}</p>
                    </article>
                    <article className='horizontal-container'>
                        {event.images.length > 0 ? <img className='imagenes'src={event.images[0].imageUrl} alt={event.images[0].imageFileName} /> : null}
                    </article>
                </section>
                <div dangerouslySetInnerHTML={{ __html: event.descriptionEs }}></div>
                <button className='botonClose' onClick={closeModal}>Volver</button>
            </article>
        </div>
    );
}

export default EventModal;