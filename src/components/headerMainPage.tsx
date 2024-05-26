import { useParams } from 'react-router-dom';

export const HeaderMainPage = () => {
	const { id } = useParams();

	return (
		<div className='flex flex-row justify-between'>
			<div className='text-white text-[11.6px] font-bold'>Relógio de ponto</div>
			<div className='flex flex-col gap-2'>
				<div className='text-white text-[11.6px] font-bold'>#{id}</div>
				<div className='text-xs text-[#CFCFCFB0] font-light self-end'>Usuário</div>
			</div>
		</div>
	);
};
