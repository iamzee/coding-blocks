import React, { useEffect, useState } from 'react';
import { edit, read } from '../../apis/blogs';
import BlogForm from '../../components/blogForm';

import Typography from '@material-ui/core/Typography';

import Navbar from '../../components/navbar';
import { isAuthenticated } from '../../helpers/auth';
import Container from '../../components/container';

const EditBlog = ({ match, history }) => {
	const [blog, setBlog] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await read(match.params.id);

			if (data.success) {
				setBlog(data.data);
			} else {
				// show error page
			}
		};

		fetchData();
	}, []);

	const handleSubmit = async payload => {
		const data = await edit(match.params.id, payload);

		if (data.success) {
			history.push('/');
		}
	};

	return (
		<>
			<Navbar user={isAuthenticated().user} />

			<Container>
				<Typography variant="h6">Edit Blog</Typography>
				{blog && <BlogForm blog={blog} handleSubmit={handleSubmit} />}
			</Container>
		</>
	);
};

export default EditBlog;
