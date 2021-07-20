import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Stack from '@material-ui/core/Stack';
import { makeStyles } from '@material-ui/styles';

// import { isAuthenticated } from '../../helpers/auth';

const useStyles = makeStyles({
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
});

const Navbar = props => {
	const classes = useStyles();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
						color="text.primary"
					>
						<Link
							style={{ textDecoration: 'none', color: '#fff' }}
							to="/"
						>
							Coding Blocks
						</Link>
					</Typography>

					<Stack direction="row" spacing={2}>
						<Link to="/blogs/create" className={classes.link}>
							<Button
								size="small"
								variant="contained"
								color="warning"
							>
								Create Blog
							</Button>
						</Link>

						{props.user ? (
							<Link
								to={`/users/${props.user.id}`}
								className={classes.link}
							>
								<IconButton size="small" color="inherit">
									<AccountIcon />
								</IconButton>
							</Link>
						) : (
							<>
								<Link to="/register" className={classes.link}>
									<Button size="small" color="inherit">
										Register
									</Button>
								</Link>
								<Link
									to={{
										pathname: '/login',
										state: {
											referrer: props.referrer
												? props.referrer
												: '',
										},
									}}
									className={classes.link}
								>
									<Button size="small" color="inherit">
										Login
									</Button>
								</Link>
							</>
						)}
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
