import axios from 'axios';
import { isAuthenticated } from '../helpers/auth';

export const fetchAll = async () => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: '/api/blogs/all',
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const create = async payload => {
	try {
		const { data } = await axios({
			method: 'POST',
			url: '/api/blogs',
			data: payload,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const read = async blogId => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/blogs/${blogId}`,
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const edit = async (blogId, payload) => {
	try {
		const { data } = await axios({
			method: 'PATCH',
			url: `/api/blogs/${blogId}`,
			data: payload,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const remove = async blogId => {
	try {
		const { data } = await axios({
			method: 'DELETE',
			url: `/api/blogs/${blogId}`,
			headers: {
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};
