import { ITimeControl } from 'models/timeControl';

export const formatDate = (timeControl: ITimeControl) => {
	const timezoneOffsetStart =
		new Date(timeControl.starttime).getTimezoneOffset() * 60000;

	const dateInLocalTimeStart = new Date(
		new Date(timeControl.starttime).getTime() + timezoneOffsetStart
	);
	const newDate =
		(dateInLocalTimeStart.getDate() < 10
			? '0' + dateInLocalTimeStart.getDate()
			: dateInLocalTimeStart.getDate()) +
		'/' +
		(dateInLocalTimeStart.getMonth() < 10
			? '0' + (dateInLocalTimeStart.getMonth() + 1)
			: dateInLocalTimeStart.getMonth() + 1) +
		'/' +
		dateInLocalTimeStart.getFullYear();

	return newDate;
};
