import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { read } from '../../apis/blogs';
import Navbar from '../../components/navbar';
import { isAuthenticated } from '../../helpers/auth';
import Container from '../../components/container';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const ReadBlog = props => {
	const [blog, setBlog] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const data = await read(props.match.params.id);

			if (data.success) {
				setBlog(data.data);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Navbar
				user={isAuthenticated().user}
				referrer={props.location.pathname}
			/>
			{blog && (
				<Container>
					<Typography gutterBottom variant="h5" color="primary">
						{blog.title}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
					>{`${blog.user.firstName} ${blog.user.lastName}`}</Typography>
					<Typography variant="body2" color="text.secondary">
						Created at{' '}
						{moment(blog.createdAt).format('MMMM DD, YYYY')}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						gutterBottom
					>
						Updated at{' '}
						{moment(blog.updatedAt).format('MMMM DD, YYYY')}
					</Typography>
					<Divider sx={{ margin: '24px 0' }} />
					<Typography gutterBottom variant="body1">
						{blog.description}
					</Typography>
				</Container>
			)}
		</>
	);
};

export default ReadBlog;
