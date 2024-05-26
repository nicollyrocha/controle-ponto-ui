import { useState, useEffect } from 'react';
import { ITimeControl } from '../models/timeControl';

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
				const diffInMilliseconds = Math.abs(
					new Date(timeControlByUser.endtime).getTime() -
						new Date(timeControlByUser.starttime).getTime()
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
				const diffInMilliseconds = Math.abs(
					new Date().getTime() - new Date(timeControlByUser.starttime).getTime()
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
