import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { NavBar, CalendarEventBox, CalendarModal } from "../";
import { localizer} from '../../helpers/CalendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { useState } from 'react';

const events = [{
    title:'Reunion Con Equipo',
    notes:'No olvidar preparar todo',
    start: new Date(),
    end: addHours(new Date(), 2), //le sumo 2 horas
    bgColor: '#46467a',
    user:{
      _id:'123',
      name:'Johanna'
    }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const styleEventGetter= (event, start, end, isSeleted)=>{

    const style = {
      backgroundColor: '#46467a',
      color: 'white',
      borderRadius:'0px',
      height:'auto'
    };

    return {
      style
    };
  }

  const onDoubleClick = ( event )=>{
    
  };

  const onSelect = ( event )=>{

  };

  const onViewChanged = ( event )=>{
    localStorage.setItem('lastView', event);
    setLastView(event)
  };

  return (
    <>
      <NavBar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)', color:'#46467a'}}
        messages={ getMessagesES() }
        eventPropGetter={ styleEventGetter }
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
    </>
  )
};