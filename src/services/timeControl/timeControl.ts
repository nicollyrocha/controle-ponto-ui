import { ITimeControl } from '../../models/timeControl';
import { api } from '../api';

const postTimeControl = async (timeControlData: ITimeControl) => {
	const { data } = await api.post('/time-control', timeControlData);
	return data;
};

const getTimeControlByUser = async (id: string) => {
	const { data } = await api.get(`/time-control/${id}`);
	return data;
};

const updateTimeControl = async (timeControlData: ITimeControl, id: string) => {
	const { data } = await api.put(`/time-control/${id}`, timeControlData);
	return data;
};

export const TimeControl = {
	getTimeControlByUser,
	postTimeControl,
	updateTimeControl,
};
