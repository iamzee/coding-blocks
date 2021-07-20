import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import { isAuthenticated } from '../../helpers/auth';
import { logout } from '../../apis/auth';
import DeleteUserButton from './deleteUserButton';
import { remove } from '../../apis/user';

const Profile = ({ user, history }) => {
	const data = isAuthenticated();

	const handleLogout = () => {
		logout();
		history.push('/');
	};

	const handleDelete = async () => {
		await remove(user.id);
		logout();
		history.push('/');
	};

	return (
		<Card>
			{user.avatar && (
				<CardMedia
					sx={{
						height: 0,
						paddingTop: '56.25%', // 16:9
					}}
					image={`/uploads/${user.avatar}`}
				/>
			)}
			<CardContent>
				<Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
				<Typography variant="body2">{user.email}</Typography>
			</CardContent>
			{data && data.user.id == user.id && (
				<CardActions>
					<Button color="primary" size="small" onClick={handleLogout}>
						Logout
					</Button>
					<Link
						to={`/profile/edit`}
						style={{ textDecoration: 'none' }}
					>
						<Button color="primary" size="small">
							Edit
						</Button>
					</Link>
					<DeleteUserButton handleDelete={handleDelete} />
				</CardActions>
			)}
		</Card>
	);
};

export default Profile;
