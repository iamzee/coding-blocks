import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const DeleteUserButton = props => {
	const [open, setOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		setDeleting(true);
		await props.handleDelete();
		setOpen(false);
	};

	return (
		<>
			<Button color="error" size="small" onClick={() => setOpen(true)}>
				Delete
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>
					{'Are you sure you want to delete your account?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Deleting your account, will delete all your blogs.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					{deleting ? (
						<Button
							startIcon={
								<CircularProgress color="inherit" size={12} />
							}
						>
							Deleting
						</Button>
					) : (
						<Button onClick={handleDelete}>Delete</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DeleteUserButton;
