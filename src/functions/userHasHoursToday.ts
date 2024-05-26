import { ITimeControl } from '../models/timeControl';

/** Recebe todos os registros de ponto, faz um filter para ver se tem starttime e endtime do dia atual e retorna se o usário tem ponto no dia.  */
export const userHasHoursToday = (
	timeControlByUser: ITimeControl[],
	dateToday: string
) => {
	if (timeControlByUser && timeControlByUser.length > 0) {
		const currDay = timeControlByUser.filter((time) => {
			const date =
				new Date(time.starttime).getDay() +
				'/' +
				new Date(time.starttime).getMonth() +
				'/' +
				new Date(time.starttime).getFullYear();
			return time.starttime && time.endtime && dateToday === date;
		});

		if (currDay.length > 0) {
			return true;
		} else {
			return false;
		}
	}
};
