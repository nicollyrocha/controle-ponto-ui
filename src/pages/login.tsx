import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { useContextProject } from '../context';

export const Login = () => {
	const { codUser, setCodUser } = useContextProject();
	const navigate = useNavigate();

	const onClickConfirm = () => {
		navigate(`/user/${codUser}`);
	};

	return (
		<div className='h-screen flex flex-col items-center justify-center'>
			<div className='flex flex-col gap-10 w-[365px]'>
				<div className='text-white text-[21.52px] font-light'>
					Ponto <span className='font-bold'>Ilumeo</span>
				</div>
				<div className='flex flex-col gap-5 w-full'>
					<Input
						onChange={(e) => setCodUser(e.target.value.toUpperCase())}
						value={codUser}
						label={'Código do usuário'}
					/>
					<Button
						disabled={codUser.length === 0}
						onCLick={() => onClickConfirm()}
						label={'Confirmar'}
					/>
				</div>
			</div>
		</div>
	);
};
