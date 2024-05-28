import { useState, useEffect } from 'react';
import { ITimeControl } from '../models/timeControl';
import moment from 'moment';

export const useTotalHoursDay = (
	timeControlByUser: ITimeControl | null,
	updateInterval: number = 1000
) => {
	const [timeDifference, setTimeDifference] = useState('');

	useEffect(() => {
		const updateDifference = () => {
			if (
				timeControlByUser &&
				timeControlByUser.endtime &&
				timeControlByUser.starttime
			) {
				const timezoneOffsetStart =
					new Date(timeControlByUser.starttime).getTimezoneOffset() * 60000;

				const dateInLocalTimeStart = new Date(
					new Date(timeControlByUser.starttime).getTime() + timezoneOffsetStart
				);
				const timezoneOffsetEnd =
					new Date(timeControlByUser.endtime).getTimezoneOffset() * 60000;

				const dateInLocalTimeEnd = new Date(
					new Date(timeControlByUser.endtime).getTime() + timezoneOffsetEnd
				);
				const diffInMilliseconds = Math.abs(
					dateInLocalTimeEnd.getTime() - dateInLocalTimeStart.getTime()
				);
				const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
				const diffInMinutes = Math.floor(
					(diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
				);
				setTimeDifference(`${diffInHours}h ${diffInMinutes}m`);
			} else if (
				timeControlByUser &&
				!timeControlByUser.endtime &&
				timeControlByUser.starttime
			) {
				const timezoneOffset =
					new Date(timeControlByUser.starttime).getTimezoneOffset() * 60000;

				const dateInLocalTime = new Date(
					new Date(timeControlByUser.starttime).getTime() + timezoneOffset
				);
				const diffInMilliseconds = Math.abs(
					new Date().getTime() - new Date(dateInLocalTime).getTime()
				);
				const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
				const diffInMinutes = Math.floor(
					(diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
				);
				setTimeDifference(`${diffInHours}h ${diffInMinutes}m`);
			}
		};

		updateDifference();
		const intervalId = setInterval(updateDifference, updateInterval);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [timeControlByUser, updateInterval]);

	return timeDifference;
};
