import React,{useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 

const Calendar = () => {
    const [events,setEvents] =useState( [
        {id:1, title: 'Événement 1', start: '2024-09-10T10:00:00', end: '2024-09-10T12:00:00', color: 'blue' },
        {id:2, title: 'Événement 2', start: '2024-09-11T14:00:00', end: '2024-09-11T15:30:00', color: 'green' },
        {id:3, title: 'Événement 3', start: '2024-09-12T09:00:00', end: '2024-09-12T11:00:00', color: 'red' },
    ]);
    const handleEventDrop = (info)=>{
        const updatedEvents = events.map(event => 
            event.id === parseInt(info.event.id)
            ? { ...event, start: info.event.start, end: info.event.end }
                : event
        );
        setEvents(updatedEvents);
    };
    const handleSelect = (selectionInfo) => {
        const newEvent = {
            id: events.length + 1,
            title: `Nouvel événement ${events.length + 1}`,
            start: selectionInfo.startStr,
            end: selectionInfo.endStr,
            color: 'purple',
        };
        setEvents([...events, newEvent]);
    };
    return (
        <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                editable={true} // permet de modifier les événements
                selectable={true}
                eventDrop={handleEventDrop}
                select={handleSelect}
                slotMinTime="07:00:00" // définit le début de la journée
                slotMaxTime="20:00:00" // définit la fin de la journée
                slotDuration="00:30:00" 
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                height={"90vh"}
                events={events}
 />
    );
}

export default Calendar;
 