import { ITimeControl } from '../models/timeControl';
import { formatDate } from './formatDate';
import { formatDateToday } from './formatDateToday';

/** Recebe todos os registros de ponto, faz um filter para ver se tem starttime e endtime do dia atual e retorna se o usário tem ponto no dia.  */
export const userHasHoursToday = (
	timeControlByUser: ITimeControl[],
	dateToday: string
) => {
	if (timeControlByUser && timeControlByUser.length > 0) {
		const currDay = timeControlByUser.filter((time) => {
			return (
				time.starttime &&
				time.endtime &&
				formatDateToday(new Date()) === formatDate(time)
			);
		});

		if (currDay.length > 0) {
			return true;
		} else {
			return false;
		}
	}
};
