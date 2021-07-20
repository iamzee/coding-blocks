import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogActions from '@material-ui/core/DialogActions';

const AddFieldButton = props => {
	const [open, setOpen] = useState(false);

	const [label, setLabel] = useState('');
	const [key, setKey] = useState('');
	const [type, setType] = useState('');
	const [autoSave, setAutoSave] = useState(false);
	const [options, setOptions] = useState('');

	const handleAddField = () => {
		const field = {
			label,
			key,
			type,
			autoSave,
			options: options.split(',').map(o => ({
				label: o,
				key: o,
			})),
		};

		// console.log(field);
		props.addField(field);
		clearInputs();
		setOpen(false);
	};

	const clearInputs = () => {
		setLabel('');
		setKey('');
		setType('');
		setAutoSave(false);
		setOptions('');
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} variant="outlined">
				Add Field
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Add Field</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						margin="normal"
						label="Label"
						value={label}
						onChange={e => setLabel(e.target.value)}
					/>
					<TextField
						fullWidth
						margin="normal"
						label="Key"
						value={key}
						onChange={e => setKey(e.target.value)}
					/>
					<FormControl fullWidth margin="normal">
						<InputLabel>Type</InputLabel>
						<Select
							label="Type"
							value={type}
							onChange={e => setType(e.target.value)}
						>
							<MenuItem value="text">Text</MenuItem>
							<MenuItem value="number">Number</MenuItem>
							<MenuItem value="radio">Radio</MenuItem>
							<MenuItem value="select">Select</MenuItem>
							<MenuItem value="file">File</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<FormControlLabel
							control={
								<Checkbox
									checked={autoSave}
									onChange={e =>
										setAutoSave(e.target.checked)
									}
								/>
							}
							label="Autosave"
						></FormControlLabel>
					</FormControl>

					<TextField
						fullWidth
						label="Options (Optional)"
						margin="normal"
						value={options}
						onChange={e => setOptions(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpen(false);
							clearInputs();
						}}
					>
						Cancel
					</Button>
					<Button onClick={handleAddField}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddFieldButton;
