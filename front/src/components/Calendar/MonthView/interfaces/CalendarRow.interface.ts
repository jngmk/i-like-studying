import { DaySchedule } from '../../dataSet/DataSet.interface';

export default interface Component {
  title?: string;
  week: string[];
  targetMonth: string;
  targetDay: number;
  targetDateString: string;
  handleState: (targetDay: number, targetDateString: string) => void;
  dayComponent?: object;
  daySchedule: DaySchedule[];
  rowContainerClassName? : string;
  dayContainerClassName? : string;
  dayDataListClass?: string;
  dayDataListItemClass?: string;
  colorPastDates?: string;
  colorActiveDate?: string;
}