import axios from 'axios';
import { authenticate, clearJwt } from '../helpers/auth';

export const login = async payload => {
	try {
		const { data } = await axios({
			method: 'POST',
			url: '/api/login',
			data: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		authenticate(data.data);

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const logout = () => {
	clearJwt();
};
