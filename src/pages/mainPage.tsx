import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { HeaderMainPage } from '../components/headerMainPage';
import { Hours } from '../components/hours';
import { PreviousDays } from '../components/previousDays';
import { useContextProject } from '../context';
import { TimeControl } from '../services/timeControl/timeControl';
import { Loading } from '../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { userHasHoursToday } from '../functions/userHasHoursToday';
import { formatDate } from '../functions/formatDate';
import { formatDateToday } from '../functions/formatDateToday';

export const MainPage = () => {
	const {
		timeControlByUser,
		codUser,
		setTimeControlByUser,
		setCodUser,
		setIdTimeControl,
		idTimeControl,
	} = useContextProject();
	const [isLoading, setIsLoading] = useState(false);
	const { id, timeControlId } = useParams();
	const navigate = useNavigate();

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
					return (
						formatDate(day) === formatDateToday(new Date()) && day.endtime === null
					);
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

				timeControlId || ''
			).then((res) => {
				if (res.body.status === 200) {
					setTimeout(() => {
						setIsLoading(false);
						setTimeControlByUser(res.body.body);
						navigate(`/user/${codUser}/${idTimeControl}`);
					}, 1000);
				}
			});
		}
	};
	const today = formatDateToday(new Date());

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
