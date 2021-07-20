import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import BlogForm from '../../components/blogForm';
import { create } from '../../apis/blogs';
import Navbar from '../../components/navbar';
import { isAuthenticated } from '../../helpers/auth';

import Container from '../../components/container';
import Snack from '../../components/snack';

const CreateBlog = props => {
	const [error, setError] = useState('');

	const handleSubmit = async payload => {
		const data = await create(payload);

		if (data.success) {
			props.history.push('/');
		} else {
			setError(data.message);
		}
	};

	return (
		<>
			<Navbar user={isAuthenticated().user} />
			<Container>
				<Typography variant="h6">Create Blog</Typography>
				<BlogForm handleSubmit={handleSubmit} />
			</Container>
			{error && (
				<Snack
					severity="error"
					message={error}
					onClose={() => setError('')}
				/>
			)}
		</>
	);
};

export default CreateBlog;
