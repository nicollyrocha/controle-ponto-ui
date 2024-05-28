export const formatDateToday = (date: Date) => {
	const newDate =
		new Date().getDate() +
		'/' +
		(new Date().getMonth() < 10
			? '0' + (new Date().getMonth() + 1)
			: new Date().getMonth() + 1) +
		'/' +
		new Date().getFullYear();

	return newDate;
};
