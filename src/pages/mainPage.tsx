import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { HeaderMainPage } from '../components/headerMainPage';
import { Hours } from '../components/hours';
import { PreviousDays } from '../components/previousDays';
import { useContextProject } from '../context';
import { TimeControl } from '../services/timeControl/timeControl';
import { Loading } from '../components/loading';
import { useParams } from 'react-router-dom';
import { userHasHoursToday } from '../functions/userHasHoursToday';

export const MainPage = () => {
	const {
		timeControlByUser,
		codUser,
		setTimeControlByUser,
		setCodUser,
		setIdTimeControl,
	} = useContextProject();
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			setCodUser(id);
			TimeControl.getTimeControlByUser(id)
				.then((res: any) => {
					if (res.body.status === 200) {
						setTimeControlByUser(res.body.timeControl);
					}
				})
				.catch((err) => console.log(err));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const currDayUnfinished =
		timeControlByUser && timeControlByUser.length > 0
			? timeControlByUser.filter((day) => {
					const date =
						new Date(day.starttime).getDay() +
						'/' +
						new Date(day.starttime).getMonth() +
						'/' +
						new Date(day.starttime).getFullYear();
					const dateToday =
						new Date().getDay() +
						'/' +
						new Date().getMonth() +
						'/' +
						new Date().getFullYear();
					return date === dateToday && day.endtime === null;
			  })
			: [];

	const labelButton =
		currDayUnfinished.length === 0 ? 'Hora de Entrada' : 'Hora de Saida';

	const onClickSetTime = () => {
		const date = new Date();
		setIsLoading(true);
		if (currDayUnfinished.length === 0 || !currDayUnfinished) {
			TimeControl.postTimeControl({
				userid: codUser,
				starttime: new Date(date.getTime() - date.getTimezoneOffset() * 60000),
			}).then((res) => {
				if (res.body.status === 200) {
					timeControlByUser.push(res.body.timeControl);
					setIdTimeControl(res.body.timeControl.id);

					setTimeout(() => {
						setIsLoading(false);
					}, 1000);
				}
			});
		} else {
			TimeControl.updateTimeControl(
				{
					...currDayUnfinished[0],
					endtime: new Date(
						new Date().getTime() - new Date().getTimezoneOffset() * 60000
					),
				},
				localStorage.getItem('idTimeControl') || ''
			).then((res) => {
				if (res.body.status === 200) {
					setTimeout(() => {
						setIsLoading(false);
						setTimeControlByUser(res.body.body);
					}, 1000);
				}
			});
		}
	};
	const today =
		new Date().getDay() +
		'/' +
		new Date().getMonth() +
		'/' +
		new Date().getFullYear();

	return (
		<div className='flex justify-center pt-20'>
			<div className='w-10/12 lg:w-4/12 flex flex-col gap-4'>
				<HeaderMainPage />
				<Hours />
				<Button
					disabled={userHasHoursToday(timeControlByUser, today) ? true : false}
					onCLick={() => onClickSetTime()}
					label={isLoading ? <Loading /> : labelButton}
				/>
				<PreviousDays />
			</div>
		</div>
	);
};
