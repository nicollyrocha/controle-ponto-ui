/** Recebe uma data início e uma data fim, retorna o tempo de trabalho do dia. */
export const totalHoursDay = (dateStart: Date, dateEnd: Date) => {
	const diffInMilliseconds = Math.abs(
		new Date(dateEnd).getTime() - new Date(dateStart).getTime()
	);
	const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
	const diffInMinutes = Math.floor(
		(diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
	);
	return `${diffInHours}h ${diffInMinutes}m`;
};
