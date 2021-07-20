import axios from 'axios';

import { isAuthenticated } from '../helpers/auth';

export const fetchUser = async userId => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/users/${userId}`,
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const create = async payload => {
	// try {
	// 	const { data } = await axios({
	// 		method: 'POST',
	// 		url: `/api/users`,
	// 		data: payload,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	});

	// 	return data;
	// } catch (e) {
	// 	return e.response.data;
	// }

	try {
		const formData = new FormData();
		Object.keys(payload).forEach(p => {
			formData.append(p, payload[p]);
		});

		const { data } = await axios({
			method: 'POST',
			url: '/api/users',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const edit = async (userId, payload) => {
	try {
		const formData = new FormData();
		Object.keys(payload).forEach(p => {
			formData.append(p, payload[p]);
		});

		const { data } = await axios({
			method: 'PATCH',
			url: `/api/users/${userId}`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		});

		return data;
	} catch (e) {
		return e.response.data;
	}

	// try {
	// 	const { data } = await axios({
	// 		method: 'PATCH',
	// 		url: `/api/users/${userId}`,
	// 		data: payload,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Bearer ${isAuthenticated().token}`,
	// 		},
	// 	});

	// 	return data;
	// } catch (e) {
	// 	return e.response.data;
	// }
};

export const remove = async userId => {
	try {
		const { data } = await axios({
			method: 'DELETE',
			url: `/api/users/${userId}`,
			headers: {
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};
