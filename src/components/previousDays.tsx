import { useContextProject } from '../context';
import { totalHoursDay } from '../functions/totalHoursDay';
import { HoursMiniCard } from './hoursMiniCard';

export const PreviousDays = () => {
	const { timeControlByUser } = useContextProject();

	return (
		<div className='flex flex-col gap-2'>
			<div className='text-xs text-white font-bold'>Dias anteriores</div>
			<div className='flex flex-col ga-2'>
				{timeControlByUser && timeControlByUser.length > 0
					? timeControlByUser
							.filter((t) => t.endtime && new Date(t.starttime) !== new Date())
							.map((t) => {
								return (
									<HoursMiniCard key={t.id}>
										<div className='text-white flex justify-between w-full'>
											<div>{new Date(t.starttime).toLocaleDateString('pt-BR')}</div>
											<div className='font-semibold'>
												{totalHoursDay(t.starttime, t.endtime || new Date())}
											</div>
										</div>
									</HoursMiniCard>
								);
							})
					: ''}
				{(!timeControlByUser ||
					timeControlByUser.length === 0 ||
					(timeControlByUser &&
						timeControlByUser.length > 0 &&
						timeControlByUser.filter(
							(time) => new Date(time.starttime) !== new Date()
						).length === 0)) && (
					<div className='text-white'>Nenhum resultado foi encontrado.</div>
				)}
			</div>
		</div>
	);
};
