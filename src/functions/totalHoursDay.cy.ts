import { totalHoursDay } from './totalHoursDay';

describe('totalHoursDay', () => {
	it('Recebe uma data início e uma data fim, retorna o tempo de trabalho do dia.', () => {
		const dateStart = new Date('2023-05-26 10:00:00');
		const dateEnd = new Date('2023-05-26 20:30:00');
		const time = '10h 30m';
		expect(totalHoursDay(dateStart, dateEnd)).to.equal(time);
	});
});
