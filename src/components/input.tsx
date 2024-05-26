interface InputProps {
	onChange: (event: any) => void;
	value: string | number;
	label: string;
}

export const Input = (props: InputProps) => {
	return (
		<div className='flex flex-col bg-white/5 p-2 rounded-md focus-within:border focus-within:border-solid focus-within:border-white'>
			<div className='text-white text-xs font-thin'>{props.label}</div>
			<input
				style={{ outline: 'none' }}
				className='group bg-transparent text-white text-[21.6px] font-semibold border-solid border-transparent active:border-none '
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	);
};
