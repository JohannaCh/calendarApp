import { addHours } from 'date-fns';
import {useCalendarStore, useUiStore} from '../../../hooks';
export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title:'',
      notes:'',
      start: new Date(),
      end: addHours(new Date(), 2), //le sumo 2 horas
      bgColor: '#46467a',
      user:{
        _id:'123',
        name:'Johanna'
      }
    })
    openDateModal();
  }

  return (
    <button 
      className="btn btn-primary fab"
      onClick={ handleClickNew }
    >
      <i className="fas fa-plus"></i>
    </button>
  )
};
