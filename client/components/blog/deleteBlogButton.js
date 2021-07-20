import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const DeleteBlogButton = ({ handleDeleteBlog, blogId }) => {
	const [open, setOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		setDeleting(true);
		await handleDeleteBlog(blogId);

		setOpen(false);
	};

	return (
		<>
			<IconButton color="error" onClick={() => setOpen(true)}>
				<DeleteIcon />
			</IconButton>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>
					{'Are you sure you want to delete this blog?'}
				</DialogTitle>
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

export default DeleteBlogButton;
