import { ITimeControl } from '../models/timeControl';
import { userHasHoursToday } from './userHasHoursToday';

describe('userHasHoursToday', () => {
	it('Recebe todos os registros de ponto, faz um filter para ver se tem starttime e endtime do dia atual e retorna se o usário tem ponto no dia. - False', () => {
		const entries: ITimeControl[] = [
			{
				id: 1,
				userid: '1',
				starttime: new Date('2023-05-25 10:10:00'),
				endtime: new Date('2023-05-25 20:30:00'),
			},
			{ id: 2, userid: '1', starttime: new Date('2023-05-26 10:10:00') },
		];
		const dateToday = new Date('2023-05-26').toString();
		expect(userHasHoursToday(entries, dateToday)).to.equal(false);
	});
});
