import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snack from '../../components/snack';

const BlogForm = ({ handleSubmit, blog }) => {
	const [title, setTitle] = useState(blog ? blog.title : '');
	const [description, setDescription] = useState(
		blog && blog.description ? blog.description : ''
	);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');

	const onSubmit = async () => {
		if (!title) {
			setError('Title is required.');
		} else {
			setSaving(true);
			await handleSubmit({ title, description });
			setSaving(false);
		}
	};

	return (
		<div>
			<TextField
				label="Title"
				variant="outlined"
				placeholder="Title for your blog."
				margin="normal"
				fullWidth
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<br />
			<TextField
				label="Description"
				variant="outlined"
				placeholder="Description (Optional)"
				margin="normal"
				fullWidth
				multiline
				rows={10}
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
			<br />
			{saving ? (
				<Button
					variant="contained"
					startIcon={<CircularProgress color="inherit" size={14} />}
				>
					Saving
				</Button>
			) : (
				<Button variant="contained" onClick={onSubmit}>
					Save
				</Button>
			)}
			{error && (
				<Snack
					severity="error"
					message={error}
					onClose={() => setError('')}
				/>
			)}
		</div>
	);
};

export default BlogForm;
