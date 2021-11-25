import {
  CHANGE_SCHEDULE_NOTIFICATION,
} from '../ActionTypes/ActionTypes';

const INITIAL_STATE = {
  scheduleList: [
    {
      name: 'Fajr',
      scheduled: false,
      time: null,
    },
    {
      name: 'Zuhr',
      scheduled: false,
      time: null,
    },
    {
      name: 'Asr',
      scheduled: false,
      time: null,
    },
    {
      name: 'Maghrib',
      scheduled: false,
      time: null,
    },
    {
      name: 'Isha',
      scheduled: false,
      time: null,
    },
  ],
};

const notificationReducer = (state = INITIAL_STATE, action) => {
    
  switch (action.type) {
    case CHANGE_SCHEDULE_NOTIFICATION:
        const notifList =  state.scheduleList;
        const index = notifList.findIndex((item)=>item.name === action.payload.name);
        notifList[index].time = action.payload.time;
        notifList[index].scheduled = action.payload.scheduled;
      return {
        ...state,
        scheduleList: notifList,
      };

    default:
      return state;
  }
};

export default notificationReducer;
