import { ITimeControl } from '../../models/timeControl';
import { api } from '../api';

const postTimeControl = async (timeControlData: ITimeControl) => {
	try {
		const { data } = await api.post('/time-control', timeControlData);
		return data;
	} catch (error) {
		return error;
	}
};

const getTimeControlByUser = async (id: string) => {
	try {
		const { data } = await api.get(`/time-control/${id}`);
		return data;
	} catch (error) {
		return error;
	}
};

const updateTimeControl = async (timeControlData: ITimeControl, id: string) => {
	try {
		const { data } = await api.put(`/time-control/${id}`, timeControlData);
		return data;
	} catch (error) {
		return error;
	}
};

export const TimeControl = {
	getTimeControlByUser,
	postTimeControl,
	updateTimeControl,
};
