import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import { isAuthenticated } from '../../helpers/auth';
import Container from '../../components/container';
import UserForm from '../../components/userForm';
import { create } from '../../apis/user';
import Snack from '../../components/snack';

import Typography from '@material-ui/core/Typography';

const Register = props => {
	const [message, setMessage] = useState('');

	const handleSubmit = async payload => {
		const data = await create(payload);

		if (data.success) {
			setMessage({ message: data.message, severity: 'success' });
			props.history.push('/login', {
				newUser: true,
			});
		} else {
			setMessage({ message: data.message, severity: 'error' });
		}
	};

	return (
		<>
			<Navbar user={isAuthenticated().user} />
			<Container>
				<Typography variant="h6">Register</Typography>
				<UserForm handleSubmit={handleSubmit} />
			</Container>
			{message && (
				<Snack
					message={message.message}
					severity={message.severity}
					onClose={() => setMessage('')}
				/>
			)}
		</>
	);
};

export default Register;
