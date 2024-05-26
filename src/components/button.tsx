import { ReactNode } from 'react';

interface ButtonProps {
	onCLick: () => void;
	label: string | ReactNode;
	disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
	return (
		<button
			disabled={props.disabled}
			onClick={props.onCLick}
			className={`${
				props.disabled
					? 'cursor-default bg-[#C0C0C0] text-neutral-500'
					: 'cursor-pointer bg-[#FE8A00] hover:bg-orange-600/80 active:bg-orange-700 transition duration-300	ease-in-out'
			} py-3 font-bold text-base rounded-md flex justify-center`}
		>
			{props.label}
		</button>
	);
};
