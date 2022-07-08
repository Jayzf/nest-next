import {
  ACTIVATE_OVERLAY,
  APPEND_SCHEDULE,
  CLOSE_SCHEDULE_MODAL,
  OPEN_SCHEDULE_MODAL,
  SET_CALENDAR_DATE,
} from './actions/actionTypes';
import { GlobalStore } from './store';

export function reducer(state: GlobalStore, action): GlobalStore {
  const { calendar, schedule, date, overlay, modal } = state;

  switch (action.type) {
    /*
    // TODO: change calendar mode (monthly, weekly)
    case 'SET_CALENDAR_MODE':
      return { ...state, calendar: { mode: action.mode } };
    */

    // date
    case SET_CALENDAR_DATE:
      return {
        ...state,
        date: {
          ...date,
          year: action.year,
          month: action.month,
          date: action.date,
        },
      };

    // schedule
    case APPEND_SCHEDULE:
      return {
        ...state,
        schedule: {
          datas: [...schedule.datas, action.data],
        },
      };

    // overlay
    case ACTIVATE_OVERLAY:
      return {
        ...state,
        overlay: {
          isActive: action.isActive,
        },
      };

    // modal
    case OPEN_SCHEDULE_MODAL:
      return {
        ...state,
        modal: {
          ...modal,
          schedule: {
            ...modal.schedule,
            isActive: true,
            formMode: action.formMode,
          },
        },
      };

    case CLOSE_SCHEDULE_MODAL:
      return {
        ...state,
        modal: {
          ...modal,
          schedule: {
            ...modal.schedule,
            isActive: false,
          },
        },
      };

    default:
      return state;
  }
}
