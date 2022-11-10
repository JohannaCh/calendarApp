import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title:'Reunion Con Equipo',
  notes:'No olvidar preparar todo',
  start: new Date(),
  end: addHours(new Date(), 2), //le sumo 2 horas
  bgColor: '#46467a',
  user:{
    _id:'123',
    name:'Johanna'
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState:{
    events: [tempEvent],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, {payload}) => {
      state.activeEvent = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;