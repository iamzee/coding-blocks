import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import { fetchUser } from '../../apis/user';
import Profile from './profile';
import Navbar from '../../components/navbar';
import { isAuthenticated } from '../../helpers/auth';
import Container from '../../components/container';
import BlogList from '../../components/blogList';
import Snack from '../../components/snack';
import { remove } from '../../apis/blogs';

const User = props => {
	const [user, setUser] = useState(null);
	const [alert, setAlert] = useState('');

	useEffect(() => {
		const fetchData = async userId => {
			const data = await fetchUser(userId);
			console.log(data.data);

			if (data.success) {
				setUser(data.data);
			} else {
				setError(data.message);
			}
		};
		fetchData(props.match.params.id);
	}, [props.match.params.id]);

	const handleDeleteBlog = async blogId => {
		const data = await remove(blogId);

		if (data.success) {
			setUser({
				...user,
				blogs: user.blogs.filter(blog => blog.id !== blogId),
			});
			setAlert({ message: data.message, severity: 'success' });
		} else {
		}
	};

	return (
		<>
			<Navbar user={isAuthenticated().user} />
			<Container>
				<Grid container spacing={2}>
					{user && (
						<>
							<Grid item xs={12} md={4}>
								<Profile
									history={props.history}
									user={user}
								></Profile>
							</Grid>
							<Grid item xs={12} md={8}>
								<BlogList
									blogs={user.blogs}
									handleDeleteBlog={handleDeleteBlog}
								/>
							</Grid>
						</>
					)}
				</Grid>
			</Container>
			{alert && (
				<Snack
					severity={alert.severity}
					message={alert.message}
					onClose={() => setAlert('')}
				/>
			)}
		</>
	);
};

export default User;
