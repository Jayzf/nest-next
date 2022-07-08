import { CalendarMode } from '@shared/enums/calendar';
import { ScheduleModalFormMode } from '@shared/enums/schedule';
import { ScheduleData } from '@shared/types/calendar';
import { getDateInfo } from '@shared/utils/date';

export interface CalendarStore {
  mode: CalendarMode;
}

export interface ScheduleStore {
  datas: ScheduleData[];
}

export interface DateStore {
  year: number;
  month: number;
  date: number;
}

export interface OverlayStore {
  isActive: boolean;
}

export interface ModalStore {
  schedule: {
    isActive: boolean;
    formMode: ScheduleModalFormMode;
    title?: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
  };
}

export interface GlobalStore {
  calendar: CalendarStore;
  schedule: ScheduleStore;
  date: DateStore;
  overlay: OverlayStore;
  modal: ModalStore;
}

const initialDate = getDateInfo();

export const initialState = {
  calendar: {
    mode: CalendarMode.MONTHLY,
  },
  schedule: {
    datas: [],
  },
  date: {
    year: initialDate.year,
    month: initialDate.month,
    date: initialDate.date,
  },
  overlay: {
    isActive: false,
  },
  modal: {
    schedule: {
      isActive: false,
      formMode: null,
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    },
  },
};
