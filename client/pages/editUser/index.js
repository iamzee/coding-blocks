import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

import Navbar from '../../components/navbar';
import UserForm from '../../components/userForm';
import Container from '../../components/container';
import { edit, fetchUser } from '../../apis/user';
import { isAuthenticated } from '../../helpers/auth';
import Snack from '../../components/snack';

const EditUser = () => {
	const [user, setUser] = useState('');
	const [alert, setAlert] = useState('');

	const handleSubmit = async payload => {
		const data = await edit(user.id, payload);

		if (data.success) {
			setAlert({ message: data.message, severity: 'success' });
		} else {
			setAlert({ message: data.message, severity: 'error' });
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await fetchUser(isAuthenticated().user.id);
			setUser(data);
		};

		fetchData();
	}, []);

	return (
		<>
			<Navbar user={user} />
			{user && (
				<Container>
					<Typography variant="h5">Edit Profile</Typography>
					<UserForm user={user} handleSubmit={handleSubmit} />
				</Container>
			)}
			{alert && (
				<Snack
					message={alert.message}
					severity={alert.severity}
					onClose={() => setAlert('')}
				/>
			)}
		</>
	);
};

export default EditUser;
