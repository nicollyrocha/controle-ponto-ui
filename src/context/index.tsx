import { createContext, useContext, useState } from 'react';
import { ITimeControl } from '../models/timeControl';

interface Props {
	children: React.ReactNode;
}

export const _useController = () => {
	const [codUser, setCodUser] = useState('');
	const [timeControlByUser, setTimeControlByUser] = useState<ITimeControl[]>([]);
	const [idTimeControl, setIdTimeControl] = useState('');

	return {
		codUser,
		setCodUser,
		timeControlByUser,
		setTimeControlByUser,
		idTimeControl,
		setIdTimeControl,
	};
};

const _Controller = createContext({} as ReturnType<typeof _useController>);

export const useContextProject = () => useContext(_Controller);

export const ContextProvider: React.FC<Props> = ({ children }) => {
	const controller = _useController();

	return (
		<_Controller.Provider value={controller}>{children}</_Controller.Provider>
	);
};
