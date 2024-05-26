import { useContextProject } from '../context';
import { useTotalHoursDay } from '../functions/useTotalHoursDay';

export const Hours = () => {
	const { timeControlByUser } = useContextProject();

	const totalHours = useTotalHoursDay(
		timeControlByUser ? timeControlByUser[timeControlByUser.length - 1] : null
	);

	return (
		<div className='flex flex-col'>
			<div className='text-[23.2px] text-white font-bold'>
				{totalHours || '0h 0m'}
			</div>
			<div className='text-[11.6px] text-white font-bold'>Horas de hoje</div>
		</div>
	);
};
