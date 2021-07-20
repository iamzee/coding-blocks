import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snack from '../../components/snack';
import { login } from '../../apis/auth';
import { isAuthenticated } from '../../helpers/auth';
import Navbar from '../../components/navbar';
import Container from '../../components/container';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [saving, setSaving] = useState(false);
	const [alert, setAlert] = useState('');

	useEffect(() => {
		if (props.location.state && props.location.state.newUser) {
			setAlert({
				message: 'Account created. Login to your account.',
				severity: 'success',
			});
		}
	}, []);

	const handleSubmit = async e => {
		if (!email || !password) {
			setAlert({
				message: 'All fields are required.',
				severity: 'error',
			});
		} else {
			setSaving(true);
			e.preventDefault();
			const data = await login({ email, password });
			if (data.success) {
				if (props.location.state && props.location.state.referrer) {
					props.history.push(props.location.state.referrer);
				} else {
					props.history.push('/');
				}
			} else {
				setAlert({ message: data.message, severity: 'error' });
			}
		}
	};

	return (
		<>
			<Navbar user={isAuthenticated().user} />
			<Container>
				<Typography variant="h5"> Login </Typography>

				<form onSubmit={handleSubmit}>
					<TextField
						label="Email"
						variant="outlined"
						placeholder="Email"
						// size="small"
						value={email}
						onChange={e => setEmail(e.target.value)}
						margin="normal"
					/>
					<br />
					<TextField
						label="Password"
						type="password"
						variant="outlined"
						placeholder="Password"
						// size="small"
						value={password}
						onChange={e => setPassword(e.target.value)}
						margin="normal"
					/>
					<br />
					{saving ? (
						<Button
							variant="contained"
							size="small"
							startIcon={
								<CircularProgress size={12} color="inherit" />
							}
						>
							Loging
						</Button>
					) : (
						<Button variant="contained" size="small" type="submit">
							Login
						</Button>
					)}
				</form>
				{alert && (
					<Snack
						severity={alert.severity}
						onClose={() => {
							setAlert('');
							setSaving(false);
						}}
						message={alert.message}
					/>
				)}
			</Container>
		</>
	);
};

export default Login;
