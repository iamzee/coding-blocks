import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { isAuthenticated } from '../../helpers/auth';
import DeleteBlogButton from './deleteBlogButton';

const Blog = ({ blog, handleDeleteBlog }) => {
	const { user } = isAuthenticated();

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar src={`/uploads/${blog.user.avatar}`}>
						{/* <AccountCircleIcon /> */}
					</Avatar>
				}
				title={
					<Link
						style={{ textDecoration: 'none' }}
						to={`/users/${blog.userId}`}
					>
						<Typography color="text.primary">{`${blog.user.firstName} ${blog.user.lastName}`}</Typography>
					</Link>
				}
				subheader={moment(blog.updatedAt).format('MMMM DD, YYYY')}
				action={
					user &&
					user.id == blog.userId && (
						<>
							<Link to={`/blogs/${blog.id}/edit`}>
								<IconButton color="warning">
									<EditIcon />
								</IconButton>
							</Link>

							<DeleteBlogButton
								handleDeleteBlog={handleDeleteBlog}
								blogId={blog.id}
							/>
						</>
					)
				}
			/>
			<CardActionArea>
				<Link
					to={`/blogs/${blog.id}`}
					style={{ textDecoration: 'none' }}
				>
					<CardContent>
						<Typography
							variant="h6"
							gutterBottom
							component="div"
							color="primary"
						>
							{blog.title}
							{!moment(blog.createdAt).isSame(blog.updatedAt) && (
								<Typography variant="caption">
									(Edited)
								</Typography>
							)}
						</Typography>
						<Typography variant="body1" color="text.primary">
							{_.truncate(blog.description, { length: 500 })}
						</Typography>
					</CardContent>
				</Link>
			</CardActionArea>
		</Card>
	);
};

export default Blog;
