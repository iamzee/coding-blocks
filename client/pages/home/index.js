import React, { useState, useEffect } from 'react';

import { fetchAll } from '../../apis/blogs';
import BlogList from '../../components/blogList';
import Container from '../../components/container';
import Navbar from '../../components/navbar';
import { isAuthenticated } from '../../helpers/auth';
import Typography from '@material-ui/core/Typography';
import { remove } from '../../apis/blogs';
import Snack from '../../components/snack';

const Home = () => {
	const [blogs, setBlogs] = useState(null);
	const [alert, setAlert] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAll();
			if (data.success) {
				setBlogs(data.data);
			} else {
				setError(data.message);
			}
		};

		fetchData();
	}, []);

	const handleDeleteBlog = async blogId => {
		const data = await remove(blogId);

		if (data.success) {
			setBlogs(blogs.filter(blog => blog.id !== blogId));
			setAlert({ message: data.message, severity: 'success' });
		} else {
		}
	};

	return (
		<>
			<Navbar user={isAuthenticated().user} />
			<Container>
				{blogs && blogs.length > 0 ? (
					<BlogList
						blogs={blogs}
						handleDeleteBlog={handleDeleteBlog}
					/>
				) : (
					<Typography variant="body2">No blogs.</Typography>
				)}
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

export default Home;
